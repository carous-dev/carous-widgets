# AI Search Prompt Widget

Bottom-sticky bar or floating card that invites buyers on a Carous dealer site to try the dealer-locked Carous AI search (`${aiBaseUrl}/d/<dealerId>`). The `dealerId` is the dealer's canonical `dealerClientId` (the same value used by every other Carous widget).

## Bundle

```text
/widgets/ai-search-prompt/v0/ai-search-prompt.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js
```

## Basic Integration — Sticky Bar (default)

```html
<script
  src="http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js"
  data-dealer-id="10020790"
  data-dealer-name="Scottish Van Centre"
  defer
></script>
```

## Floating Card (richer prompt)

```html
<script
  src="http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js"
  data-dealer-id="10020790"
  data-dealer-name="Scottish Van Centre"
  data-template="card"
  data-position="bottom-right"
  data-headline="Find your van, faster."
  data-subline="Ask our AI to search Scottish Van Centre's stock."
  defer
></script>
```

## Local Development

Point the widget at your local carous-ai dev server:

```html
<script
  src="http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js"
  data-dealer-id="10020790"
  data-dealer-name="Scottish Van Centre"
  data-ai-base-url="http://localhost:3050"
  defer
></script>
```

## Supported Data Attributes

- `data-dealer-id` (required): Canonical `dealerClientId`. Used in the AI URL (`/d/<dealerId>`) and in the per-dealer dismissal localStorage key.
- `data-dealer-name`: Display name surfaced in default copy.
- `data-template`: `sticky-bar` (default) or `card`.
- `data-position`: `bottom` (default for sticky-bar), or `bottom-right` / `bottom-left` / `top-right` / `top-left` for `card`.
- `data-ai-base-url`: Override the AI app origin. Defaults to `https://ai.carous.co.uk`. Use `http://localhost:3050` for local dev.
- `data-headline`: Headline copy. Defaults derived from `dealer-name` + template.
- `data-subline`: Sub-copy below the headline (card only). Falls back to a default.
- `data-cta-label`: CTA button label. Defaults to `Try it`.
- `data-primary-color`: Brand accent (CTA + top border). Defaults to `#0D3FB6`.
- `data-bg-color`: Sticky-bar background. Defaults to `#0D1530`.
- `data-show-delay-ms`: Delay before first appearance. Defaults to `8000`.
- `data-dismiss-days`: How long a dismissal suppresses the banner. Defaults to `7`.
- `data-enabled="false"`: Mount without rendering — useful for region-based gating.

## Mounting Both Templates

Each mount carries its own `(dealerId, template)` dismissal flag, so you can ship the card on the home page and the sticky-bar on inventory pages, or both at once, without one dismissing the other:

```html
<!-- Persistent low-friction bar at the bottom of every page -->
<script
  src="http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js"
  data-dealer-id="10020790"
  data-dealer-name="Scottish Van Centre"
  data-template="sticky-bar"
  defer
></script>

<!-- Higher-intent card prompt for landing pages -->
<script
  src="http://widgets.carous.test/widgets/ai-search-prompt/v0/ai-search-prompt.js"
  data-dealer-id="10020790"
  data-dealer-name="Scottish Van Centre"
  data-template="card"
  data-position="bottom-right"
  data-show-delay-ms="12000"
  defer
></script>
```

## Production Notes

- Use a versioned URL such as `/widgets/ai-search-prompt/v0/ai-search-prompt.js` for stable production rollouts.
- Use `/widgets/ai-search-prompt/latest/ai-search-prompt.js` only for local testing or controlled preview environments.
- Widget bundle is fully self-contained (vanilla JS + shadow DOM). No host-page CSS leakage in either direction.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
