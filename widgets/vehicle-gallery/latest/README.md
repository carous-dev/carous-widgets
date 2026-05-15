# Vehicle Gallery Widget

Static browser bundle for script-tag integration.

## Bundle

```text
/widgets/vehicle-gallery/latest/vehicle-gallery.js
```

Local test URL:

```text
http://widgets.carous.test/widgets/vehicle-gallery/latest/vehicle-gallery.js
```

## Basic Integration

```html
<div id="vehicle-gallery"></div>
<script
  src="http://widgets.carous.test/widgets/vehicle-gallery/latest/vehicle-gallery.js"
  data-target="#vehicle-gallery"
  data-vehicle-title="2022 Volkswagen Golf"
  data-images='["/cars/golf-1.jpg", "/cars/golf-2.jpg"]'
  defer
></script>
```

## Supported Data Attributes

- `data-target`: CSS selector for the mount element.
- `data-images`: JSON array, comma-separated list, or newline-separated list of image URLs.
- `data-vehicle-title`: Vehicle title used for image alt text.
- `data-video-url`: Optional YouTube/Vimeo URL.
- `data-loading="true"`: Render skeleton state.
- `data-class-name`: Optional class added to the gallery card.

## Runtime Updates

```html
<script>
  window.CarousVehicleGallery?.update?.({
    vehicleTitle: "2022 Volkswagen Golf",
    images: ["/cars/golf-1.jpg", "/cars/golf-2.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=..."
  });
</script>
```

## Production Notes

- Use a versioned URL such as `/widgets/vehicle-gallery/v0/vehicle-gallery.js` for stable production rollouts.
- Use `/widgets/vehicle-gallery/latest/vehicle-gallery.js` only for local testing or controlled preview environments.
- Publish updated local bundles with `pnpm widgets:publish` from the monorepo root.
