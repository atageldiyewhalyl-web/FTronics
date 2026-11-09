// Run with Node 22.13+ using: node --test scripts/test-lead-routing.mjs
// Every database operation and email request is mocked. No network access.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import vm from 'node:vm'
import test from 'node:test'

const source = readFileSync(new URL('../supabase/functions/ft-lead-anfrage/index.ts', import.meta.url), 'utf8')
const code = stripTypeScriptTypes(source.replace(/^import .*\n/, ''))
const halyl = 'halyl@xn--nll-hoa.com'
const client = 'info@ftst.eu'
const campaign = 'Landingpage Videoüberwachung Gewerbe'
const payload = {
  fullName: 'Local test contact',
  email: 'requester@example.test',
  subject: 'Videoüberwachung für Gewerbe',
  formName: campaign,
  message: 'Firma: Local test company\nObjekt: Lager / Logistik',
  notifyEmails: halyl,
}

function fixture({ failRecipient, failDatabase = false } = {}) {
  const emails = [], records = [], updates = []
  let handler
  const context = {
    Response,
    Deno: { env: { get: () => 'mock-secret' }, serve: callback => { handler = callback } },
    createClient: () => ({
      from: table => {
        assert.equal(table, 'ft_lead_anfragen')
        return {
          insert: record => {
            records.push(record)
            return { select: () => ({ single: async () => failDatabase
              ? { data: null, error: { message: 'Mock database failure' } }
              : { data: { id: 'test-lead-id' }, error: null } }) }
          },
          update: update => ({ eq: async (key, id) => {
            assert.equal(key, 'id')
            assert.equal(id, 'test-lead-id')
            updates.push(update)
            return { error: null }
          } }),
        }
      },
    }),
    fetch: async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails')
      const email = JSON.parse(options.body)
      emails.push(email)
      return email.to === failRecipient
        ? new Response('Mock email failure', { status: 500 })
        : Response.json({ id: 'mock-email-id' })
    },
  }
  vm.runInNewContext(code, context)
  return {
    emails, records, updates,
    submit: body => handler(new Request('https://example.test/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })),
  }
}

test('campaign is stored and notifies both approved inboxes plus the requester', async () => {
  const f = fixture()
  const response = await f.submit(payload)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).ok, true)
  assert.deepEqual(f.emails.map(email => email.to), [halyl, client, payload.email])
  assert.equal(f.records[0].notify_emails, `${halyl},${client}`)
  assert.equal(f.records[0].form_name, campaign)
  assert.equal(f.records[0].message, payload.message)
  assert.equal(f.emails[0].reply_to, payload.email)
  assert.equal(f.emails[1].reply_to, payload.email)
  assert.equal(f.updates.at(-1).status, 'email_sent')
})

test('browser recipient overrides cannot reroute campaign notifications', async () => {
  const f = fixture()
  await f.submit({ ...payload, notifyEmails: 'unapproved@example.test' })
  assert.deepEqual(f.emails.map(email => email.to), [halyl, client, payload.email])
})

test('alarm campaign keeps its service identity and notifies both approved inboxes', async () => {
  const f = fixture()
  const alarm = {
    ...payload,
    formName: 'Landingpage Alarmanlagen Gewerbe',
    subject: 'Alarmanlagen für Gewerbe',
    pageUrl: 'https://www.ftsicherheitstechnik.com/alarmanlagen-gewerbe?utm_campaign=alarm',
    message: 'Beratungsanfrage: Alarmanlagen für Gewerbe\nFirma: Local test company',
    notifyEmails: 'unapproved@example.test',
  }
  const response = await f.submit(alarm)
  assert.equal(response.status, 200)
  assert.deepEqual(f.emails.map(email => email.to), [halyl, client, payload.email])
  assert.equal(f.records[0].form_name, alarm.formName)
  assert.equal(f.records[0].subject, alarm.subject)
  assert.equal(f.records[0].page_url, alarm.pageUrl)
  assert.equal(f.records[0].message, alarm.message)
  assert.equal(f.records[0].notify_emails, `${halyl},${client}`)
  assert.equal(f.emails[0].reply_to, payload.email)
  assert.match(f.emails[1].subject, /Alarmanlagen/)
  assert.equal(f.updates.at(-1).status, 'email_sent')
})

test('access-control campaign keeps its service identity and notifies both approved inboxes', async () => {
  const f = fixture()
  const access = {
    ...payload,
    formName: 'Landingpage Zutrittskontrolle Gewerbe',
    subject: 'Zutrittskontrolle für Gewerbe',
    pageUrl: 'https://www.ftsicherheitstechnik.com/zutrittskontrolle-gewerbe?utm_campaign=zutritt',
    message: 'Beratungsanfrage: Zutrittskontrolle für Gewerbe\nFirma: Local test company',
    notifyEmails: 'unapproved@example.test',
  }
  const response = await f.submit(access)
  assert.equal(response.status, 200)
  assert.deepEqual(f.emails.map(email => email.to), [halyl, client, payload.email])
  assert.equal(f.records[0].form_name, access.formName)
  assert.equal(f.records[0].subject, access.subject)
  assert.equal(f.records[0].page_url, access.pageUrl)
  assert.equal(f.records[0].message, access.message)
  assert.equal(f.records[0].notify_emails, `${halyl},${client}`)
  assert.equal(f.emails[0].reply_to, payload.email)
  assert.match(f.emails[1].subject, /Zutrittskontrolle/)
  assert.equal(f.updates.at(-1).status, 'email_sent')
})

for (const formName of ['Startseite CTA', 'Kontaktseite', 'System-Konfigurator']) {
  test(`${formName} notifies both approved inboxes`, async () => {
    const f = fixture()
    await f.submit({ ...payload, formName, notifyEmails: `${client},unapproved@example.test` })
    assert.deepEqual(f.emails.map(email => email.to), [halyl, client, payload.email])
    assert.equal(f.records[0].notify_emails, `${halyl},${client}`)
  })
}

test('invalid submissions cannot save a lead or trigger email', async () => {
  const f = fixture()
  assert.equal((await f.submit({})).status, 400)
  assert.equal(f.records.length, 0)
  assert.equal(f.emails.length, 0)
})

test('failed storage cannot report success or trigger email', async () => {
  const f = fixture({ failDatabase: true })
  assert.equal((await f.submit(payload)).status, 400)
  assert.equal(f.emails.length, 0)
})

test('failed client notification is recorded and cannot report success', async () => {
  const f = fixture({ failRecipient: client })
  const response = await f.submit(payload)
  assert.equal(response.status, 502)
  assert.equal((await response.json()).ok, false)
  assert.equal(f.updates.at(-1).status, 'email_failed')
  assert.match(f.updates.at(-1).email_error, /info@ftst\.eu/)
})
