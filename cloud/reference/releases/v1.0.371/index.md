# v1.0.371

date: 2026-11-20



- feat(oauth): support RFC 7592 client configuration endpoint for dynamically registered clients @leecalcote (#6504)
- feat(server): serve tenant-host OAuth discovery with a host-root issuer and neutral endpoint paths @hortison (#6502)
- feat(skills): add cluster-diagnostics skill for staging, production and local @hortison (#6493)
- feat: tag-triggered marketing journey runner @leecalcote (#6473)
- ci: run every workflow job on self-hosted staging runners @yi-nuo426 (#6485)
- fix(deploy): quote githubappid so Helm renders GITHUB_APP_ID as an integer string @yi-nuo426 (#6482)

## 🚀 Features

- Support passkeys for secure user sign-in using Ory Kratos @suttonskate (#6483)
- Upgrade Kratos and Hydra Helm charts to 0.64.0 (app v26.2.0) @suttonskate (#6480)

### 👨🏽‍💻 Contributors

Thank you to our contributors for making this release possible:
@cursoragent, @hortison, @jijillery, @leecalcote, @meshery-ci, @pontusringblom, @suttonskate and @yi-nuo426


