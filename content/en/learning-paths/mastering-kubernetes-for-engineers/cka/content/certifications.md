---
docType: "Chapter"
id: "certifications"
chapterTitle: "Certifications"
description: "Get an overview of the existing Kubernetes certifications and what you need to learn for the CKA."
lectures: 10
title: "Certifications"
weight: 1
---

{{< chapterstyle >}}

Get an overview of the existing Kubernetes certifications and what you need to learn for the CKA.

## Several certifications available
---

The [CNCF](https://cncf.io) delivers several Kubernetes certifications, which are listed in the following table.

<div style="display: flex; justify-content: left;">
<table style="width: 80%; table-layout: fixed;">
<thead>
<tr>
<th style="width: 50%; text-align: left;">Certification</th>
<th style="width: 20%; text-align: center;">Type</th>
<th style="width: 30%; text-align: center;">Badge</th>
</tr>
</thead>
<tbody>
<tr>
<td style="vertical-align: middle; padding: 10px;">Kubernetes and Cloud Native Associate (KCNA)</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">MCQ</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">{{< image src="/images/learning-path/cka/certifications/kcna.png" width="120px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle; padding: 10px;">Kubernetes and Cloud Native Security Associate (KCSA)</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">MCQ</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">{{< image src="/images/learning-path/cka/certifications/kcsa.png" width="120px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle; padding: 10px;">Certified Kubernetes Application Developer (CKAD)</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">Practice</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">{{< image src="/images/learning-path/cka/certifications/ckad.png" width="120px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle; padding: 10px;">Certified Kubernetes Administrator (CKA)</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">Practice</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">{{< image src="/images/learning-path/cka/certifications/cka.png" width="120px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle; padding: 10px;">Certified Kubernetes Security Specialist (CKS) <em>passing the CKA is a requirement before passing the CKS</em></td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">Practice</td>
<td style="vertical-align: middle; text-align: center; padding: 10px;">{{< image src="/images/learning-path/cka/certifications/cks.png" width="120px" align="center" alt="" >}}</td>
</tr>
</tbody>
</table>
</div>

If you pass all those certifications, you become a [Kubestronaut](https://www.cncf.io/training/kubestronaut/).

## Expectation for the CKA
---

The following table summarizes the distribution of the CKA questions across 5 main subjects.

| Subject | % |
|---------|---|
| Cluster Architecture, Installation & Configuration | 25% |
| Workloads & Scheduling | 15% |
| Services & Networking | 20% |
| Storage | 10% |
| Troubleshooting | 30% |

## CKA Environment
---

The CKA is a 2h exam. It contains 15/20 questions and requires at least 66% correct answers. This exam is remotely proctored, so you can take it from home (or any other quiet location) at a time that best suits your schedule.

Before launching the exam, which you do via your [Linux Foundation Training Portal](https://trainingportal.linuxfoundation.org/access/saml/login), you need to perform a couple of prerequisites including making sure the PSI Browser works correctly on your environment. This browser gives you access to the remote Desktop you'll use during the exam.

{{< image src="/images/learning-path/cka/certifications/psi-browser.png" width="100%" align="center" alt="" >}}

## Tips & tricks
---

### Tools

Make sure you have a basic knowledge of

- **vim**
- **openssl**

```bash
# Visualize the content of a certificate
openssl x509 -in cert.crt -noout -text
```

- **systemd / systemctl / journalctl**

```bash
# Restart kubelet
systemctl restart kubelet

# Check kubelet logs
journalctl -u kubelet
```

### Aliases

Defining a couple of aliases at the very beginning of the examination could save time.

```bash
alias k=kubectl
export dr="--dry-run=client -o yaml"
export fd="--grace-period=0 --force"
```

### Imperative commands

Don't create specifications manually, instead use `--dry-run=client -o yaml` as in these examples.

```bash
k run nginx --image=nginx:1.20 --dry-run=client -o yaml > pod.yaml
k create deploy www --image=nginx:1.20 --replicas=3 --dry-run=client -o yaml > deploy.yaml
k create role create-pod --verb=create --resource=pods --dry-run=client -o yaml > role.yaml
```

Quickly change the current Namespace.

```bash
k config set-context --current --namespace=dev
```

Don't wait for the grace period to get rid of a Pod.

```bash
k delete po nginx --force --grace-period=0
```

### Reference guide

The [Kubectl quick reference guide](https://kubernetes.io/docs/reference/kubectl/quick-reference/) is a must-read.

### Access to exam simulator

Registering for the CKA gives you access to two sessions of the official Exam simulator. I highly recommend using these sessions once you're almost ready.

{{< /chapterstyle >}}