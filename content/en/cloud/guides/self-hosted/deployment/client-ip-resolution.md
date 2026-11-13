---
title: "Client IP Address Resolution"
categories: [self-hosted]
description: "Configure how Layer5 Cloud determines the address of each caller when it runs behind a reverse proxy, a load balancer, or a CDN such as Cloudflare."
weight: 3
---

{{< alert title="Release availability" type="info" >}}
These settings apply to Layer5 Cloud releases that include system-wide client IP resolution. Earlier releases do not read the `CLIENT_IP_*` settings.
{{< /alert >}}

Layer5 Cloud determines a single client address for every request it serves. That one address is used everywhere a caller is identified by address:

- rate limits that key on the caller's network (for example anonymous Meshery Server handshakes and OAuth dynamic client registration),
- the access log,
- the IP block list,
- the per-address budgets for diagnostics and support submissions,
- the client address Cloud forwards to its identity services (Ory Hydra and Kratos).

The setting is system-wide. It applies to every route, not to one feature, and it is independent of whether you use a CDN at all.

## How the address is chosen

Every client-address header (`X-Real-IP`, `X-Forwarded-For`, `CF-Connecting-IP`, and so on) can be written by anyone until a hop you control overwrites it. Cloud therefore believes a header only from the hop that writes it:

1. **The TCP peer.** If the connection does not come from a trusted proxy, the peer's address is the client address and no header is read.
2. **`X-Real-IP`**, read only when the TCP peer is one of your trusted reverse proxies (`CLIENT_IP_TRUSTED_PROXY_CIDRS`). Your proxy must overwrite `X-Real-IP` with the address that connected to it. That address is called the *edge*.
3. **The CDN's client header**, read only when a CDN is configured (`CLIENT_IP_CDN_PROVIDER`) **and** the edge is inside that CDN's published IP ranges. For Cloudflare the header is `CF-Connecting-IP`.

A trusted proxy that sends no single valid address, or a CDN edge that names no single valid client, is keyed as itself. IPv6 callers are keyed on their /64 network for rate limiting, because one host is routinely assigned a whole /64.

## Settings

All settings are environment variables (or the matching keys under `env` in the Helm chart's values). Every setting is read once at startup.

| Environment variable | Helm value (`env.`) | Default | Description |
|---|---|---|---|
| `CLIENT_IP_TRUSTED_PROXY_CIDRS` | `clientIpTrustedProxyCidrs` | empty | Comma- or space-separated CIDR prefixes of the reverse proxies that connect to Cloud and overwrite `X-Real-IP`. A bare address is treated as a single host (`/32` or `/128`). Empty means `X-Real-IP` is never believed. |
| `CLIENT_IP_CDN_PROVIDER` | `clientIpCdnProvider` | `none` | The CDN in front of your reverse proxy: `none` or `cloudflare`. With `none`, no CDN header is ever believed. |
| `CLIENT_IP_CDN_RANGES_URL` | `clientIpCdnRangesUrl` | the provider's API (`https://api.cloudflare.com/client/v4/ips` for Cloudflare) | Where the CDN's IP ranges are downloaded from. Must be an absolute `https` URL without user information (credentials in the URL are refused). |
| `CLIENT_IP_CDN_RANGES_REFRESH` | `clientIpCdnRangesRefresh` | `24h` | How often the ranges are downloaded again. Minimum `1m`. |
| `CLIENT_IP_CDN_CIDRS` | `clientIpCdnCidrs` | empty | **Override only.** A static list of the CDN's ranges, for tests and installations without outbound internet access. When set, it is used as-is and nothing is downloaded. Leave it empty to use the CDN's live list. |

With nothing configured, Cloud uses the TCP peer's address for every request. That is the correct setting when nothing sits in front of Cloud, such as a local development stack.

## Example: behind Cloudflare and an ingress controller

Traffic flows Cloudflare -> your ingress controller (for example ingress-nginx) -> Cloud.

```yaml
env:
  # The dedicated address range that only the ingress controller pods use
  # (see "Give the ingress controller its own address range" below).
  clientIpTrustedProxyCidrs: "<ingress controller pod range, for example 10.0.30.0/27>"
  clientIpCdnProvider: "cloudflare"
  # Leave these empty to use Cloudflare's IP API and a 24h refresh.
  clientIpCdnRangesUrl: ""
  clientIpCdnRangesRefresh: ""
  clientIpCdnCidrs: ""
```

Cloud downloads Cloudflare's ranges at startup and refreshes them every 24 hours, so ranges Cloudflare adds or retires are picked up without any change on your side. Each Cloud pod needs outbound HTTPS access to `api.cloudflare.com`.

Your ingress controller must overwrite `X-Real-IP` with the address of the connection it received. ingress-nginx does this by default. If a TCP load balancer sits between Cloudflare and the ingress controller, it must pass the original connection address through (for example with PROXY protocol enabled on both the load balancer and the ingress controller); otherwise the ingress controller reports the load balancer's address, every request is keyed on that one address, and Cloudflare's header is not believed because the load balancer is not a Cloudflare edge.

## Give the ingress controller its own address range

Do not trust a single ingress controller pod address. A pod's address changes whenever the pod is rescheduled, and the old address can be handed to another pod, which would then be trusted to name any client address. Do not trust the cluster's shared pod or node subnet either: on clusters with VPC-native pod networking, every pod in that subnet could connect to Cloud directly and claim any address.

Instead, give the ingress controller pods an address range that nothing else uses, and trust that range:

1. **Create a small, dedicated pod subnet** (for example a /27) inside your cluster network, with the same routing and security rules as your existing pod subnet.
2. **Add a node pool that draws pod addresses only from that subnet.** Keep its nodes in your existing worker subnet so load balancer paths do not change. Label and taint the nodes, for example `layer5.io/role=ingress` with effect `NoSchedule`.
3. **Schedule only the ingress controller there.** Give the controller a matching `nodeSelector` and toleration. Check every DaemonSet that tolerates all taints: one that does not use host networking would also receive an address from the range, so exclude it from those nodes with a node affinity.
4. **Set `clientIpTrustedProxyCidrs` to that subnet's CIDR.** Rescheduled controller pods stay inside the range, so the setting never needs updating.
5. **Restrict who can reach Cloud with a NetworkPolicy.** Allow Cloud's ports only from the ingress controller pods and from Cloud's own namespace (its identity services call it), and deny everything else. This requires a network policy engine in your cluster (for example Calico in policy-only mode); without one, NetworkPolicy objects are accepted but not enforced.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: cloud-ingress-only
  namespace: <cloud namespace>
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: <cloud pod label>
  policyTypes: [Ingress]
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress-nginx
          podSelector:
            matchLabels:
              app.kubernetes.io/component: controller
        - podSelector: {}
```

The dedicated range alone is what makes the forwarded address trustworthy; the NetworkPolicy is defense in depth that stops any other workload from reaching Cloud's ports at all.

## Example: behind a plain load balancer or another reverse proxy

Traffic flows from your load balancer or reverse proxy (nginx, HAProxy, Envoy, a cloud load balancer that terminates HTTP) directly to Cloud, with no CDN.

```yaml
env:
  # The reverse proxy addresses that connect to Cloud.
  clientIpTrustedProxyCidrs: "<reverse proxy address or subnet>"
  clientIpCdnProvider: "none"
```

Configure the proxy to **set** (overwrite, not append to) `X-Real-IP` with the address of the connection it received. In nginx that is `proxy_set_header X-Real-IP $remote_addr;`.

If your load balancer only forwards TCP (it does not terminate HTTP), it never sets a header. Leave `clientIpTrustedProxyCidrs` empty so Cloud keys on the TCP peer, and enable PROXY protocol or the load balancer's client-address preservation if you need per-client addresses.

## Air-gapped installations

If Cloud cannot reach the CDN's API, set the CDN's ranges yourself:

```yaml
env:
  clientIpCdnProvider: "cloudflare"
  clientIpCdnCidrs: "<Cloudflare's IPv4 and IPv6 ranges, comma- or space-separated>"
```

With an override, nothing is downloaded and the list never changes on its own, so update it when the CDN publishes new ranges.

## Security notes

- **Only trusted proxies' headers are believed.** Any caller that can reach Cloud, or your ingress, can send any header it likes. A header is meaningful only when the hop that wrote it is one you operate (your reverse proxy) or one you can verify by address (a CDN edge inside the CDN's published ranges). Everything else is ignored, so a caller cannot choose its own rate-limit bucket, dodge the IP block list, or forge the address in your logs.
- **Trust only a range your proxies own.** Never trust a subnet that other workloads share (for example every pod in a Kubernetes cluster with VPC-native networking): any of them could connect to Cloud directly and claim any address. Never trust a single pod address either, because it is reused after the pod is rescheduled. Use a dedicated range that only your proxies receive addresses from, as described above.
- **`X-Forwarded-For` is never believed.** Proxies commonly append to it rather than overwrite it, so its left-most entries are whatever the original caller sent. There is no reliable way to tell which entry a trusted hop added, so Cloud does not read it. `True-Client-IP` and `Forwarded` are never read either.
- **Invalid settings fail safe.** A CIDR list with any entry that does not parse, that covers every address (`/0`), or that is an IPv4-mapped IPv6 prefix is refused as a whole and logged, never applied in part: a typo can only make addresses coarser, never widen trust. An unknown CDN provider is logged and treated as `none`. An invalid ranges URL or refresh interval is logged and the default is used.
- **The CDN's ranges are validated before they are used.** A downloaded document is used only if it reports success, lists at least one range, and every entry is a valid prefix of the right address family. Any bad entry rejects the whole document. Downloads time out, are size-limited, and do not follow redirects.
- **Download failures fail safe.** If a refresh fails, Cloud keeps using the last list that downloaded successfully. If no list has ever downloaded (for example the CDN's API is unreachable when a pod starts), the CDN's header is not believed at all and requests are keyed on the edge address your proxy reports. Startup never waits for or fails because of the download; Cloud retries at least every 5 minutes until a list loads and logs every failure.
- **What the logs say.** Configuration problems are logged under error code `meshery_cloud-3727`, an unreachable ranges URL under `meshery_cloud-3728`, and a refused ranges document under `meshery_cloud-3729`. Each failure message states which list Cloud is using in the meantime.
