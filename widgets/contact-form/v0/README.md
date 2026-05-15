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

- `data-target`: CSS selector for the inline mount element.
- `data-dealer-name` or `data-brand-name`: Dealer display name used in copy and lead subjects.
- `data-lead-endpoint` or `data-lead-submit-url`: Lead capture endpoint.
- `data-lead-owner` or `data-dealer-client-id`: Dealer/client identifier sent with lead payloads.
- `data-lead-type`, `data-lead-source`: Optional lead metadata overrides.
- `data-phone-number`, `data-phone-tel`, `data-email`: Optional contact details displayed in the side panel.
- `data-title`, `data-subtitle`: Optional inline widget copy overrides.

## Modal API

```html
<button type="button" onclick="window.CarousContactForm?.open?.()">Send message</button>
```

The widget exposes:

- `window.CarousContactForm.mount(target, options)`
- `window.CarousContactForm.open(options)`
- `window.CarousContactForm.close()`
- `window.CarousContactForm.configure(options)`

## Lead Flow

The widget posts directly to the configured leads endpoint with:

- `leadType: "contact-us"`
- `leadSource: "contact-page"`
- `leadOwner`
- name, phone, email, topic, preferred contact, message, page URL
- honeypot and `formTs` metadata

## Production Notes

- Use a versioned URL such as `/widgets/contact-form/v0/contact-form.js` for stable production rollouts.
- Use `/widgets/contact-form/latest/contact-form.js` only for local testing or controlled preview environments.
