import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";

type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  customerType?: string;
  message?: string;
  formName?: string;
  pageUrl?: string;
  configurator?: Record<string, unknown>;
  notifyEmails?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fromEmail = "FT Sicherheitstechnik <anfrage@forms.xn--nll-hoa.com>";
const notificationRecipients = [
  "halyl@xn--nll-hoa.com",
];
const allowedNotifyEmails = new Set([
  "halyl@xn--nll-hoa.com",
]);

function cleanText(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function validatePayload(payload: LeadPayload) {
  const lead = {
    fullName: cleanText(payload.fullName, 160),
    email: cleanText(payload.email, 254).toLowerCase(),
    phone: cleanText(payload.phone, 80),
    subject: cleanText(payload.subject, 140),
    customerType: cleanText(payload.customerType, 80),
    message: cleanText(payload.message, 4000),
    formName: cleanText(payload.formName, 120) || "Website Anfrage",
    pageUrl: cleanText(payload.pageUrl, 1000),
    configurator: cleanObject(payload.configurator),
    notifyEmails: cleanText(payload.notifyEmails, 500),
  };

  if (!lead.fullName || !lead.email || !lead.subject || !lead.message) {
    throw new Error("Missing required lead fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    throw new Error("Invalid email address.");
  }

  return lead;
}

function parseEmailList(value: string) {
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

function resolveRecipients(lead: ReturnType<typeof validatePayload>) {
  const requestedRecipients = parseEmailList(lead.notifyEmails)
    .filter((email) => allowedNotifyEmails.has(email));

  return Array.from(new Set([...notificationRecipients, ...requestedRecipients]));
}

function renderConfigurator(configurator: Record<string, unknown>) {
  const entries = Object.entries(configurator);
  if (!entries.length) return "-";

  return entries
    .map(([key, value]) => {
      const display = Array.isArray(value) ? value.join(", ") : String(value || "-");
      return `${key}: ${display}`;
    })
    .join("\n");
}

function renderTextEmail(lead: ReturnType<typeof validatePayload>) {
  return [
    "Neue FT Sicherheitstechnik Anfrage",
    "",
    `Name: ${lead.fullName}`,
    `E-Mail: ${lead.email}`,
    `Telefon: ${lead.phone || "-"}`,
    `Betreff: ${lead.subject}`,
    `Kundentyp: ${lead.customerType || "-"}`,
    `Formular: ${lead.formName}`,
    `Seite: ${lead.pageUrl || "-"}`,
    "",
    "Konfigurator:",
    renderConfigurator(lead.configurator),
    "",
    "Nachricht:",
    lead.message,
  ].join("\n");
}

function renderHtmlEmail(lead: ReturnType<typeof validatePayload>) {
  const rows = [
    ["Name", lead.fullName],
    ["E-Mail", lead.email],
    ["Telefon", lead.phone || "-"],
    ["Betreff", lead.subject],
    ["Kundentyp", lead.customerType || "-"],
    ["Formular", lead.formName],
    ["Seite", lead.pageUrl || "-"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#1d1d1f;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 16px">Neue FT Sicherheitstechnik Anfrage</h1>
      <table style="border-collapse:collapse;width:100%;max-width:760px">
        ${rows
          .map(([label, value]) => `
            <tr>
              <td style="border:1px solid #e5e7eb;padding:10px;font-weight:700;background:#f4f6f7;width:170px">${escapeHtml(label)}</td>
              <td style="border:1px solid #e5e7eb;padding:10px">${escapeHtml(value)}</td>
            </tr>
          `)
          .join("")}
      </table>
      <h2 style="font-size:16px;margin:22px 0 8px">Konfigurator</h2>
      <p style="white-space:pre-wrap;background:#f4f6f7;border:1px solid #e5e7eb;padding:14px">${escapeHtml(renderConfigurator(lead.configurator))}</p>
      <h2 style="font-size:16px;margin:22px 0 8px">Nachricht</h2>
      <p style="white-space:pre-wrap;background:#f4f6f7;border:1px solid #e5e7eb;padding:14px">${escapeHtml(lead.message)}</p>
    </div>
  `;
}

function renderConfirmationTextEmail(lead: ReturnType<typeof validatePayload>) {
  return [
    "Hallo " + lead.fullName + ",",
    "",
    "vielen Dank für Ihre Anfrage bei FT Sicherheitstechnik.",
    "",
    "Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden persönlich bei Ihnen. Falls es um ein dringendes Anliegen geht, erreichen Sie uns auch direkt telefonisch unter +49 621 159 647 34.",
    "",
    "Ihre Angaben:",
    `Name: ${lead.fullName}`,
    `E-Mail: ${lead.email}`,
    `Telefon: ${lead.phone || "-"}`,
    `Betreff: ${lead.subject}`,
    "",
    "Ihre Nachricht:",
    lead.message,
    "",
    "Freundliche Grüße",
    "FT Sicherheitstechnik",
    "Hafenbahnstraße 15, 68305 Mannheim",
    "+49 621 159 647 34",
    "info@ftst.eu",
  ].join("\n");
}

function renderConfirmationHtmlEmail(lead: ReturnType<typeof validatePayload>) {
  const rows = [
    ["Name", lead.fullName],
    ["E-Mail", lead.email],
    ["Telefon", lead.phone || "-"],
    ["Betreff", lead.subject],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#1d1d1f;line-height:1.6">
      <h1 style="font-size:22px;margin:0 0 16px">Ihre Anfrage ist bei FT Sicherheitstechnik eingegangen</h1>
      <p>Hallo ${escapeHtml(lead.fullName)},</p>
      <p>vielen Dank für Ihre Anfrage bei FT Sicherheitstechnik.</p>
      <p>Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden persönlich bei Ihnen. Falls es um ein dringendes Anliegen geht, erreichen Sie uns auch direkt telefonisch unter <a href="tel:+4962115964734" style="color:#e30613;text-decoration:none">+49 621 159 647 34</a>.</p>
      <h2 style="font-size:16px;margin:22px 0 8px">Ihre Angaben</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(([label, value]) => `
            <tr>
              <td style="border:1px solid #e5e7eb;padding:10px;font-weight:700;background:#f4f6f7;width:140px">${escapeHtml(label)}</td>
              <td style="border:1px solid #e5e7eb;padding:10px">${escapeHtml(value)}</td>
            </tr>
          `)
          .join("")}
      </table>
      <h2 style="font-size:16px;margin:22px 0 8px">Ihre Nachricht</h2>
      <p style="white-space:pre-wrap;background:#f4f6f7;border:1px solid #e5e7eb;padding:14px">${escapeHtml(lead.message)}</p>
      <p style="margin-top:24px">
        Freundliche Grüße<br>
        FT Sicherheitstechnik<br>
        Hafenbahnstraße 15, 68305 Mannheim<br>
        +49 621 159 647 34<br>
        <a href="mailto:info@ftst.eu" style="color:#e30613;text-decoration:none">info@ftst.eu</a>
      </p>
    </div>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
      throw new Error("Missing required server secrets.");
    }

    const payload = await req.json() as LeadPayload;
    const lead = validatePayload(payload);

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("ft_lead_anfragen")
      .insert({
        full_name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        subject: lead.subject,
        customer_type: lead.customerType,
        message: lead.message,
        form_name: lead.formName,
        page_url: lead.pageUrl,
        configurator: lead.configurator,
        notify_emails: lead.notifyEmails,
      })
      .select("id")
      .single();

    if (error) throw error;

    const leadId = data.id as string;
    const to = resolveRecipients(lead);

    if (!to.length) {
      throw new Error("No lead recipient configured.");
    }

    const subject = `Neue Anfrage: ${lead.subject} - ${lead.fullName}`;
    const html = renderHtmlEmail(lead);
    const text = renderTextEmail(lead);
    const failedDeliveries: string[] = [];

    for (const recipient of to) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipient,
          subject,
          html,
          text,
          reply_to: lead.email,
        }),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.text();
        failedDeliveries.push(`${recipient}: ${emailError.slice(0, 500)}`);
      }
    }

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: lead.email,
        subject: "Ihre Anfrage ist bei FT Sicherheitstechnik eingegangen",
        html: renderConfirmationHtmlEmail(lead),
        text: renderConfirmationTextEmail(lead),
      }),
    });

    if (!confirmationResponse.ok) {
      const emailError = await confirmationResponse.text();
      failedDeliveries.push(`${lead.email}: ${emailError.slice(0, 500)}`);
    }

    if (failedDeliveries.length) {
      await supabase
        .from("ft_lead_anfragen")
        .update({ status: "email_failed", email_error: failedDeliveries.join("\n").slice(0, 1000) })
        .eq("id", leadId);

      return Response.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502, headers: corsHeaders },
      );
    }

    await supabase
      .from("ft_lead_anfragen")
      .update({ status: "email_sent", email_sent_at: new Date().toISOString(), email_error: null })
      .eq("id", leadId);

    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : error && typeof error === "object" && "message" in error
        ? String((error as { message?: unknown }).message)
        : "Unknown error";
    return Response.json({ error: message }, { status: 400, headers: corsHeaders });
  }
});
