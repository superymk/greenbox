<p align="center">
   <img src="endpoint-security-is-not-replaceable-img1.png" alt="Image1" width="600"/>
   <p align="center"> CyberScape 2023 </p>
</p>

<p align="center">
(<a href="https://momentumcyber.com/docs/Monthly/Cybersecurity_Snapshot_May_2023.pdf">https://momentumcyber.com/docs/Monthly/Cybersecurity_Snapshot_May_2023.pdf</a>)</p>

In the vast cybersecurity landscape, there are numerous areas of focus, each crowded with competing products. This raises a critical question: if current endpoint security solutions lack effectiveness (as discussed in my previous blog, "Where Are We at with Endpoint Security"), should we consider sidelining endpoint security altogether? Imagine relying solely on the best network and infrastructure security, robust cloud security for central servers, advanced mobile security, stringent data security measures, and sophisticated identity and access management systems such as  OAuth. Can these strategies alone thwart cyber attackers?

The short answer is no. <u><em>When an endpoint is compromised, attackers can gain the same level of access as legitimate users.</em></u> They can capture what users see (through screen recording), log keystrokes, modify files, and even steal biometric data. In essence, attackers can impersonate legitimate users, compromising their interactions with remote servers.

**The Shift to Zero-Trust Architecture requires Endpoint Security but Fails to Address It**

Despite this, the cybersecurity industry, perhaps driven by market competition, is <u>heavily</u> investing in the development of Zero-Trust Architecture (ZTA). <u>ZTA</u> works by <u>granting access</u> to networked resources only after verifying <u>the identity</u> <u>and context of an endpoint</u>, including its location, device information, and credentials [1]. However, without effective endpoint security, ZTA's ability to accurately assess the trustworthiness of endpoints is fundamentally flawed. Attackers can impersonate legitimate users and manipulate endpoint context. For instance, if a C-level executive's computer <u>is compromised</u>, <u>the attacker can gain</u> access to as many organizational files as the executive can access.

ZTA's strategy of using agents within operating system kernels is not foolproof, as these kernels are complex and prone to vulnerabilities. Moreover, once attackers compromise the kernels, the agents themselves become insecure. Some newer ZTA products propose an "agentless" approach, such as Remote Browser Isolation (RBI), which does not require software installation on user endpoints. However, this approach assumes that user endpoints are vulnerability-free, an assumption <u>that attackers can easily invalidate</u> through methods such as compromised USB drives or <u>visits to</u> malicious websites.

[1] “Zero Trust Is an Initial Step on the Roadmap to CARTA”, Gartner, 10 December 2018.
