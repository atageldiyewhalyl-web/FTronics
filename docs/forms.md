# Website inquiry forms

## Production connection

The main domain `www.ftsicherheitstechnik.com` belongs to Vercel project
`f-tronics-rrbk` (`prj_XCiHgWWmilK8hbcdLb8bHyO8cFdN`), team
`team_334NTm7ODOn0jh514aahv06t`. The local `.vercel` link may point to the
separate `ftronics` project; always select the main-domain project explicitly.

Set these public Config variables in the intended Vercel project before building:

- `NEXT_PUBLIC_SUPABASE_URL`: `https://srnynewvauzymnljqskj.supabase.co`
- `NEXT_PUBLIC_LEAD_CAPTURE_ENDPOINT`: `https://srnynewvauzymnljqskj.supabase.co/functions/v1/ft-lead-anfrage`

Next.js embeds these values into the browser bundle at build time. Changing them
requires a new deployment. `next.config.mjs` rejects a Vercel production build
when both are absent, preventing forms with no destination from going live.

The Supabase service-role key and Resend API key belong only in Supabase function
secrets. Never put either in a `NEXT_PUBLIC_` variable.

## Submission flow

1. The campaign `InquiryForm.jsx`, used on `/videoueberwachung-gewerbe`,
   `/alarmanlagen-gewerbe` and `/zutrittskontrolle-gewerbe`, validates the required company, contact name and
   email fields, then calls the shared `submitLead` helper.
2. The `ft-lead-anfrage` Edge Function validates the payload and stores it in
   `public.ft_lead_anfragen`. Row-level security blocks public table access.
3. Resend sends an internal notification and a confirmation to the requester.
   Internal notifications use the requester's address as Reply-To.
4. The form shows success only after the endpoint returns `{ ok: true }`.
   On failure, entered values remain available for retry. Conversion events fire
   after success and only with marketing consent.

Campaign inquiries use a service-specific form name and subject:

- `Landingpage Videoüberwachung Gewerbe` / `Videoüberwachung für Gewerbe`
- `Landingpage Alarmanlagen Gewerbe` / `Alarmanlagen für Gewerbe`
- `Landingpage Zutrittskontrolle Gewerbe` / `Zutrittskontrolle für Gewerbe`

Company, property type, location and the request are included in the message;
name, email, phone and page URL are stored separately. The page URL preserves
campaign query parameters.

Campaign notifications go to both `info@ftst.eu` and `halyl@xn--nll-hoa.com`
(`halyl@nüll.com`). Other website forms retain their existing Halyl-only routing.
Recipient changes must be made in the server-side allowlist/routing: the browser's
`NEXT_PUBLIC_LEAD_NOTIFY_EMAILS` setting cannot add an unapproved recipient.

Do not send test inquiries to the client. The live connection test on 2026-10-30
was completed while the server was still configured for Halyl only, before enabling
the client recipient. Future automated verification must mock email delivery or
use a separate test endpoint that sends only to Halyl; submitting the live campaign
form normally notifies both inboxes.

## Connection correction — 2026-10-30

The live main-domain JavaScript bundle contained an empty backend URL even though
the local environment was configured. The two public URLs were re-saved as Config
variables on the main-domain Vercel project. The deployed Supabase function matched
the repository source, was active, and its required secrets were configured.
An empty test POST returned a validation error without writing an inquiry or
sending email. Local checks confirmed that missing production configuration fails,
either supported URL enables the build, and local development remains unaffected.

The live browser test showed the success state and created lead
`bdea9b56-20e1-4ad8-98bc-ac5f174471a7` with status `email_sent` and no email error.
The test notification and requester confirmation went only to Halyl, before
client notifications were enabled. This status confirms Resend API acceptance,
not independent verification of inbox placement. Marketing consent was disabled
during the test to avoid counting a test conversion.

`node --test scripts/test-lead-routing.mjs` verifies campaign and legacy routing,
rejects browser recipient overrides, and covers invalid input, storage failure
and email failure using mocks. It performs no network requests and sends no mail.
