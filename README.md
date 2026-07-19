# 🛡️ BugBounty HQ

> **Unified Bug Bounty & Penetration Testing Toolkit** — 100+ security tools, 7 attack workflows, payload library, and built-in utilities. All in one offline-ready HTML dashboard.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🛠️ **100+ Security Tools** | Categorized, searchable tool database |
| ⚡ **7 Attack Workflows** | Pre-built recon → exploit chains |
| 💣 **Payload Library** | XSS, SQLi, SSTI, SSRF, LFI, Command Injection |
| 🔧 **8 Built-in Utilities** | Base64, URL encode, Hash, Reverse Shell, JWT, CIDR |
| 🔍 **Global Search** | Search tools by name, tag, or description (Ctrl+K) |
| ⚡ **Command Center** | Instantly generate tool commands with your target |
| ✨ **Particle Animation** | Animated background with connecting nodes |
| 📱 **Responsive** | Works on desktop and mobile |
| 🔒 **100% Offline** | No server, no dependencies, no internet needed |

---

## 📁 Project Structure

```
bugbounty/
├── index.html          ← Main entry point (open this)
├── README.md           ← This file
├── css/
│   └── styles.css      ← Dark cyberpunk UI theme
└── js/
    ├── tools-data.js   ← All tools, workflows & payloads database
    └── app.js          ← Application logic & rendering
```

---

## 🚀 How to Use

### Option 1 — Direct Open (Easiest)

```
Double-click → index.html
```

Opens directly in your browser. No installation needed.

### Option 2 — Local Server (For development)

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# Then open: http://localhost:8080
```

---

## 🗂️ Tool Categories

| # | Category | Tools | Description |
|---|---|---|---|
| 1 | 🔭 **Reconnaissance** | 20 | Subdomain enum, DNS, crawling, OSINT |
| 2 | 🌐 **Web Application** | 17 | Scanners, fuzzers, injection testers |
| 3 | 💥 **Exploitation** | 10 | Frameworks, shells, C2, lateral movement |
| 4 | 🎯 **Fuzzing** | 5 | Binary, network, and web fuzzers |
| 5 | 🌐 **Network** | 9 | Packet analysis, MITM, sniffing |
| 6 | ☁️ **Cloud Security** | 8 | AWS, Azure, GCP auditing tools |
| 7 | 📱 **Mobile** | 7 | Android/iOS reverse engineering & testing |
| 8 | 👁️ **OSINT** | 8 | Social media, email, metadata intelligence |
| 9 | 🔑 **Password Attacks** | 6 | Crackers, brute-forcers, wordlist generators |
| 10 | ⚙️ **Post-Exploit/Misc** | 8 | Tunneling, pivoting, privesc scripts |

---

## ⚡ Attack Workflows

Pre-built step-by-step attack chains — run with one click:

```
1. 🔭 Full Recon Pipeline        — Subfinder → DNSx → HTTPx → Katana → Nuclei
2. 🌐 Subdomain Takeover Hunt    — Amass → Assetfinder → DNSx → Nuclei
3. 🔥 XSS Discovery Chain        — GAU → URO → Dalfox → XSStrike
4. 💉 SQLi Automation            — GAU → URO → SQLMap → Nuclei
5. 🔌 API Security Testing       — Katana → Arjun → Nuclei → FFuF
6. ⬆️  Linux Privilege Escalation — LinPEAS → Pspy → GTFOBins
7. ☁️  AWS Security Audit         — Prowler → ScoutSuite → TruffleHog → Pacu
```

Each workflow lets you enter a target and generates ready-to-run commands.

---

## 💣 Payload Library

Click any payload to instantly copy to clipboard:

| Category | Count | Examples |
|---|---|---|
| XSS Basic | 8 | `<script>alert(1)</script>`, `<img src=x onerror=alert(1)>` |
| XSS WAF Bypass | 8 | `<ScRiPt>`, unicode escapes, encoding tricks |
| SQL Injection | 8 | `' OR 1=1--`, UNION-based, Time-based blind |
| LFI / Path Traversal | 8 | `../../etc/passwd`, PHP filters, URL encoding |
| SSTI Payloads | 8 | `{{7*7}}`, `${7*7}`, Python class chain RCE |
| SSRF Payloads | 8 | AWS metadata, GCP metadata, gopher, dict |
| Command Injection | 8 | `; id`, `| id`, backtick, `$()` variants |

---

## 🔧 Built-in Utilities

All utilities work 100% offline in your browser:

| Utility | What it does |
|---|---|
| 🔐 **Base64 Encode/Decode** | Encode or decode Base64 strings |
| 🔗 **URL Encode/Decode** | Percent-encode or decode URL strings |
| 🔒 **Hash Generator** | SHA-256, SHA-1, SHA-512 hashes |
| 🖥️ **Reverse Shell Generator** | Bash, Python, PHP, PowerShell, Netcat |
| 🌐 **CIDR Calculator** | Network, broadcast, first/last IP, total hosts |
| 🔑 **JWT Decoder** | Decode and inspect JWT tokens client-side |
| 📝 **HTML Entity Encoder** | Encode special chars to HTML entities |
| 🎲 **Random String Generator** | Hex, alphanumeric, symbols in any length |

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (glassmorphism, dark theme) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter, JetBrains Mono |
| Animation | Canvas API (particle system) |
| Hashing | Web Crypto API (native browser) |

> **Zero dependencies.** No npm, no Node.js, no build step required.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Focus global search bar |
| `Esc` | Close any open modal or sidebar |

---

## 🛠️ How to Add a New Tool

Edit `js/tools-data.js` and add an entry to the `TOOLS` array:

```javascript
{
  id:      'mytool',                     // unique ID (no spaces)
  name:    'My Tool',                    // display name
  cat:     'recon',                      // category key
  lang:    'Go',                         // programming language
  tags:    ['recon', 'subdomain'],       // searchable tags
  desc:    'Description of the tool.',   // short description
  install: 'go install github.com/...',  // install command
  cmd:     'mytool -d {domain}',         // example command
  url:     'https://github.com/...',     // homepage URL
  github:  'https://github.com/...',     // (optional) GitHub link
}
```

**Available categories:**
`recon` · `web` · `exploit` · `fuzzing` · `network` · `cloud` · `mobile` · `osint` · `passwords` · `misc`

---

## 📝 How to Add New Payloads

Edit the `PAYLOADS` object in `js/tools-data.js`:

```javascript
const PAYLOADS = {
  'My Payload Category': [
    'payload one',
    'payload two',
  ],
  // existing categories below...
};
```

---

## 🔒 Legal Disclaimer

> **For educational and authorized testing purposes ONLY.**
> Use these tools only on systems you own or have explicit written permission to test.
> The author is not responsible for any misuse or damage caused by this toolkit.
> Always follow responsible disclosure practices when reporting vulnerabilities.

---

## 📄 License

This project is open source — [MIT License](LICENSE).

---

## 🙏 Credits

- [Awesome Bug Bounty Tools](https://github.com/vavkamil/awesome-bugbounty-tools) — tool list inspiration
- [ProjectDiscovery](https://github.com/projectdiscovery) — httpx, nuclei, subfinder, katana, dnsx
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) — payload references
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [GTFOBins](https://gtfobins.github.io) · [LOLBAS](https://lolbas-project.github.io)

---

<div align="center">
Made with ❤️ for the Bug Bounty Community
</div>
