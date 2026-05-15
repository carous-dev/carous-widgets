# Vehicle Enquiry Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/vehicle-enquiry/latest/vehicle-enquiry.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/vehicle-enquiry/latest/vehicle-enquiry.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/vehicle-enquiry/latest/vehicle-enquiry.js"
  data-dealer-name="Dealer Name"
  data-lead-endpoint="/leads"
  data-lead-owner="dealer-id"
  data-phone-number="01234 567890"
  data-email="sales@example.com"
  defer
></script>
```

## Supported Data Attributes

- `data-dealer-name`: Dealer display name used in copy and success state.
- `data-lead-endpoint` or `data-lead-submit-url`: Lead capture endpoint.
- `data-lead-owner`: Dealer/client identifier sent with lead payloads.
- `data-lead-type`: Optional lead type override.
- `data-lead-source`: Optional lead source override.
- `data-default-intent`: `info`, `viewing`, or `reserve`.
- `data-phone-number`, `data-phone-tel`, `data-phone-display`: Optional success-state phone details.
- `data-whatsapp-url`: Optional success-state WhatsApp link.
- `data-email`: Optional success-state email link.

## Opening The Modal

```html
<button type="button" onclick="window.CarousVehicleEnquiry?.open?.({
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
  Enquire
</button>
```

## Runtime Configuration

```html
<script>
  window.CarousVehicleEnquiry?.configure?.({
    brandName: "Dealer Name",
    leadOwner: "dealer-id",
    leadEndpoint: "/leads",
    contact: {
      phoneTel: "01234567890",
      phoneDisplay: "01234 567890",
      email: "sales@example.com"
    }
  });
</script>
```

## Production Notes

- Use a versioned URL such as `/widgets/vehicle-enquiry/v0/vehicle-enquiry.js` for stable production rollouts.
- Use `/widgets/vehicle-enquiry/latest/vehicle-enquiry.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
