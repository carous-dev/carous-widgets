# Contact Form Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/contact-form/latest/contact-form.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/contact-form/latest/contact-form.js
```

## Basic Integration

```html
<div id="contact-form-widget"></div>
<script
  src="http://widgets.carous.test/widgets/contact-form/latest/contact-form.js"
  data-target="#contact-form-widget"
  data-dealer-name="Dealer Name"
  data-lead-endpoint="/leads"
  data-lead-owner="dealer-id"
  data-phone-number="01234 567890"
  data-email="sales@example.com"
  defer
></script>
```

## Supported Data Attributes

- `data-target`: CSS selector for the mount element.
- `data-dealer-name` or `data-brand-name`: Dealer display name used in copy and lead payloads.
- `data-lead-endpoint` or `data-lead-submit-url`: Lead capture endpoint.
- `data-lead-owner` or `data-dealer-client-id`: Dealer/client identifier sent with lead payloads.
- `data-lead-type`, `data-lead-source`: Optional lead metadata overrides.
- `data-phone-number`, `data-phone-tel`, `data-phone-display`, `data-email`: Optional contact details.
- `data-title`, `data-subtitle`: Optional modal copy overrides.
- `data-min-submit-ms`, `data-rate-limit-window-ms`, `data-rate-limit-max`: Browser-side automation guard tuning.

## Opening The Modal

```html
<button type="button" onclick="window.CarousContactForm?.open?.()">Send message</button>
```

## Runtime Configuration

```html
<script>
  window.CarousContactForm?.configure?.({
    dealerName: "Dealer Name",
    leadOwner: "dealer-id",
    leadEndpoint: "/leads",
    phoneNumber: "01234 567890",
    email: "sales@example.com"
  });
</script>
```

## Lead Flow

The widget posts `contact-us` leads to the configured endpoint and includes lightweight browser-side automation protection:

- hidden honeypot fields
- minimum render-to-submit timing
- local repeat-submit rate limiting
- silent success handling for obvious automation

## Production Notes

- Use a versioned URL such as `/widgets/contact-form/v0/contact-form.js` for stable production rollouts.
- Use `/widgets/contact-form/latest/contact-form.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
