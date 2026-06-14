# AI Chat Widget

Drop-in AI chat assistant for dealer sites. Streams from `services/ai-chat-api` (Groq-backed) and surfaces matching vehicles as inline cards.

## Bundle

```text
/widgets/ai-chat/v0/ai-chat.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/ai-chat/v0/ai-chat.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/ai-chat/v0/ai-chat.js"
  data-dealer-client-id="dealer-id"
  data-dealer-name="Dealer Name"
  data-chat-endpoint="https://ai-chat.carous.co.uk/chat"
  data-primary-color="#067a74"
  data-position="bottom-right"
  data-launcher-label="Chat with us"
  data-suggestions="Show me what's in stock|Open today?|Finance options|Get my car valued"
  data-vehicle-detail-url-template="/used-cars/{slug}"
  defer
></script>
```

## Supported Data Attributes

- `data-dealer-client-id`: Dealer identifier sent with every request (also used as a key by the backend's dealer config).
- `data-dealer-name`: Display name shown in greeting, panel title, and lead context.
- `data-chat-endpoint`: POST endpoint of the streaming chat API. Omit to run in demo mode.
- `data-api-base`: Alternative to `data-chat-endpoint` — resolves to `{base}/chat`.
- `data-vehicle-detail-url-template`: Template like `/used-cars/{slug}` used to link inline cards.
- `data-position`: `bottom-right` (default) or `bottom-left`.
- `data-primary-color`, `data-primary-color-strong`: Brand colour overrides for the launcher and accents.
- `data-launcher-label`: Accessible label on the floating button. Defaults to "Chat with us".
- `data-panel-title`: Header title. Defaults to "Ask {Dealer Name}".
- `data-input-placeholder`: Composer placeholder text.
- `data-greeting`: First-open greeting line.
- `data-suggestions`: Pipe-separated list of suggestion chips shown on first open.
- `data-powered-by`: Footer line under the composer.
- `data-demo-mode="true"`: Force the built-in demo stream even when an endpoint is configured.
- `data-enabled="false"`: Mount but render nothing — useful for region-based gating.

## Programmatic Open/Close

```html
<button type="button" onclick="window.CarousAIChat?.open?.()">Ask a question</button>
<button type="button" onclick="window.CarousAIChat?.close?.()">Close chat</button>
```

## Runtime Configuration

```html
<script>
  window.CarousAIChat?.configure?.({
    dealerName: "Dealer Name",
    chatEndpoint: "https://ai-chat.carous.co.uk/chat",
    primaryColor: "#067a74"
  });
</script>
```

## Backend Contract

The widget POSTs JSON `{ dealerClientId, sessionId, message, history }` and expects an SSE response with these events: `token` (assistant deltas), `tool_call`, `tool_result`, `cards` (inline vehicle cards), `lead_captured`, `done`, `error`. Default model: `llama-3.3-70b-versatile` via Groq.

## Production Notes

- Use a versioned URL such as `/widgets/ai-chat/v0/ai-chat.js` for stable production rollouts.
- Use `/widgets/ai-chat/latest/ai-chat.js` only for local testing or controlled preview environments.
- Backend service: `services/ai-chat-api` — Node 22+ `node:http`, no extra deps, streams from Groq.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
