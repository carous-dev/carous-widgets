# Sell Your Car Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/sell-your-car/v0/sell-your-car.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/sell-your-car/v0/sell-your-car.js
```

## Basic Integration

```html
<div id="sell-your-car-widget"></div>
<script
  src="http://widgets.carous.test/widgets/sell-your-car/v0/sell-your-car.js"
  data-target="#sell-your-car-widget"
  data-dealer-name="Dealer Name"
  data-lead-endpoint="/leads"
  data-lookup-endpoint="/api/lookup"
  data-lead-owner="dealer-id"
  data-phone-number="01234 567890"
  data-email="sales@example.com"
  defer
></script>
```

## Supported Data Attributes

- `data-target`: CSS selector for the mount element.
- `data-dealer-name` or `data-brand-name`: Dealer display name used in copy and success state.
- `data-lead-endpoint` or `data-lead-submit-url`: Lead capture endpoint.
- `data-lookup-endpoint`: Vehicle lookup and valuation endpoint. Defaults to `/api/lookup`.
- `data-lead-owner`: Dealer/client identifier sent with lead payloads.
- `data-lead-type`, `data-lead-source`: Optional lead metadata overrides.
- `data-persist-progress="false"`: Disable browser restore for abandoned in-progress valuation journeys.
- `data-persistence-key`: Optional localStorage key override for saved valuation journeys.
- `data-phone-number`, `data-phone-tel`, `data-phone-display`, `data-whatsapp-url`, `data-email`: Success-state contact actions.
- `data-show-info-panel="false"`: Render only the valuation wizard.
- `data-card-title`, `data-card-subtitle`, `data-success-heading`, `data-success-body`, `data-consent-label`: Copy overrides.
- `data-hide-condition`, `data-hide-finance`, `data-hide-expected-price`, `data-hide-notes`, `data-hide-preferred-contact`, `data-hide-consent`: Optional field visibility flags.
- `data-condition-options`, `data-finance-options`, `data-preferred-contact-options`: JSON arrays of `{ "value": "...", "label": "..." }`.
- `data-trust`: JSON array of `{ "text": "..." }` trust bullets.
- `data-info-heading`, `data-info-intro`, `data-info-steps`, `data-info-benefits-heading`, `data-info-benefits`: Info panel overrides.
- `data-accent-color`, `data-accent-foreground-color`, `data-accent-soft-color`, `data-bg-color`, `data-text-color`, `data-surface-color`, `data-border-color`: Theme overrides.

## Runtime Updates

```html
<script>
  window.CarousSellYourCar?.update?.({
    leadOwner: "dealer-id",
    leadEndpoint: "/leads",
    lookupEndpoint: "/api/lookup",
    brandName: "Dealer Name",
    contact: {
      phoneTel: "01234567890",
      phoneDisplay: "01234 567890",
      email: "sales@example.com"
    }
  });
</script>
```

## Lead Flow

The widget keeps the full valuation journey in the bundle:

- registration and mileage lookup
- matched vehicle summary
- online guide vs part-exchange valuation choice
- name, phone, email, preferred contact, condition, finance, expected price, notes, and consent
- in-progress restore for abandoned journeys, including matched vehicle, valuation, fields, and current step
- honeypot/rate-limit handling from the shared Carous leads form
- success contact actions

## Production Notes

- Use a versioned URL such as `/widgets/sell-your-car/v0/sell-your-car.js` for stable production rollouts.
- Use `/widgets/sell-your-car/latest/sell-your-car.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
