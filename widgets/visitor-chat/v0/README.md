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

## Full Configuration (VC §3b multi-account)

If the Visitor Chat account manager has issued a dealer `id` + `accountId`, pass them in:

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

## Lead Pipeline (Server-Side Webhook)

Visitor Chat is an operator-driven service — leads are captured by their operators and delivered via webhook. To land those leads in the standard Carous `/api/leads` pipeline, mount the bundled webhook receiver in any Next.js dealer app:

```ts
// app/api/visitor-chat/webhook/route.ts
import { createVisitorChatWebhookHandler } from "@carous/visitor-chat/server";

export const dynamic = "force-dynamic";

export const POST = createVisitorChatWebhookHandler({
  leadOwner: process.env.DEALER_CLIENT_ID!,
  dealerName: "Dealer Name",
  leadEndpoint: "/api/leads",
  secret: process.env.VISITOR_CHAT_WEBHOOK_SECRET,
});
```

Then share `https://www.<dealer>.co.uk/api/visitor-chat/webhook?secret=<token>` with the Visitor Chat account manager.

Normalised lead fields: `name, email, phone, subject, message, leadType, leadSource, leadOwner, permalink, url, vehicleTitle, advertId, registration, transcript, pageData, raw`.

## Production Notes

- Use a versioned URL such as `/widgets/visitor-chat/v0/visitor-chat.js` for stable production rollouts.
- Use `/widgets/visitor-chat/latest/visitor-chat.js` only for local testing or controlled preview environments.
- If the dealer site uses CSP headers, allow `*.visitor.chat` in `frame-ancestors` per VC §2.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
