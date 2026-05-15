# Carous Widgets

Static widget bundles served from `https://widgets.carous.co.uk/`.

This directory is generated from `carous-platform` with:

```sh
pnpm widgets:publish
```

## Deployment

GitHub Actions deploys the contents of this repository to the Apache docroot on pushes to `main`.

Required repository secrets:

- `VPS_HOST`: `46.202.140.63`
- `VPS_PORT`: `22`
- `VPS_USER`: `root`
- `VPS_DEPLOY_PATH`: `/var/www/widgets.carous.co.uk`
- `VPS_SSH_KEY`: private SSH key allowed to write to the VPS deploy path
