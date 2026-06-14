# Support Chat Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/support-chat/v0/support-chat.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/support-chat/v0/support-chat.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/support-chat/v0/support-chat.js"
  data-dealer-name="Dealer Name"
  data-phone-number="01234 567890"
  data-whatsapp-number="447700900123"
  data-lead-submit-url="/leads"
  data-lead-owner="dealer-id"
  defer
></script>
```

## Supported Data Attributes

- `data-dealer-name`: Dealer display name.
- `data-phone-number`: Public phone number shown in the widget.
- `data-whatsapp-number`: WhatsApp number. UK local numbers are normalized to `44...`.
- `data-lead-submit-url`: Optional endpoint for lead capture before opening WhatsApp.
- `data-lead-owner`: Optional dealer/client identifier sent with lead payloads.
- `data-support-timezone`: Optional timezone, defaults to `Europe/London`.
- `data-support-hours`: Optional JSON weekly schedule.
- `data-placement`: `bottom-right` or `bottom-left`.
- `data-accent-color`, `data-surface-color`, `data-text-color`, `data-border-color`: Optional theme overrides.

## Page-Specific Vehicle Context

Vehicle detail pages can update the mounted widget without importing React package code:

```html
<script>
  window.CarousWhatsAppEnquiry?.setSubject?.({
    dealerName: "Dealer Name",
    whatsappNumber: "447700900123",
    pageTitle: document.title,
    pageUrl: location.href,
    defaultIntentId: "availability",
    launcherLabel: "Vehicle enquiry",
    panelTitle: "Vehicle enquiry",
    panelDescription: "Ask about this vehicle, availability, finance, or part exchange.",
    vehicle: {
      label: "2022 Volkswagen Golf",
      registration: "AB22 CDE",
      price: 15995,
      mileage: 42000,
      fuel: "Petrol",
      transmission: "Manual"
    }
  });
</script>
```

Clear vehicle context when leaving a detail page:

```html
<script>
  window.CarousWhatsAppEnquiry?.setSubject?.(null);
</script>
```

## Production Notes

- Use a versioned URL such as `/widgets/support-chat/v0/support-chat.js` for stable production rollouts.
- Use `/widgets/support-chat/latest/support-chat.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
