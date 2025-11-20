# (New SecApp) Defeat Ransomware Against Remote Files
Ransomware have evolved from simple “encrypt everything on disk” malware into highly targeted campaigns that go after what actually matters: organizations' intellectual properties stored on remote file servers and cloud drives. Attackers are no longer satisfied with locking employees' computers; they want to corrupt production document repositories, codebases, design vaults, and backups on servers, then charge organizations for restoring the files and delete the stolen copies.

Most of today’s defenses mitigate the risk but cannot protect employees' accesses of remote files. These defenses focus on detecting malware (not just ransomware) or sandboxing downloaded applications, but they cannot detect 0-day attacks or protect every remote attack interface. Meanwhile, malware is witnessed to evolve in hours with LLM to bypass defenses. These defenses also still fundamentally trust the huge and complex general-purpose operating systems that service all applications. Once those OSes are compromised—and experience shows that they frequently are—the entire remote-file path is exposed.

GreenBox takes a different approach: instead of trying to make a massive, vulnerable OS “good enough,” it protects the remote files client itself from the OS and all other apps. The result is a remote-file workflow that remains trustworthy even when the OS and all other apps are compromised by ransomware.

In this post, I’ll outline how organizations really work with remote files today, why that workflow is structurally vulnerable, and how GreenBox changes the trust model so ransomware can no longer penetrate into remote storage through employees' computers.

## How Organizations Work With Remote Files
Let me start with the typical scenario of file processing in organizations:
1. Users edit files locally.
Employees open Office documents, CAD files, source code, PDFs, etc., on their laptops or desktops. Those files live—at least temporarily—on the local storage of users' computers.

2. They log in to their organization's remote repository and sync the files
When it’s time to sync files, users log in to some file servers. For example:
   - SMB or NFS file servers on the corporate network
   - Google Drive, Box, SharePoint, OneDrive, or similar SaaS storage
   - Git-based code repositories or artifact stores

3. Users delete local files to minimize the exposure of organizations' files.

Security teams harden this process by installing EDRs, antivirus tools, and firewalls on employees' computers. Furthermore, they constantly track and apply software updates, solve software configuration conflicts (e.g., configure antivirus tools' exclude lists, and temporally downgrade OS or software to allow users to run important tasks). Those are all valuable — but they all rely on the same underlying assumption:

<mark> If the OSes are compromised, all these protections are voided </mark>