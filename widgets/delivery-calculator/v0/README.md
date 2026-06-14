# Delivery Calculator Widget

Static browser bundle for script-tag integration. UK postcode → road-distance → banded delivery quote with ETA + cheaper-tier nudge.

## Bundle

```text
/widgets/delivery-calculator/v0/delivery-calculator.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/delivery-calculator/v0/delivery-calculator.js
```

## Basic Integration

```html
<div id="delivery-calculator"></div>
<script
  src="http://widgets.carous.test/widgets/delivery-calculator/v0/delivery-calculator.js"
  data-target="#delivery-calculator"
  data-origin-postcode="LE8 0AB"
  data-heading="Get a delivery quote"
  data-subheading="Pop your postcode in for an instant cost and ETA."
  data-currency-symbol="£"
  data-road-multiplier="1.25"
  data-tiers='[
    {"minMiles":0,"maxMiles":25,"flatPrice":0,"label":"Local","eta":"Same or next day"},
    {"minMiles":25,"maxMiles":100,"flatPrice":99,"label":"Regional"},
    {"minMiles":100,"maxMiles":250,"flatPrice":199,"label":"UK mainland"},
    {"minMiles":250,"pricePerMile":0.85,"label":"Long distance"}
  ]'
  defer
></script>
```

## Supported Data Attributes

- `data-target`: CSS selector for the mount element. Required.
- `data-origin-postcode` (or `data-origin`): Dealer's postcode used as the start of every quote. Required.
- `data-tiers`: JSON array of banded tiers, ordered ascending by `minMiles`. Required.
- `data-heading`, `data-subheading`: Optional copy overrides.
- `data-placeholder`: Postcode input placeholder. Defaults to `e.g. SW1A 1AA`.
- `data-submit-label`: Submit button copy. Defaults to `Get quote`.
- `data-currency-symbol`: Defaults to `£`.
- `data-road-multiplier`: Crow-flies → road miles multiplier. Defaults to `1.25`. Pass `1` to quote straight-line miles.
- `data-accent-color` (or `data-primary-color`), `data-bg-color`, `data-surface-color`, `data-text-color`, `data-muted-color`, `data-border-color`: Theme overrides. Defaults consume the host app's `--color-*` tokens with sensible fallbacks.

## Tier Schema

Each tier object supports:

- `minMiles` (number, required) — inclusive lower bound.
- `maxMiles` (number, optional) — exclusive upper bound. Omit on the last tier ("and beyond").
- `flatPrice` (number, optional) — fixed £ for any postcode landing in the band. Use `0` for free delivery.
- `pricePerMile` (number, optional) — alternative to `flatPrice`. If both are present `flatPrice` wins.
- `label` (string, required) — shown next to the quote and in the full-tier list.
- `eta` (string, optional) — per-tier delivery ETA copy. Falls back to a distance-derived default.

## Smart UX

- **Road-distance estimate** — multiplies straight-line miles by the configured multiplier (default 1.25×) for a realistic UK road quote.
- **Destination town** — surfaces the buyer's admin district from postcodes.io ("42 miles · Leicester").
- **ETA** — per-tier override, or distance-derived default ("Same or next day", "1–2 working days", …).
- **Cheaper-tier nudge** — when the buyer just misses a cheaper band, the result hints "you're ~X miles outside our <Local> band — let us know if you can collect partway."

## Programmatic API

```html
<script>
  window.CarousDeliveryCalculator?.mount?.("#delivery-calculator", {
    originPostcode: "LE8 0AB",
    tiers: [
      { minMiles: 0, maxMiles: 25, flatPrice: 0, label: "Local" },
      { minMiles: 25, maxMiles: 100, flatPrice: 99, label: "Regional" }
    ]
  });

  window.CarousDeliveryCalculator?.configure?.({
    currencySymbol: "£",
    roadMultiplier: 1.3
  });
</script>
```

## Distance Data

The widget calls `https://api.postcodes.io` (free, no key, UK-only). Lookups are cached in-memory per page load. The bundle does not include any vendor data.

## Production Notes

- Use a versioned URL such as `/widgets/delivery-calculator/v0/delivery-calculator.js` for stable production rollouts.
- Use `/widgets/delivery-calculator/latest/delivery-calculator.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
