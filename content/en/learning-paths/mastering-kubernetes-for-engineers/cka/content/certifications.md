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

<h2>Several certifications available</h2>
<hr>

<p>The <a href="https://cncf.io">CNCF</a> delivers several Kubernetes certifications, which are listed in the following table.</p>

<table>
<thead>
<tr>
<th>Certification</th>
<th>Type</th>
<th>Badge</th>
</tr>
</thead>
<tbody>
<tr>
<td style="vertical-align: middle;">Kubernetes and Cloud Native Associate (KCNA)</td>
<td style="vertical-align: middle;">MCQ</td>
<td style="vertical-align: middle; text-align: center;">{{< image src="/images/learning-path/cka/certifications/kcna.png" width="90px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle;">Kubernetes and Cloud Native Security Associate (KCSA)</td>
<td style="vertical-align: middle;">MCQ</td>
<td style="vertical-align: middle; text-align: center;">{{< image src="/images/learning-path/cka/certifications/kcsa.png" width="90px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle;">Certified Kubernetes Application Developer (CKAD)</td>
<td style="vertical-align: middle;">Practice</td>
<td style="vertical-align: middle; text-align: center;">{{< image src="/images/learning-path/cka/certifications/ckad.png" width="90px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle;">Certified Kubernetes Administrator (CKA)</td>
<td style="vertical-align: middle;">Practice</td>
<td style="vertical-align: middle; text-align: center;">{{< image src="/images/learning-path/cka/certifications/cka.png" width="90px" align="center" alt="" >}}</td>
</tr>
<tr>
<td style="vertical-align: middle;">Certified Kubernetes Security Specialist (CKS) <em>passing the CKA is a requirement before passing the CKS</em></td>
<td style="vertical-align: middle;">Practice</td>
<td style="vertical-align: middle; text-align: center;">{{< image src="/images/learning-path/cka/certifications/cks.png" width="90px" align="center" alt="" >}}</td>
</tr>
</tbody>
</table>

<p>If you pass all those certifications, you become a <a href="https://www.cncf.io/training/kubestronaut/">Kubestronaut</a>.</p>
<p>If you pass all those certifications, you become a <a href="https://www.cncf.io/training/kubestronaut/">Kubestronaut</a>.</p>

<h2>Expectation for the CKA</h2>
<hr>

<p>The following table summarizes the distribution of the CKA questions across 5 main subjects.</p>

<table>
<thead>
<tr>
<th>Subject</th>
<th>%</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cluster Architecture, Installation & Configuration</td>
<td>25%</td>
</tr>
<tr>
<td>Workloads & Scheduling</td>
<td>15%</td>
</tr>
<tr>
<td>Services & Networking</td>
<td>20%</td>
</tr>
<tr>
<td>Storage</td>
<td>10%</td>
</tr>
<tr>
<td>Troubleshooting</td>
<td>30%</td>
</tr>
</tbody>
</table>

<h2>CKA Environment</h2>
<hr>

<p>The CKA is a 2h exam. It contains 15/20 questions and requires at least 66% correct answers. This exam is remotely proctored, so you can take it from home (or any other quiet location) at a time that best suits your schedule.</p>

<p>Before launching the exam, which you do via your <a href="https://trainingportal.linuxfoundation.org/access/saml/login">Linux Foundation Training Portal</a>, you need to perform a couple of prerequisites including making sure the PSI Browser works correctly on your environment. This browser gives you access to the remote Desktop you'll use during the exam.</p>

{{< image src="/images/learning-path/cka/certifications/psi-browser.png" width="100%" align="center" alt="" >}}

<h2>Tips & tricks</h2>
<hr>

<h3>Tools</h3>

<p>Make sure you have a basic knowledge of</p>

<ul>
<li><strong>vim</strong></li>
<li><strong>openssl</strong></li>
</ul>

```bash
Visualize the content of a certificate
openssl x509 -in cert.crt -noout -text
```

<ul>
<li><strong>systemd / systemctl / journalctl</strong></li>
</ul>

```bash
Restart kubelet
systemctl restart kubelet

Check kubelet logs
journalctl -u kubelet
```

<h3>Aliases</h3>

<p>Defining a couple of aliases at the very beginning of the examination could save time.</p>

```bash
alias k=kubectl
export dr="--dry-run=client -o yaml"
export fd="--grace-period=0 --force"
```

<h3>Imperative commands</h3>

<p>Don't create specifications manually, instead use <code>--dry-run=client -o yaml</code> as in these examples.</p>

```bash
k run nginx --image=nginx:1.20 --dry-run=client -o yaml > pod.yaml
k create deploy www --image=nginx:1.20 --replicas=3 --dry-run=client -o yaml > deploy.yaml
k create role create-pod --verb=create --resource=pods --dry-run=client -o yaml > role.yaml
```

<p>Quickly change the current Namespace.</p>

```bash
k config set-context --current --namespace=dev
```

<p>Don't wait for the grace period to get rid of a Pod.</p>

```bash
k delete po nginx --force --grace-period=0
```

<h3>Reference guide</h3>

<p>The <a href="https://kubernetes.io/docs/reference/kubectl/quick-reference/">Kubectl quick reference guide</a> is a must-read.</p>

<h3>Access to exam simulator</h3>

<p>Registering for the CKA gives you access to two sessions of the official Exam simulator. I highly recommend using these sessions once you're almost ready.</p>

{{< /chapterstyle >}}