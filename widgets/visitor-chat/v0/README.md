# Visitor Chat Widget

Carous wrapper around the Visitor Chat live-operator service (https://cdn.visitor.chat). Loads the official VC loader, manages `VC_SETTINGS`, and exposes per-page vehicle context plus a server-side webhook receiver for leads.

## Bundle

```text
/widgets/visitor-chat/v0/visitor-chat.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/visitor-chat/v0/visitor-chat.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/visitor-chat/v0/visitor-chat.js"
  data-dealer-name="Dealer Name"
  data-dealer-client-id="dealer-id"
  defer
></script>
```

The default loader `https://cdn.visitor.chat/vc-loader.min.js` is injected automatically on first load. The widget keeps `window.VC_SETTINGS` in sync as the page navigates.

The widget ships with the central Carous VC tenant baked in (`id: 307951`, `accountId: 644981`), so dealers that route through the shared Carous account don't need to set `data-vc-id` / `data-vc-account-id` at all — `data-dealer-client-id` is enough for per-dealer lead attribution.

## Full Configuration (VC §3b multi-account)

If the Visitor Chat account manager has issued a dealer `id` + `accountId` (overrides the central Carous tenant), pass them in:

```html
<script
  src="http://widgets.carous.test/widgets/visitor-chat/v0/visitor-chat.js"
  data-vc-id="0122"
  data-vc-account-id="4662"
  data-vc-name="Lancashire Car Sales LTD"
  data-dealer-name="Lancashire Car Sales LTD"
  data-dealer-client-id="10032742"
  data-lead-endpoint="/api/leads"
  data-sb-text="Live Chat — we're online"
  data-cta-title="Live Chat"
  data-cta-text="We're online — chat with our team"
  defer
></script>
```

## Supported Data Attributes

- `data-enabled="false"`: Mount the runtime API without injecting the VC loader. Useful for region-based gating.
- `data-loader-src`: Override the VC loader URL. Defaults to `https://cdn.visitor.chat/vc-loader.min.js`.
- `data-vc-id`: Multi-account VC tenant id (supplied by VC account manager).
- `data-vc-account-id`: Multi-account VC tenant integer accountId.
- `data-vc-name`: Display name shown in the chat box. Falls back to `data-dealer-name`.
- `data-dealer-name`: Dealer display name used in copy + lead subject.
- `data-lead-owner` (or `data-dealer-client-id`): Dealer identifier echoed in `VC_SETTINGS.data.leadOwner`.
- `data-lead-endpoint`: Endpoint used by the runtime `submitLead()` helper. Default behaviour relies on the server-side webhook receiver instead.
- `data-sb-text`, `data-cta-title`, `data-cta-text`: Per-page overrides from VC §3a.

## Per-Page Vehicle Context

Vehicle detail pages should call `setVehicle` so the chat operator sees the current advert:

```html
<script>
  window.CarousVisitorChat?.setVehicle?.({
    title: "2022 Volkswagen Golf",
    advertId: "179888314",
    registration: "AB22 CDE",
    url: location.href,
    custom: { stockId: "S-9201", source: "used-cars" }
  });
</script>
```

Clear when leaving a vehicle page:

```html
<script>
  window.CarousVisitorChat?.setVehicle?.(null);
</script>
```

## Runtime API

- `window.CarousVisitorChat.configure(options)` — replace dealer / id / accountId at runtime.
- `window.CarousVisitorChat.setVehicle(vehicle | null)` — see above.
- `window.CarousVisitorChat.setOverrides({ sbText, ctaTitle, ctaText, rooms })` — per-page overrides.
- `window.CarousVisitorChat.submitLead(payload)` — manual client-side lead submit (server webhook is the canonical path).
- `window.CarousVisitorChat.getSettings()` — returns the resolved VC_SETTINGS for debugging.

The widget also dispatches a `visitorchat:settings` CustomEvent on `window` every time `VC_SETTINGS` changes.

## Lead Pipeline — central Carous webhook

For the Carous dealer fleet, **Visitor Chat posts every dealer's captured leads to one shared endpoint**:

```text
POST https://api.carous.co.uk/v1/webhooks/visitor-chat
Header: Verification-Token: <Carous-wide token>
```

Per-dealer routing happens automatically: this embed wrapper sets `VC_SETTINGS.data.leadOwner = <dealerClientId>` on every page load, VC echoes that back in `page_data` on every webhook, and the central receiver passes it through to `Leads::create_lead` as the lead owner.

VC's account manager needs:
1. The webhook URL above
2. The shared `Verification-Token` value (provisioned out of band; stored on api.carous.co.uk as `VISITOR_CHAT_VERIFICATION_TOKEN`)

Once they configure that on each dealer's VC account, every chat lead lands in the same `/leads` table as every other Carous lead, with the dealer correctly attributed.

### Optional — per-app fallback receiver

For one-off dealer sites that need to terminate the webhook on their own origin (legacy integration, regional routing, etc.), the package also ships a portable Next.js handler factory:

```ts
// app/api/visitor-chat/webhook/route.ts
import { createVisitorChatWebhookHandler } from "@carous/visitor-chat/server";

export const dynamic = "force-dynamic";

export const POST = createVisitorChatWebhookHandler({
  leadOwner: process.env.DEALER_CLIENT_ID!,
  dealerName: "Dealer Name",
  leadEndpoint: "/api/leads",
  secret: process.env.VISITOR_CHAT_VERIFICATION_TOKEN,
});
```

The handler accepts VC's `Verification-Token` header (with `X-Visitor-Chat-Secret` and `?secret=` query param as legacy fallbacks). Use the central webhook by default — only mount this when the dealer specifically can't route to the shared endpoint.

Normalised lead fields: `name, email, phone, subject, message, leadType, leadSource, leadOwner, permalink, url, vehicleTitle, advertId, registration, transcript, pageData, raw`.

## Production Notes

- Use a versioned URL such as `/widgets/visitor-chat/v0/visitor-chat.js` for stable production rollouts.
- Use `/widgets/visitor-chat/latest/visitor-chat.js` only for local testing or controlled preview environments.
- If the dealer site uses CSP headers, allow `*.visitor.chat` in `frame-ancestors` per VC §2.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
