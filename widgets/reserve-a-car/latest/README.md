# Reserve A Car Widget

Modern reservation modal for vehicle detail pages. Captures a high-intent "reserve this car" lead and posts it through the standard `/api/leads` pipeline as `leadType: "reservation"`. No payment is taken — the dealer follows up to confirm the hold.

## Bundle

```text
/widgets/reserve-a-car/latest/reserve-a-car.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/reserve-a-car/latest/reserve-a-car.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/reserve-a-car/latest/reserve-a-car.js"
  data-dealer-name="Dealer Name"
  data-dealer-client-id="dealer-id"
  data-lead-endpoint="/api/leads"
  data-hold-hours="24"
  data-phone-number="01234 567890"
  data-email="sales@example.com"
  defer
></script>
```

## Supported Data Attributes

- `data-dealer-name` / `data-brand-name`: Dealer display name used in copy and lead context.
- `data-dealer-client-id` / `data-lead-owner`: Dealer identifier sent with lead payloads.
- `data-lead-endpoint` / `data-lead-submit-url`: Lead capture endpoint. Falls back to `/leads`.
- `data-lead-type`: Optional override (default `reservation`).
- `data-lead-source`: Optional override (default `reserve-widget`).
- `data-hold-hours`: Hold-duration messaging in hours. Defaults to `24`. Pass `0` to drop the messaging.
- `data-phone-number`, `data-phone-tel`, `data-phone-display`: Success-state phone details.
- `data-whatsapp-url`: Success-state WhatsApp link.
- `data-email`: Success-state email link.

## Opening The Modal

```html
<button type="button" onclick="window.CarousReserveACar?.open?.({
  vehicle: {
    title: '2022 Volkswagen Golf',
    registration: 'AB22 CDE',
    price: 15995,
    mileage: 42000,
    fuel: 'Petrol',
    transmission: 'Manual',
    image: '/vehicle.jpg',
    url: location.href
  }
})">
  Reserve this car
</button>
```

## Runtime Configuration

```html
<script>
  window.CarousReserveACar?.configure?.({
    brandName: "Dealer Name",
    leadOwner: "dealer-id",
    leadEndpoint: "/leads",
    holdHours: 48,
    contact: {
      phoneTel: "01234567890",
      phoneDisplay: "01234 567890",
      email: "sales@example.com"
    }
  });
</script>
```

## Lead Payload

The widget posts `reservation` leads to the configured endpoint with the full vehicle context plus reservation metadata:

```json
{
  "leadType": "reservation",
  "leadSource": "reserve-widget",
  "leadOwner": "dealer-id",
  "name": "Sarah Hughes",
  "phone": "07123456789",
  "email": "...",
  "preferredContactTime": "Morning (9am – 12pm)",
  "vehicle": "2022 Volkswagen Golf - AB22 CDE",
  "reservation": {
    "requestedAt": "2026-05-26T...",
    "holdHours": 24,
    "nonBinding": true
  }
}
```

## Production Notes

- Use a versioned URL such as `/widgets/reserve-a-car/v0/reserve-a-car.js` for stable production rollouts.
- Use `/widgets/reserve-a-car/latest/reserve-a-car.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
