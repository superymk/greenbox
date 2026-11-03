*Published: December 7, 2023*

*Original article: [Superymk's Thoughts on Cybersecurity](https://superymk.wordpress.com/2023/12/07/recent-incident-okta-breach-oct-2023/)*

**Incident:**

“Attackers stole the name and email address for nearly all of its customer support users.” [1]

**Impact:**

“The incident has knocked more than $2 billion from the company’s market cap and caused its stock to drop more than 11%” [2]

**Cause:**

“In a previous disclosure on Nov. 3, Okta blamed the intrusion on an employee who saved the credentials for a service account in Okta’s customer support infrastructure to their personal Google account, and said it was likely those credentials were stolen when the employee’s personal device using the same Google account was compromised.” [1]

“Unlike standard user accounts, which are accessed by humans, service accounts are mostly reserved for automating machine-to-machine functions, such as performing data backups or antivirus scans every night at a particular time. For this reason, they can’t be locked down with multifactor authentication the way user accounts can.” [1]

**Lessons:**

1. **Inadequacy of Current Endpoint Security Products.** Modern endpoint security solutions often fall short in adequately protecting employee devices. The incident in question highlights this vulnerability, where the reliance on these ineffective security products directly contributed to the security breach.

2. **Human Error in IT Security.** Even the most knowledgeable IT staff are prone to errors, particularly under the pressure of tight deadlines and the urgency of applying updates or fixing bugs on production servers. Enterprises must recognize that human error is an inevitable aspect of cybersecurity. Assuming that employees, regardless of their expertise, are infallible is a dangerous oversight.

Enterprises must adopt a more realistic approach, acknowledging that mistakes can and do happen, and therefore, must have robust protocols in place to mitigate these risks.

**Review of some comments:**

1. “Okta should have put access controls in place besides a simple password to limit who or what could log in to the service account,” [1]

   “One way of doing this is to put a limit or conditions on the IP addresses that can connect. Another is to regularly rotate access tokens used to authenticate to service accounts. And, of course, it should have been impossible for employees to be logged in to personal accounts on a work machine. These and other precautions are the responsibility of senior people inside Okta.” [1]

**My points:**

Today’s enterprises have to apply these mitigations due to the lack of security products with assured protection. However, enterprises must understand that these mitigations are not foolproof. Attackers can still find ways to compromise work devices using alternate methods. Once inside the network, they can execute lateral movements to steal short-term passwords or circumvent IP restrictions on targeted computers.

Implementing these security mitigations comes at a cost to productivity. Employees are required to invest time in learning new configurations and correctly reconfiguring systems and endpoints. This added burden not only affects day-to-day operations but also adds to the overall cost for enterprises, making it a less than ideal solution.

What enterprises truly need are endpoint security products that can guarantee the security of sensitive applications and data. Assured protection in security products can address the issues and disadvantages currently faced, including repeated incidents and productivity losses. Endpoint security industry should consider these real issues and evolve towards offering products with assured protection.

[1] KrebsOnSecurity. “Okta: Breach Affected All Customer Support Users”, [https://krebsonsecurity.com/2023/11/okta-breach-affected-all-customer-support-users/](https://krebsonsecurity.com/2023/11/okta-breach-affected-all-customer-support-users/)

[2] FastCompany. “Okta hacked: Here’s the latest on the cybersecurity breach, impact on 1Password, and more”, [https://www.fastcompany.com/90972374/okta-breach-2023-1password-impacted-companies-news](https://www.fastcompany.com/90972374/okta-breach-2023-1password-impacted-companies-news#:~:text=Last%20week%2C%20identity%20and%20access,know%20about%20the%20cybersecurity%20breach).
