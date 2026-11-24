# Garage Booking Widget

Static browser bundle for script-tag integration. A multi-step booking flow for garages (service -> date/time -> vehicle -> details) that talks directly to the Garage DMS booking API (`api.carous.co.uk/v1/garage/booking/*`) and submits bookings to `/v1/garage/bookings`. Live availability, service options, and pricing are driven by the garage's DMS tenant; the bundle carries no per-garage data.

## Bundle

```text
/widgets/garage-booking/latest/garage-booking.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/garage-booking/latest/garage-booking.js
```

## Basic Integration

Mount in place with a `[data-carous-booking]` container. Only `data-garage` (the DMS tenant slug) is required:

```html
<div data-carous-booking data-garage="your-garage-slug"></div>
<script src="http://widgets.carous.test/widgets/garage-booking/latest/garage-booking.js" defer></script>
```

The bundle auto-mounts every `[data-carous-booking]` container (and `<carous-booking>` element) on load. Script-level `data-*` attributes act as defaults for every mount; element-level `data-*` attributes override them.

## Supported Data Attributes

- `data-garage` (**required**): Garage slug / publishable key for the DMS tenant, e.g. `amd-tyres`.
- `data-api-base`: API origin. Defaults to `https://api.carous.co.uk`. Point at a local clone for dev.
- `data-service`: Preselect a service slug in step 1 (e.g. carried from a service page's "Book / Get a price").
- `data-reg`: Prefill the vehicle registration (vehicle step).
- `data-note`: Prefill the "what's happening?" notes, e.g. a chosen service tier or an assembled item list. Flows through to the lead.
- `data-theme`: `light` (default), `dark`, or `auto`.
- `data-template`: Card chrome only, same flow. `classic` (default), `soft`, or `minimal`.
- `data-mode`: `inline` (render in place) or `modal` (overlay).
- `data-accent`: Brand accent colour (CSS colour). Defaults to AMD orange.
- `data-accent-ink`: Readable accent text on light surfaces (e.g. prices). Derived from `accent` if omitted.
- `data-accent-contrast`: Text/icon colour shown ON the accent fill (buttons, selected states).
- `data-radius`: Corner radius (any CSS length, e.g. `8px`). Defaults to `16px`.
- `data-font`: Font family (CSS value). Defaults to inherit from the host.
- `data-home-url`: "Back to home" link target shown on the confirmation screen.
- `data-brand-name`: Display name used in copy ("Back to <brandName>").
- `data-phone`: Workshop phone for the "call us" fallback when there's no online availability.

## Programmatic API

```html
<script>
  // Re-scan the DOM and mount any new [data-carous-booking] nodes (idempotent).
  // Call after client-side (SPA) navigation inserts a fresh mount node.
  window.CarousGarageBooking?.mountAll?.();

  // Mount into a specific element with an explicit config.
  window.CarousGarageBooking?.mount?.("#booking", { garage: "your-garage-slug", service: "brakes" });

  // Open the flow in a modal overlay (for "Book now" buttons).
  window.CarousGarageBooking?.open?.({ garage: "your-garage-slug", service: "mot-repairs" });
</script>
```

## Backend Contract

The widget reads config/availability from `GET /v1/garage/booking/{config,month,slots,next-available}`, prefills the vehicle from `GET /v1/garage/booking/vehicle-lookup`, and submits bookings with `POST /v1/garage/bookings`. All requests carry the `garage` slug; the public booking surface needs no token.

## Production Notes

- Use a versioned URL such as `/widgets/garage-booking/v1/garage-booking.js` for stable production rollouts.
- Use `/widgets/garage-booking/latest/garage-booking.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
