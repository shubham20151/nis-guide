// All "Difference Between" tables from data.md
export const differences = [
  {
    id: "active-passive",
    title: "Active vs Passive Attack",
    emoji: "⚔️",
    unit: "Unit I",
    headers: ["Parameter", "Active Attack", "Passive Attack"],
    rows: [
      ["Nature", "Modifies or disrupts system/data", "Only observes and reads data silently"],
      ["Goal", "Disrupt, modify, destroy, fabricate", "Steal information without detection"],
      ["Detectability", "Easier to detect", "Very hard to detect"],
      ["Examples", "DoS, MITM, Replay, Masquerade", "Sniffing, Traffic analysis"],
      ["Prevention", "Authentication + Encryption", "Encryption only"],
      ["Threat to", "Integrity + Availability", "Confidentiality only"],
    ]
  },
  {
    id: "virus-worm-trojan",
    title: "Virus vs Worm vs Trojan",
    emoji: "🦠",
    unit: "Unit I",
    headers: ["Feature", "Virus", "Worm", "Trojan"],
    rows: [
      ["Needs host program", "✅ Yes", "❌ No", "✅ Yes"],
      ["Self-replicates", "✅ Yes (with host)", "✅ Yes (independently)", "❌ No"],
      ["Spreads via", "Infected files/programs", "Network, email autonomously", "Disguised as legit software"],
      ["User action needed", "✅ Yes (run infected file)", "❌ No (automatic)", "✅ Yes (run disguised program)"],
      ["Does damage", "Corrupts files, data", "Clogs network bandwidth", "Opens backdoor, steals data"],
      ["Example", "ILOVEYOU", "Morris Worm", "Remote Access Trojan"],
    ]
  },
  {
    id: "logic-time-bomb",
    title: "Logic Bomb vs Time Bomb",
    emoji: "💣",
    unit: "Unit I",
    headers: ["Feature", "Logic Bomb", "Time Bomb"],
    rows: [
      ["Trigger", "Specific condition/event", "Specific date/time"],
      ["Example", "Fires when programmer removed from payroll", "Software expires after beta period ends"],
      ["Detection", "Very hard (installed by authorized user)", "Easier if system clocks are monitored"],
      ["Activation", "Condition-based (e.g., file deleted)", "Calendar/clock-based"],
    ]
  },
  {
    id: "dac-mac-rbac-abac",
    title: "DAC vs MAC vs RBAC vs ABAC",
    emoji: "🔐",
    unit: "Unit II",
    headers: ["Parameter", "DAC", "MAC", "RBAC", "ABAC"],
    rows: [
      ["Control By", "Resource owner", "System/OS (admin)", "Administrator", "Policy rules engine"],
      ["Flexibility", "High", "Very Low", "Medium", "Very High"],
      ["Security Level", "Low", "Very High", "High", "High"],
      ["Based On", "User identity", "Security labels", "Job roles", "Multiple attributes"],
      ["User Can Change?", "✅ Yes", "❌ No", "❌ No", "❌ No"],
      ["Complexity", "Simple", "Complex", "Medium", "Very Complex"],
      ["Used In", "Linux, Windows (chmod)", "Military, Government", "Hospitals, Corporations", "Cloud systems"],
      ["Example", "chmod 755", "Top Secret label", "Doctor/Nurse role", "Time+location rule"],
    ]
  },
  {
    id: "sym-asym",
    title: "Symmetric vs Asymmetric Cryptography",
    emoji: "🔑",
    unit: "Unit III",
    headers: ["Feature", "Symmetric", "Asymmetric"],
    rows: [
      ["Keys Used", "Same key for encrypt & decrypt", "Public key encrypts; Private key decrypts"],
      ["Speed", "✅ Very Fast", "❌ Slow"],
      ["Key Distribution", "Difficult (secret key must be shared)", "Easy (public key shared openly)"],
      ["Security", "Less secure if key is compromised", "More secure"],
      ["Key Management", "Simple (one key)", "Complex (key pair management)"],
      ["Used For", "Bulk data encryption", "Key exchange, digital signatures"],
      ["Examples", "DES, AES, 3DES", "RSA, Diffie-Hellman, ECC"],
      ["Best For", "Long messages (speed)", "Short messages (signatures, key exchange)"],
    ]
  },
  {
    id: "stego-crypto",
    title: "Steganography vs Cryptography",
    emoji: "🕵️",
    unit: "Unit III",
    headers: ["Feature", "Cryptography", "Steganography"],
    rows: [
      ["What it hides", "The CONTENT (makes unreadable)", "The EXISTENCE (hides that message exists)"],
      ["If detected", "Attacker knows secret message exists (can't read)", "Attacker doesn't even know a message exists"],
      ["Goal", "Confidentiality", "Concealment"],
      ["Output appearance", "Visible gibberish ciphertext", "Normal-looking carrier file (image/audio)"],
      ["Detection difficulty", "Obvious — ciphertext is visible", "Very hard — carrier file looks normal"],
      ["Best approach", "Combine both: Encrypt THEN hide", "Combine both: Hide THEN encrypt"],
    ]
  },
  {
    id: "hw-sw-firewall",
    title: "Hardware vs Software Firewall",
    emoji: "🛡️",
    unit: "Unit IV",
    headers: ["Feature", "Hardware Firewall", "Software Firewall"],
    rows: [
      ["Installation", "Separate dedicated physical device", "Program installed on computer"],
      ["Cost", "❌ Expensive", "✅ Cheap or free"],
      ["Performance", "✅ High — dedicated processing", "Lower — shares system resources"],
      ["Protection Scope", "Entire network behind it", "Only the one device it's installed on"],
      ["Management", "Centralized", "Per-device"],
      ["Example", "Cisco ASA, pfSense appliance", "Windows Defender Firewall, iptables"],
    ]
  },
  {
    id: "des-aes-rsa",
    title: "DES vs AES vs RSA",
    emoji: "🔢",
    unit: "Unit IV",
    headers: ["Feature", "DES", "AES", "RSA"],
    rows: [
      ["Type", "Symmetric", "Symmetric", "Asymmetric"],
      ["Key Size", "56 bits ❌ Weak", "128/192/256 bits ✅", "1024/2048/4096 bits ✅"],
      ["Block Size", "64 bits", "128 bits", "Variable"],
      ["Rounds", "16", "10/12/14", "N/A"],
      ["Speed", "Moderate", "✅ Fast", "❌ Slow"],
      ["Security", "❌ Weak (cracked 1999)", "✅ Very Strong", "✅ Very Strong"],
      ["Status", "Deprecated", "Current standard", "Still widely used"],
      ["Used For", "Legacy systems only", "Data encryption standard", "Key exchange, digital signatures"],
    ]
  },
  {
    id: "md5-sha",
    title: "MD5 vs SHA-1 vs SHA-256",
    emoji: "#️⃣",
    unit: "Unit IV",
    headers: ["Feature", "MD5", "SHA-1", "SHA-256"],
    rows: [
      ["Output Size", "128 bits (32 hex chars)", "160 bits (40 hex chars)", "256 bits (64 hex chars)"],
      ["Security", "❌ Weak (collisions found)", "❌ Weak (deprecated 2017)", "✅ Strong (current standard)"],
      ["Speed", "Fastest", "Moderate", "Slower"],
      ["Collision resistance", "❌ Broken", "❌ Broken", "✅ Strong"],
      ["Used For", "File integrity (legacy only)", "Legacy digital signatures", "Current security apps, TLS"],
    ]
  },
  {
    id: "nids-hids",
    title: "NIDS vs HIDS",
    emoji: "👁️",
    unit: "Unit V",
    headers: ["Feature", "NIDS", "HIDS"],
    rows: [
      ["Monitors", "All network traffic (all packets)", "Activity on one specific host"],
      ["Placement", "Network choke points / gateway", "Installed on every individual machine"],
      ["Scope", "Entire network segment", "Only that one device"],
      ["Encrypted Traffic", "❌ Cannot analyze inside encrypted packets", "✅ Can analyze after decryption on host"],
      ["Performance Impact", "None on individual hosts", "Uses host CPU and RAM"],
      ["Cost", "Lower (few sensors for many systems)", "Higher (agent on every system)"],
      ["OS-level info", "❌ No OS-level detail", "✅ Very detailed OS-level info"],
      ["Weakness", "Cannot see inside SSL/TLS", "If host compromised, logs may be altered"],
      ["Tools/Examples", "Snort, Suricata", "OSSEC, Tripwire, AIDE"],
    ]
  },
  {
    id: "ah-esp",
    title: "AH vs ESP (IPSec Protocols)",
    emoji: "🔒",
    unit: "Unit V",
    headers: ["Feature", "AH (Authentication Header)", "ESP (Encapsulating Security Payload)"],
    rows: [
      ["Encryption", "❌ No — data is plaintext", "✅ Yes — full payload encrypted"],
      ["Authentication", "✅ Yes", "✅ Yes"],
      ["Integrity", "✅ Yes", "✅ Yes"],
      ["Anti-replay", "✅ Yes (sequence numbers)", "✅ Yes (sequence numbers)"],
      ["Confidentiality", "❌ No", "✅ Yes"],
      ["IP Header Protected", "✅ Yes (whole packet)", "Tunnel mode only"],
      ["Protocol Number", "51", "50"],
      ["Use case", "Integrity without encryption", "Full security (auth + encryption)"],
    ]
  },
  {
    id: "transport-tunnel",
    title: "Transport Mode vs Tunnel Mode (IPSec)",
    emoji: "🚇",
    unit: "Unit V",
    headers: ["Feature", "Transport Mode", "Tunnel Mode"],
    rows: [
      ["What is protected", "Only the payload (data)", "Entire original IP packet"],
      ["Original IP Header", "Visible (plaintext)", "Hidden (encrypted inside)"],
      ["New IP Header added", "❌ No", "✅ Yes (outer gateway IPs)"],
      ["Used for", "End-to-end between two hosts", "VPN gateways (branch-to-branch)"],
      ["Hides IP addresses", "❌ No", "✅ Yes (original IPs hidden)"],
      ["Performance", "Faster (less overhead)", "Slightly slower (extra header)"],
    ]
  },
  {
    id: "pgp-pem",
    title: "PGP vs PEM",
    emoji: "📧",
    unit: "Unit V",
    headers: ["Feature", "PGP", "PEM"],
    rows: [
      ["Hash Algorithm", "SHA-1", "MD2 or MD5"],
      ["Compression", "✅ Yes (Lempel-Ziv algorithm)", "❌ No"],
      ["Number of steps", "5 steps", "4 steps"],
      ["Trust model", "Web of Trust (peer-to-peer)", "Certificate Authority (hierarchical/central)"],
      ["Symmetric algo", "IDEA / AES", "DES in CBC mode"],
      ["Key distribution", "Manual key exchange", "CA-based certificate"],
      ["Popularity", "Very popular (public/personal use)", "Less common today"],
    ]
  },
  {
    id: "insider-intruder",
    title: "Insider vs Intruder",
    emoji: "🕵️",
    unit: "Unit V",
    headers: ["Feature", "Intruder (External)", "Insider (Internal)"],
    rows: [
      ["Authorization", "Unauthorized — must break in", "Authorized — already has legitimate access"],
      ["System Knowledge", "Low — must learn the system", "High — knows system thoroughly"],
      ["Dangerousness", "Less dangerous", "⚠️ MORE dangerous"],
      ["Detection", "Easier — triggers security alarms", "Harder — behavior appears legitimate"],
      ["Protection", "Firewalls, IDS help block", "Very few specific mechanisms exist"],
      ["Motivation", "Financial gain, curiosity, malice", "Revenge, financial gain, data theft"],
    ]
  },
  {
    id: "hacker-cracker",
    title: "Hacker vs Cracker",
    emoji: "💻",
    unit: "Unit I",
    headers: ["Feature", "Hacker", "Cracker"],
    rows: [
      ["Intent", "Can be ethical OR unethical", "Always malicious"],
      ["Types", "White hat (ethical), Black hat, Grey hat", "Malicious crackers only"],
      ["Legality", "White hat = legal; Black hat = illegal", "Always illegal"],
      ["Goal", "Find vulnerabilities, improve security (ethical)", "Damage, steal, destroy systems"],
      ["Knowledge level", "High technical expertise", "High technical expertise"],
      ["Community view", "Often respected (ethical hackers)", "Condemned"],
    ]
  },
  {
    id: "sniffing-spoofing",
    title: "Sniffing vs Spoofing",
    emoji: "📡",
    unit: "Unit I",
    headers: ["Feature", "Sniffing", "Spoofing"],
    rows: [
      ["Attack Type", "Passive attack", "Active attack"],
      ["Action", "Silently observes/captures network traffic", "Fakes identity or source address"],
      ["Goal", "Steal credentials, read private data", "Impersonate trusted source to deceive"],
      ["Detection", "Very hard (completely passive)", "Easier with proper monitoring"],
      ["Prevention", "Encrypt all traffic (HTTPS, VPN)", "Authentication + digital signatures"],
      ["Example", "Wireshark capturing plain HTTP", "IP spoofing, Email spoofing, DNS spoofing"],
    ]
  },
  {
    id: "ssl-set",
    title: "SSL vs SET",
    emoji: "💳",
    unit: "Unit V",
    headers: ["Feature", "SSL", "SET (Secure Electronic Transaction)"],
    rows: [
      ["Purpose", "Secure channel between browser and server", "Secure transaction between cardholder, merchant, bank"],
      ["Merchant sees card?", "✅ Yes — merchant sees full card number", "❌ No — merchant NEVER sees card number"],
      ["Complexity", "Simple — just install SSL certificate", "Complex — all parties need digital certificates"],
      ["Adoption", "Universal (all HTTPS sites)", "Limited due to complexity"],
      ["Developed by", "Netscape (now standard TLS)", "VISA + Mastercard (1996)"],
      ["What it secures", "The communication pipe", "The entire transaction with dual signatures"],
    ]
  },
];
