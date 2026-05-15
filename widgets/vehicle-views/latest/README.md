# Vehicle Views Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/vehicle-views/latest/vehicle-views.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/vehicle-views/latest/vehicle-views.js
```

## Basic Integration

```html
<script
  src="http://widgets.carous.test/widgets/vehicle-views/latest/vehicle-views.js"
  data-advert-id="12345"
  data-slug="2022-volkswagen-golf"
  data-registration="AB22 CDE"
  data-vehicle-title="2022 Volkswagen Golf"
  data-endpoint="/api/analytics"
  defer
></script>
```

## Supported Data Attributes

- `data-advert-id`: Primary advert identifier.
- `data-vehicle-key`: Optional stable fallback key.
- `data-slug`, `data-registration`, `data-vin`: Optional vehicle identifiers.
- `data-label` or `data-vehicle-title`: Human-readable vehicle label.
- `data-path`: Page path. Defaults to `location.pathname`.
- `data-endpoint` or `data-analytics-endpoint`: Analytics endpoint. Defaults to `/api/analytics`.
- `data-cooldown-ms`: Per-browser duplicate view cooldown. Defaults to package behavior.
- `data-enabled="false"`: Mount without sending.

## Runtime Tracking

```html
<script>
  window.CarousVehicleViews?.track?.({
    advertId: "12345",
    slug: "2022-volkswagen-golf",
    registration: "AB22 CDE",
    label: "2022 Volkswagen Golf",
    path: location.pathname
  });
</script>
```

## Production Notes

- Use a versioned URL such as `/widgets/vehicle-views/v0/vehicle-views.js` for stable production rollouts.
- Use `/widgets/vehicle-views/latest/vehicle-views.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
