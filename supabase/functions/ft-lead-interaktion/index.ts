import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";

// Logs anonymous contact interactions (phone/email/WhatsApp clicks and
// configurator steps) into ft_lead_interaktionen. The browser sends the body
// as text/plain via navigator.sendBeacon, so no CORS preflight is needed.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const eventTypes = new Set([
  "phone_click",
  "email_click",
  "whatsapp_click",
  "configurator_start",
  "configurator_final_step",
]);
const devices = new Set(["mobile", "tablet", "desktop"]);
const allowedOrigins = [
  /^https:\/\/(www\.)?ftsicherheitstechnik\.com$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const text = value.trim().slice(0, maxLength);
  return text || null;
}

function cleanDetails(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const details: Record<string, string | number> = {};
  for (const [key, raw] of Object.entries(value).slice(0, 10)) {
    if (!/^[a-z_]{1,40}$/.test(key)) continue;
    if (typeof raw === "number" && Number.isFinite(raw)) details[key] = raw;
    else if (typeof raw === "string") details[key] = raw.slice(0, 120);
  }
  return details;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  const origin = req.headers.get("origin") || "";
  if (!allowedOrigins.some((pattern) => pattern.test(origin))) {
    return Response.json({ error: "Origin not allowed" }, { status: 403, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Missing required server secrets.");

    const body = await req.text();
    if (body.length > 4000) throw new Error("Payload too large.");
    const payload = JSON.parse(body) as Record<string, unknown>;

    const eventType = cleanText(payload.eventType, 40);
    if (!eventType || !eventTypes.has(eventType)) throw new Error("Unknown event type.");
    const device = cleanText(payload.device, 10);

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("ft_lead_interaktionen").insert({
      event_type: eventType,
      page_path: cleanText(payload.pagePath, 300),
      utm_source: cleanText(payload.utmSource, 100),
      utm_medium: cleanText(payload.utmMedium, 100),
      utm_campaign: cleanText(payload.utmCampaign, 150),
      from_google_ads: payload.fromGoogleAds === true,
      device: device && devices.has(device) ? device : null,
      details: cleanDetails(payload.details),
    });
    if (error) throw error;

    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 400, headers: corsHeaders });
  }
});
