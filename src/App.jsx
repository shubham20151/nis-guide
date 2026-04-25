import { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";
import { differences } from "./differences.js";

const units = [
  {
    id: 1, title: "Unit I", subtitle: "Intro to Computer & Information Security",
    emoji: "🛡️", color: "#c0392b", light: "#fff5f5",
    topics: [
      {
        title: "1.1 — CIA Triad & Security Basics",
        content: [
          {
            type: "heading", text: "What is Computer Security?"
          },
          {
            type: "para", text: "Computer Security means protecting systems, data, and networks from unauthorized access, damage, theft, or disruption. It is built on 7 core principles. The most important 3 are called the CIA Triad."
          },
          {
            type: "diagram", id: "cia",
            svg: `<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="240" y="20" width="200" height="70" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="340" y="50" textAnchor="middle" fontSize="15" fontWeight="500" fill="#0C447C">C — Confidentiality</text>
  <text x="340" y="72" textAnchor="middle" fontSize="12" fill="#185FA5">Only authorized users see data</text>
  <rect x="60" y="220" width="200" height="70" rx="8" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="160" y="250" textAnchor="middle" fontSize="15" fontWeight="500" fill="#27500A">I — Integrity</text>
  <text x="160" y="272" textAnchor="middle" fontSize="12" fill="#3B6D11">Data not modified in transit</text>
  <rect x="420" y="220" width="200" height="70" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
  <text x="520" y="250" textAnchor="middle" fontSize="15" fontWeight="500" fill="#633806">A — Availability</text>
  <text x="520" y="272" textAnchor="middle" fontSize="12" fill="#854F0B">System always accessible</text>
  <line x1="290" y1="90" x2="190" y2="220" stroke="#888" strokeWidth="1.5" strokeDasharray="5,3"/>
  <line x1="390" y1="90" x2="490" y2="220" stroke="#888" strokeWidth="1.5" strokeDasharray="5,3"/>
  <line x1="260" y1="255" x2="420" y2="255" stroke="#888" strokeWidth="1.5" strokeDasharray="5,3"/>
  <rect x="270" y="155" width="140" height="40" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="340" y="172" textAnchor="middle" fontSize="13" fontWeight="500" fill="#3C3489">CIA TRIAD</text>
  <text x="340" y="188" textAnchor="middle" fontSize="11" fill="#534AB7">Foundation of Security</text>
</svg>`
          },
          {
            type: "section", title: "1. Confidentiality",
            text: `DEFINITION: Only the sender and intended recipient should be able to read the message.\n\nReal Example: You send a WhatsApp message to your friend. Only your friend should read it — not anyone else on the internet.\n\nWhat breaks it? → INTERCEPTION ATTACK`,
          },
          {
            type: "diagram", id: "conf",
            svg: `<svg viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="50" width="80" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="60" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill="#0C447C">User A</text>
  <rect x="590" y="50" width="80" height="40" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="630" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill="#0C447C">User B</text>
  <line x1="100" y1="70" x2="590" y2="70" stroke="#185FA5" strokeWidth="2" markerEnd="url(#arr)"/>
  <text x="340" y="60" textAnchor="middle" fontSize="12" fill="#185FA5">"Secret Message"</text>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#185FA5"/></marker></defs>
  <rect x="290" y="85" width="100" height="40" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="340" y="105" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">User C</text>
  <text x="340" y="120" textAnchor="middle" fontSize="10" fill="#A32D2D">(Attacker intercepts!)</text>
  <line x1="340" y1="72" x2="340" y2="85" stroke="#c0392b" strokeWidth="1.5" strokeDasharray="4,2"/>
  <text x="340" y="15" textAnchor="middle" fontSize="13" fontWeight="500" fill="#c0392b">Loss of Confidentiality → Interception Attack</text>
</svg>`
          },
          {
            type: "section", title: "2. Integrity",
            text: `DEFINITION: Data should not be modified or altered by unauthorized persons during transmission.\n\nReal Example: You send ₹500 via bank transfer. The amount should arrive as exactly ₹500 — not ₹50 or ₹5000.\n\nWhat breaks it? → MODIFICATION ATTACK`,
          },
          {
            type: "diagram", id: "integ",
            svg: `<svg viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="50" width="80" height="40" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="60" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">User A</text>
  <rect x="590" y="50" width="80" height="40" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="630" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">User B</text>
  <line x1="100" y1="60" x2="300" y2="60" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="195" y="50" textAnchor="middle" fontSize="11" fill="#3B6D11">Original: ₹500</text>
  <line x1="380" y1="80" x2="590" y2="80" stroke="#c0392b" strokeWidth="1.5"/>
  <text x="480" y="98" textAnchor="middle" fontSize="11" fill="#c0392b">Modified: ₹50 !</text>
  <rect x="295" y="55" width="90" height="45" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="340" y="75" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">User C</text>
  <text x="340" y="90" textAnchor="middle" fontSize="10" fill="#A32D2D">Changes amount!</text>
  <text x="340" y="15" textAnchor="middle" fontSize="13" fontWeight="500" fill="#c0392b">Loss of Integrity → Modification Attack</text>
</svg>`
          },
          {
            type: "section", title: "3. Availability",
            text: `DEFINITION: Authorized users must be able to access the system and data whenever they need it.\n\nReal Example: Your bank's website should work 24/7. If hackers crash it, no one can access their account.\n\nWhat breaks it? → DENIAL OF SERVICE (DoS) ATTACK`,
          },
          {
            type: "section", title: "4. Authentication",
            text: `DEFINITION: Proving that you are who you claim to be.\n\nReal Example: Entering your PIN at an ATM proves you are the account holder.\n\nWhat breaks it? → MASQUERADE/FABRICATION ATTACK (someone pretends to be you)`,
          },
          {
            type: "section", title: "5. Non-Repudiation",
            text: `DEFINITION: A sender cannot later deny having sent a message.\n\nReal Example: When you sign a digital document, you cannot later say "I never signed this." The digital signature is proof.`,
          },
          {
            type: "section", title: "6. Accountability",
            text: `DEFINITION: Every action in a system must be traceable to who performed it.\n\nReal Example: Server logs record: "User riya@gmail.com logged in at 10:32 AM and accessed file XYZ."`
          },
          {
            type: "section", title: "7. Reliability",
            text: `DEFINITION: The system must work correctly and consistently every time.\n\nReal Example: A payment system must process ₹500 as ₹500 — not sometimes ₹5000 by mistake.`
          },
          {
            type: "section", title: "Types of Security Controls",
            text: `Security controls are safeguards to reduce risk. Classified in 2 ways:\n\nBY PURPOSE:\n1. PREVENTIVE: Stop attack before it happens.\n   Examples: Firewall, passwords, locks, encryption, access control lists\n2. DETECTIVE: Detect attack during or after it happens.\n   Examples: IDS, CCTV, audit logs, antivirus scanning\n3. CORRECTIVE: Fix damage after an attack.\n   Examples: Backups, incident response plan, patch management, data recovery\n4. DETERRENT: Discourage attackers.\n   Examples: Warning banners ("Unauthorized access is illegal"), visible CCTV cameras\n\nBY TYPE:\n1. PHYSICAL CONTROLS: Tangible, real-world barriers.\n   Examples: Locks, security guards, biometric entry doors, CCTV, mantrap (airlock-style one-person entry)\n2. TECHNICAL CONTROLS: Hardware/software-based protection.\n   Examples: Firewalls, encryption, IDS/IPS, antivirus, MFA, access control lists\n3. ADMINISTRATIVE CONTROLS: Policies, procedures, training.\n   Examples: Security awareness training, background checks, job rotation, separation of duties\n\nDEFENCE IN DEPTH:\nUsing MULTIPLE LAYERS of security controls so if one layer fails, others still protect.\nExample: Firewall (Technical) + Security Guard (Physical) + Employee Training (Administrative)\nNo single point of failure!`
          },
          {
            type: "section", title: "Security Policy & Security Models",
            text: `SECURITY POLICY: A formal document defining an organization's security approach and rules.\n\nTypes of Security Policies:\n1. ACCEPTABLE USE POLICY (AUP): What employees can/cannot do with company resources.\n   Example: "Personal email is not allowed on company computers."\n2. PASSWORD POLICY: Rules for creating and managing passwords.\n   Example: "Passwords must be 12+ chars, changed every 90 days, no reuse for 12 cycles."\n3. DATA CLASSIFICATION POLICY: How to handle different sensitivity levels of data.\n4. INCIDENT RESPONSE POLICY: Steps to take when a security breach occurs.\n5. BYOD POLICY: Rules for personal devices (Bring Your Own Device) on company network.\n\nSECURITY MODELS:\n1. BELL-LAPADULA MODEL: Focuses on CONFIDENTIALITY.\n   "No read up, no write down" — users can't read data above their clearance level.\n   Used in: Military and government systems.\n\n2. BIBA MODEL: Focuses on INTEGRITY.\n   "No write up, no read down" — prevents low-integrity data from corrupting high-integrity data.\n\n3. CLARK-WILSON MODEL: Focuses on INTEGRITY in commercial systems.\n   Uses well-formed transactions + separation of duties.\n   Real example: Accounting systems where one person records, another approves.\n\nSECURITY TRIAD vs PARKERIAN HEXAD:\nCIA Triad (3 elements): Confidentiality, Integrity, Availability\nParkerian Hexad (6 elements): CIA + Possession, Authenticity, Utility (more comprehensive!)`
          },
          {
            type: "examtip", text: "Draw CIA triangle and explain each with an example. 'Interception = Confidentiality broken', 'Modification = Integrity broken', 'DoS = Availability broken' — memorize these pairs! Types of security controls (Preventive/Detective/Corrective + Physical/Technical/Administrative) is a 6-mark question. Bell-LaPadula 'No read up, no write down' rule is asked!"
          }
        ]
      },
      {
        title: "1.2 — Information Classification",
        content: [
          { type: "heading", text: "Information Classification" },
          { type: "para", text: "Not all data is equally sensitive. Organizations classify information into levels so appropriate protection can be applied. Think of it like a building with different floor access levels." },
          {
            type: "diagram", id: "classify",
            svg: `<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <polygon points="340,20 60,240 620,240" fill="none" stroke="#888" strokeWidth="1"/>
  <rect x="270" y="30" width="140" height="40" rx="4" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="340" y="48" textAnchor="middle" fontSize="13" fontWeight="500" fill="#791F1F">TOP SECRET</text>
  <text x="340" y="63" textAnchor="middle" fontSize="11" fill="#A32D2D">Nuclear codes, military plans</text>
  <rect x="215" y="80" width="250" height="40" rx="4" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
  <text x="340" y="98" textAnchor="middle" fontSize="13" fontWeight="500" fill="#633806">SECRET</text>
  <text x="340" y="113" textAnchor="middle" fontSize="11" fill="#854F0B">Intelligence reports, defence info</text>
  <rect x="155" y="130" width="370" height="40" rx="4" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="340" y="148" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">CONFIDENTIAL</text>
  <text x="340" y="163" textAnchor="middle" fontSize="11" fill="#3B6D11">Company salary data, financial plans</text>
  <rect x="90" y="180" width="500" height="40" rx="4" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="340" y="198" textAnchor="middle" fontSize="13" fontWeight="500" fill="#0C447C">UNCLASSIFIED / PUBLIC</text>
  <text x="340" y="213" textAnchor="middle" fontSize="11" fill="#185FA5">Press releases, company website info</text>
  <text x="340" y="250" textAnchor="middle" fontSize="12" fill="#5F5E5A">↑ More Sensitive — Access Restricted</text>
</svg>`
          },
          {
            type: "section", title: "Criteria for Information Classification",
            text: `1. VALUE — How valuable/sensitive is this information to the organization?\n2. AGE — Old information may not need protection anymore.\n3. USEFUL LIFE — When does this information expire/become outdated?\n4. PERSONAL ASSOCIATION — Does it contain personal data of individuals (name, health, finances)?`
          },
          { type: "examtip", text: "4 classification levels + 4 criteria = common 4-mark question. Remember: Top Secret → Secret → Confidential → Unclassified (most to least sensitive)." }
        ]
      },
      {
        title: "1.3 — Types of Attacks",
        content: [
          { type: "heading", text: "Types of Attacks" },
          {
            type: "section", title: "Passive vs Active Attacks",
            text: `PASSIVE ATTACKS — "Watch but don't touch"\n• Attacker only observes/reads the data — does NOT modify it.\n• Very hard to detect because nothing changes!\n• Example 1 — Eavesdropping: Secretly listening to a conversation.\n• Example 2 — Traffic Analysis: Even encrypted data can reveal WHO is talking to WHOM and HOW OFTEN.\n\nACTIVE ATTACKS — "Attack and cause damage"\n• Attacker actively modifies, destroys, or creates fake data.\n• Detectable but damage is already done.\n• Examples: DoS, MITM, Replay, Masquerade.`
          },
          {
            type: "diagram", id: "attacks",
            svg: `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="20" width="300" height="160" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="170" y="45" textAnchor="middle" fontSize="14" fontWeight="500" fill="#0C447C">PASSIVE Attacks</text>
  <text x="170" y="65" textAnchor="middle" fontSize="12" fill="#185FA5">Only OBSERVE — don't modify</text>
  <rect x="35" y="75" width="270" height="30" rx="4" fill="#B5D4F4" stroke="#185FA5" strokeWidth="0.5"/>
  <text x="170" y="95" textAnchor="middle" fontSize="12" fill="#042C53">Eavesdropping</text>
  <rect x="35" y="115" width="270" height="30" rx="4" fill="#B5D4F4" stroke="#185FA5" strokeWidth="0.5"/>
  <text x="170" y="135" textAnchor="middle" fontSize="12" fill="#042C53">Traffic Analysis</text>
  <text x="170" y="170" textAnchor="middle" fontSize="11" fill="#185FA5">Hard to DETECT</text>
  <rect x="360" y="20" width="300" height="160" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1"/>
  <text x="510" y="45" textAnchor="middle" fontSize="14" fontWeight="500" fill="#791F1F">ACTIVE Attacks</text>
  <text x="510" y="65" textAnchor="middle" fontSize="12" fill="#A32D2D">MODIFY / DESTROY / FAKE data</text>
  <rect x="375" y="75" width="270" height="30" rx="4" fill="#F7C1C1" stroke="#A32D2D" strokeWidth="0.5"/>
  <text x="510" y="95" textAnchor="middle" fontSize="12" fill="#501313">DoS, MITM, Replay, Masquerade</text>
  <rect x="375" y="115" width="270" height="30" rx="4" fill="#F7C1C1" stroke="#A32D2D" strokeWidth="0.5"/>
  <text x="510" y="135" textAnchor="middle" fontSize="12" fill="#501313">Spoofing, Phishing, Sniffing</text>
  <text x="510" y="170" textAnchor="middle" fontSize="11" fill="#A32D2D">Detectable but damaging</text>
</svg>`
          },
          {
            type: "section", title: "1. Denial of Service (DoS) — SYN Flood",
            text: `PURPOSE: Make a service unavailable to real users by flooding it with fake requests.\n\nSYN FLOOD ATTACK STEPS:\nStep 1: Attacker sends thousands of fake SYN (connection start) requests to the server.\nStep 2: Server replies with SYN-ACK and WAITS for the final ACK.\nStep 3: Attacker NEVER sends the final ACK (since requests are fake).\nStep 4: Server holds all these half-open connections.\nStep 5: Server's connection table FILLS UP — it can't accept real users!\nStep 6: Real users get "Connection refused" — Service denied!\n\nReal Example: Like 1000 people calling a restaurant to book tables but never arriving. The restaurant is "full" for real customers.`
          },
          {
            type: "diagram", id: "syn",
            svg: `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="60" width="100" height="50" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="70" y="82" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">Attacker</text>
  <text x="70" y="98" textAnchor="middle" fontSize="10" fill="#A32D2D">(Fake IPs)</text>
  <rect x="560" y="60" width="100" height="50" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="610" y="82" textAnchor="middle" fontSize="12" fontWeight="500" fill="#0C447C">Server</text>
  <text x="610" y="98" textAnchor="middle" fontSize="10" fill="#185FA5">(Victim)</text>
  <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c0392b"/></marker>
  <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="180"><path d="M0,0 L0,6 L8,3 z" fill="#185FA5"/></marker></defs>
  <line x1="120" y1="75" x2="558" y2="75" stroke="#c0392b" strokeWidth="1.5" markerEnd="url(#a2)"/>
  <text x="340" y="68" textAnchor="middle" fontSize="11" fill="#c0392b">SYN (fake request) → × 1000</text>
  <line x1="558" y1="95" x2="120" y2="95" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#a3)"/>
  <text x="340" y="112" textAnchor="middle" fontSize="11" fill="#185FA5">← SYN-ACK (server waits for ACK that never comes)</text>
  <rect x="200" y="130" width="280" height="40" rx="6" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1"/>
  <text x="340" y="148" textAnchor="middle" fontSize="12" fontWeight="500" fill="#633806">Server queue FULL — Real users BLOCKED</text>
  <text x="340" y="163" textAnchor="middle" fontSize="11" fill="#854F0B">This is Denial of Service!</text>
  <text x="340" y="195" textAnchor="middle" fontSize="11" fill="#5F5E5A">DDoS = Distributed DoS (multiple attackers at once)</text>
</svg>`
          },
          {
            type: "section", title: "2. Man-in-the-Middle (MITM) Attack",
            text: `The attacker secretly positions themselves BETWEEN two communicating parties.\n• Attacker can READ all messages (breaks Confidentiality)\n• Attacker can MODIFY messages (breaks Integrity)\n• Neither Alice nor Bob knows the attacker is there!\n\nReal Example: You think you're logged into your bank, but an attacker on the same WiFi is reading everything between you and the bank.`
          },
          {
            type: "diagram", id: "mitm",
            svg: `<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="55" width="90" height="40" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="65" y="80" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">Host A</text>
  <rect x="570" y="55" width="90" height="40" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="615" y="80" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">Host B</text>
  <rect x="290" y="20" width="100" height="40" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="340" y="38" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">Attacker</text>
  <text x="340" y="53" textAnchor="middle" fontSize="10" fill="#A32D2D">(reads+modifies)</text>
  <line x1="110" y1="75" x2="290" y2="38" stroke="#c0392b" strokeWidth="1.5" strokeDasharray="5,3"/>
  <line x1="390" y1="38" x2="570" y2="75" stroke="#c0392b" strokeWidth="1.5" strokeDasharray="5,3"/>
  <line x1="110" y1="85" x2="570" y2="85" stroke="#3B6D11" strokeWidth="1" strokeDasharray="3,3"/>
  <text x="340" y="110" textAnchor="middle" fontSize="11" fill="#3B6D11">A thinks ↑ direct path to B (but actually goes through attacker)</text>
  <text x="340" y="140" textAnchor="middle" fontSize="12" fontWeight="500" fill="#c0392b">Prevention: Digital Certificates + Encryption (HTTPS)</text>
</svg>`
          },
          {
            type: "section", title: "3. Replay Attack",
            text: `The attacker CAPTURES a valid message and RE-SENDS it later.\n\nStep-by-Step Example:\n1. User A sends "Transfer ₹5000 to User C" to Bank B.\n2. User C (attacker) INTERCEPTS and COPIES this message.\n3. Transfer happens normally — User C gets ₹5000.\n4. 1 hour later, User C RE-SENDS the SAME captured message.\n5. Bank B processes it again — User C gets another ₹5000!\n6. Bank has NO way to know it's a replay!\n\nPrevention: Use timestamps + session tokens in messages.`
          },
          {
            type: "section", title: "4. Masquerade Attack",
            text: `Attacker PRETENDS to be a trusted entity.\n\nExample: User C sends a message to Bank B pretending to be User A.\nUser C says: "I am User A. Transfer ₹10,000 to my account."\n\nReal World: Phishing emails from "your bank" — actually from attacker.\nPrevention: Multi-factor authentication.`
          },
          {
            type: "section", title: "5. Backdoor & Trapdoor Attacks",
            text: `BACKDOOR: A secret hidden entry point into a program that allows access without normal security.\n• Used LEGITIMATELY by developers for debugging/maintenance.\n• Becomes dangerous when discovered by attackers.\n• Example: Developer leaves a hidden admin login "admin/debug123" in software.\n\nTRAP DOOR: Similar to backdoor — a hidden entrance that circumvents normal security.\n• Can be deliberately installed by malware.\n• Makes security systems ineffective.`
          },
          {
            type: "section", title: "6. Sniffing",
            text: `A sniffer is a software or hardware tool that CAPTURES network packets as they travel.\n\nHow it works: On a shared network, all traffic can be "heard" by all devices. A sniffer listens to ALL traffic, not just traffic meant for it.\n\nWhat can be stolen: Usernames, passwords, emails, credit card numbers.\n\nReal Example: Sitting on public WiFi (coffee shop) → attacker runs Wireshark → captures your login to websites without HTTPS.\n\nPrevention: Use HTTPS, VPNs, encrypted protocols.`
          },
          {
            type: "section", title: "7. Spoofing",
            text: `Making data APPEAR to come from a trusted/different source.\n\nTypes:\n• IP Spoofing: Send packets with a FAKE source IP address.\n• Email Spoofing: Send email that appears to come from boss@company.com but is actually from attacker.\n• URL Spoofing: Create fake website (www.amaz0n.com) that looks like the real one.\n\nReal Example: You receive email "From: hdfc-bank@hdfcbank.com" — but attacker spoofed the address.`
          },
          {
            type: "section", title: "8. Phishing",
            text: `Tricking users into revealing credentials by creating FAKE but realistic-looking websites or emails.\n\nExample: You get an email: "Your Gmail account will be suspended. Click here to verify."\nThe link takes you to: www.gmai1-login.com (fake!) that looks exactly like Gmail.\nYou enter your email+password → attacker captures them!\n\nTypes:\n• Spear Phishing: Targeted at specific person (uses your name, company).\n• Whaling: Targeted at senior executives.`
          },
          {
            type: "section", title: "9. Social Engineering",
            text: `Manipulating PEOPLE (not computers) to reveal confidential information.\n\n"The weakest link in security is the human!"\n\nExample 1: Attacker calls employee: "Hi, I'm from IT support. We detected a virus on your account. Please give me your password to fix it immediately."\n\nExample 2: Attacker visits office posing as a delivery person → learns layout, sees passwords on sticky notes.\n\nPrevention: Security awareness training. NEVER give password to anyone — even "IT support."`,
          },
          { type: "examtip", text: "Active vs Passive comparison is always asked. SYN Flood with diagram description is important. MITM and Replay attack with diagrams are frequently asked." }
        ]
      },
      {
        title: "1.4 — Types of Malware",
        content: [
          { type: "heading", text: "Types of Malware" },
          { type: "para", text: "MALWARE = MALicious softWARE. Software specifically designed to disrupt, damage, or gain unauthorized access to computer systems." },
          {
            type: "section", title: "1. Virus",
            text: `A virus is a program that ATTACHES itself to another legitimate program and REPLICATES when that program is executed.\n\nKey Feature: Needs a HOST FILE to survive and spread (just like a biological virus).\n\n4 PHASES OF VIRUS LIFECYCLE:\nPhase 1 — DORMANT: Virus is idle, waiting for a trigger.\nPhase 2 — PROPAGATION: Virus copies itself into other programs/disk areas.\nPhase 3 — TRIGGERING: An event activates the virus (date, specific action).\nPhase 4 — EXECUTION: Virus performs its harmful action (delete files, crash system).\n\nReal Example: You download an infected .exe game → virus attaches to your Word program → next time you send Word file to friend → friend gets infected!`
          },
          {
            type: "section", title: "2. Worm",
            text: `A worm is SELF-REPLICATING malware that spreads WITHOUT needing a host file.\n\nKey Difference from Virus: Worm is STANDALONE — doesn't need to attach to any file.\nWorms spread through NETWORKS automatically.\n\nReal Example: ILOVEYOU Worm (2000) — spread via email, sent itself to everyone in your contacts, caused $10 billion damage worldwide!\n\nAnother Example: WannaCry Worm (2017) — spread through network shares without any user action.`
          },
          {
            type: "section", title: "3. Trojan Horse",
            text: `A program that APPEARS to be useful/harmless but secretly performs malicious actions.\n\nKey Feature: Does NOT self-replicate. User is tricked into running it voluntarily.\n\nNamed after: The Trojan Horse of ancient Greek mythology — soldiers hidden inside a gift horse!\n\nReal Example: You download "Free Antivirus 2024.exe" — it looks like antivirus software, but secretly:\n• Sends your files to attacker\n• Creates backdoor for attacker\n• Steals your bank credentials`
          },
          {
            type: "section", title: "4. Spyware",
            text: `Secretly MONITORS user activity and sends collected information to attacker without user's knowledge.\n\nWhat it spies on:\n• Websites you visit\n• Passwords you type\n• Files you access\n• Emails you send\n\nReal Example: Attacker installs spyware on your computer → you don't know → months later attacker has your banking passwords and personal files.`
          },
          {
            type: "section", title: "5. Adware",
            text: `Automatically displays UNWANTED ADVERTISEMENTS.\n• Usually bundled with "free" software.\n• Less dangerous but very annoying.\n• Can slow down system significantly.\n\nReal Example: You install a "free PDF converter" → now your browser shows pop-up ads on every website you visit.`
          },
          {
            type: "section", title: "6. Ransomware",
            text: `ENCRYPTS all your files and demands payment (ransom) to decrypt them.\n\nAttack Flow:\n1. Ransomware infects your computer (via email attachment/download).\n2. It encrypts ALL your documents, photos, videos.\n3. Shows message: "Your files are encrypted! Pay $500 in Bitcoin within 48 hours or files are deleted forever!"\n\nFamous Example: WannaCry (2017) — attacked hospitals, banks, and companies in 150+ countries. NHS (UK Health System) was crippled!`
          },
          {
            type: "section", title: "7. Logic Bomb",
            text: `Hidden malicious code that ACTIVATES when specific CONDITIONS are met.\n\nConditions can be:\n• A specific date (time bomb variant)\n• A specific event ("if employee ID is deleted from HR database")\n• A specific user action\n\nReal Example: Disgruntled employee writes code: "If my employee ID is removed from payroll → delete all company files." When fired, the logic bomb activates!`
          },
          {
            type: "section", title: "8. Rootkit",
            text: `Hides DEEP in the OS, giving attacker hidden control and making itself invisible to security tools.\n\nKey Feature: Extremely difficult to detect and remove.\n\nWhat rootkits do:\n• Hide attacker's processes from Task Manager\n• Modify system calls to hide attacker's files\n• Give attacker persistent remote control\n\nReal Example: Attacker compromises your computer → installs rootkit → you can't see the attacker's processes or files — even antivirus can't detect it!`
          },
          {
            type: "section", title: "9. Keylogger",
            text: `Records EVERY KEYSTROKE you type and sends it to attacker.\n\nWhat gets captured:\n• Every password you type\n• Every message you write\n• Credit card numbers\n• Bank account details\n\nReal Example: Attacker sends keylogger as email attachment → you open it → next day you notice unauthorized bank transactions — attacker captured your net banking credentials!`
          },
          {
            type: "diagram", id: "malware",
            svg: `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <text x="340" y="20" textAnchor="middle" fontSize="13" fontWeight="500" fill="#791F1F">Virus vs Worm vs Trojan — Key Differences</text>
  <rect x="10" y="30" width="200" height="155" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1"/>
  <text x="110" y="55" textAnchor="middle" fontSize="13" fontWeight="500" fill="#791F1F">VIRUS</text>
  <text x="110" y="75" textAnchor="middle" fontSize="11" fill="#A32D2D">Needs host file</text>
  <text x="110" y="92" textAnchor="middle" fontSize="11" fill="#A32D2D">Self-replicates</text>
  <text x="110" y="109" textAnchor="middle" fontSize="11" fill="#A32D2D">User must run host</text>
  <text x="110" y="126" textAnchor="middle" fontSize="11" fill="#A32D2D">Spreads via files</text>
  <text x="110" y="145" textAnchor="middle" fontSize="10" fill="#A32D2D">Example: ILOVEYOU</text>
  <text x="110" y="162" textAnchor="middle" fontSize="10" fill="#A32D2D">(as email attachment)</text>
  <rect x="240" y="30" width="200" height="155" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1"/>
  <text x="340" y="55" textAnchor="middle" fontSize="13" fontWeight="500" fill="#633806">WORM</text>
  <text x="340" y="75" textAnchor="middle" fontSize="11" fill="#854F0B">No host needed</text>
  <text x="340" y="92" textAnchor="middle" fontSize="11" fill="#854F0B">Self-replicates</text>
  <text x="340" y="109" textAnchor="middle" fontSize="11" fill="#854F0B">Spreads automatically</text>
  <text x="340" y="126" textAnchor="middle" fontSize="11" fill="#854F0B">Spreads via network</text>
  <text x="340" y="145" textAnchor="middle" fontSize="10" fill="#854F0B">Example: WannaCry</text>
  <text x="340" y="162" textAnchor="middle" fontSize="10" fill="#854F0B">(network-based spread)</text>
  <rect x="470" y="30" width="200" height="155" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="570" y="55" textAnchor="middle" fontSize="13" fontWeight="500" fill="#3C3489">TROJAN</text>
  <text x="570" y="75" textAnchor="middle" fontSize="11" fill="#534AB7">Disguised as useful app</text>
  <text x="570" y="92" textAnchor="middle" fontSize="11" fill="#534AB7">Does NOT replicate</text>
  <text x="570" y="109" textAnchor="middle" fontSize="11" fill="#534AB7">User runs it willingly</text>
  <text x="570" y="126" textAnchor="middle" fontSize="11" fill="#534AB7">Spreads via deception</text>
  <text x="570" y="145" textAnchor="middle" fontSize="10" fill="#534AB7">Example: Fake</text>
  <text x="570" y="162" textAnchor="middle" fontSize="10" fill="#534AB7">antivirus software</text>
</svg>`
          },
          {
            type: "section", title: "Malware Prevention Techniques",
            text: `TECHNICAL DEFENSES:\n1. ANTIVIRUS SOFTWARE:\n• Signature-based detection: Compares files against database of known malware signatures\n• Heuristic detection: Analyzes behavior patterns for suspicious activity\n• Real-time protection: Scans every file as it's opened/downloaded\n• Regular updates: Signature database updated daily/hourly\n• Examples: Windows Defender, Kaspersky, Norton, Malwarebytes\n\n2. FIREWALL:\n• Blocks unauthorized network connections\n• Prevents worms from spreading across network\n• Blocks malware's phone-home (C2) connections\n\n3. EMAIL FILTERING:\n• Scans all email attachments for malware\n• Filters phishing links before reaching user\n• Most malware enters via email!\n\n4. SANDBOXING:\n• Run suspicious files in isolated virtual environment\n• Observe behavior without risking real system\n• If malicious → delete; if safe → allow\n• Used by: Modern antivirus, email gateways, browsers\n\n5. APPLICATION WHITELISTING:\n• Only pre-approved programs can run\n• Unknown programs (including malware) blocked automatically\n\n6. SOFTWARE UPDATES & PATCHES:\n• Most malware exploits KNOWN vulnerabilities in unpatched software\n• Keep OS, browsers, and applications updated\n\nUSER EDUCATION (Critical!):\n• Never open email attachments from unknown senders\n• Never download software from unofficial sources\n• Verify website URLs before entering credentials\n• Don't plug in unknown USB drives (USB drop attacks!)\n• Report suspicious activity immediately`
          },
          { type: "examtip", text: "Know all 9 malware types with their key distinguishing feature. Virus 4 phases (Dormant→Propagation→Triggering→Execution) is frequently asked. Virus vs Worm vs Trojan comparison table is a common 6-mark question. Malware prevention — antivirus + sandboxing + email filtering + user awareness are all important." }
        ]
      },
      {
        title: "1.5 & 1.6 — OS Updates & Threats/Risks",
        content: [
          { type: "heading", text: "OS Updates & Threat-Vulnerability-Risk" },
          {
            type: "section", title: "OS Updates — HotFix, Patch, Service Pack",
            text: `Why updates matter: Every software has bugs and security vulnerabilities. Attackers find these weaknesses and exploit them. Updates FIX these vulnerabilities before attackers can use them.\n\nHOTFIX:\n• Emergency fix for a single CRITICAL security issue.\n• Released IMMEDIATELY when a dangerous vulnerability is discovered.\n• Small, targeted, urgent.\n• Example: Microsoft releases emergency hotfix overnight after finding a critical Windows RDP vulnerability.\n\nPATCH:\n• Formal fix for one or more bugs (not necessarily critical).\n• Released on a schedule (e.g., Microsoft's "Patch Tuesday" = every 2nd Tuesday of the month).\n• Larger than hotfix, may fix multiple issues.\n• Example: Monthly Windows update that fixes 15 different bugs.\n\nSERVICE PACK:\n• Large COLLECTION of all patches and hotfixes released since the last service pack.\n• Think of it as a "bundle update."\n• Example: Windows XP Service Pack 3 — contained hundreds of fixes accumulated over years.\n\nOrder of urgency: HotFix (most urgent) > Patch > Service Pack (least urgent, most comprehensive)`
          },
          {
            type: "section", title: "Assets, Vulnerabilities, Threats & Risk",
            text: `ASSET: Anything of value to an organization that needs protection.\nExamples: Customer database, employee records, servers, source code, financial data.\n\nVULNERABILITY: A weakness in a system that could be exploited.\nExamples:\n• Unpatched software (old Windows version)\n• Weak password policy (passwords like "1234")\n• Unlocked server room door\n• No encryption on data\n• Untrained staff who fall for phishing\n\nTHREAT: Any potential danger that could exploit a vulnerability to cause harm.\nExamples:\n• External hackers\n• Viruses and malware\n• Disgruntled employees\n• Natural disasters (flood, fire)\n• Human error\n\nRISK: The probability that a threat will exploit a vulnerability and cause harm.\nFormula: RISK = Threat × Vulnerability\n\nRELATIONSHIP EXAMPLE:\nAsset: Company customer database\nVulnerability: Password is "admin123" with no MFA\nThreat: Hackers using brute force attacks\nRisk: VERY HIGH — easy for attacker to gain access!\n\nFix the Vulnerability → REDUCE the Risk!`
          },
          {
            type: "diagram", id: "tvr",
            svg: `<svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="20" y="40" width="130" height="100" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
  <text x="85" y="85" textAnchor="middle" fontSize="13" fontWeight="500" fill="#633806">THREAT</text>
  <text x="85" y="105" textAnchor="middle" fontSize="11" fill="#854F0B">Hackers, viruses,</text>
  <text x="85" y="120" textAnchor="middle" fontSize="11" fill="#854F0B">disasters</text>
  <rect x="275" y="40" width="130" height="100" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="340" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill="#791F1F">VULNERABILITY</text>
  <text x="340" y="95" textAnchor="middle" fontSize="11" fill="#A32D2D">Weakness: weak</text>
  <text x="340" y="110" textAnchor="middle" fontSize="11" fill="#A32D2D">password, old software</text>
  <rect x="530" y="40" width="130" height="100" rx="8" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="595" y="85" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">RISK</text>
  <text x="595" y="105" textAnchor="middle" fontSize="11" fill="#3B6D11">Probability of</text>
  <text x="595" y="120" textAnchor="middle" fontSize="11" fill="#3B6D11">harm occurring</text>
  <defs><marker id="ra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#888"/></marker></defs>
  <line x1="150" y1="90" x2="273" y2="90" stroke="#888" strokeWidth="1.5" markerEnd="url(#ra)"/>
  <text x="210" y="82" textAnchor="middle" fontSize="11" fill="#5F5E5A">exploits</text>
  <line x1="405" y1="90" x2="528" y2="90" stroke="#888" strokeWidth="1.5" markerEnd="url(#ra)"/>
  <text x="465" y="82" textAnchor="middle" fontSize="11" fill="#5F5E5A">creates</text>
  <text x="340" y="165" textAnchor="middle" fontSize="12" fontWeight="500" fill="#534AB7">Risk = Threat × Vulnerability | Protect ASSETS by reducing vulnerabilities!</text>
</svg>`
          },
          { type: "examtip", text: "HotFix vs Patch vs ServicePack differences + the Threat→Vulnerability→Risk diagram are both common exam questions. Know the formula: Risk = Threat × Vulnerability." }
        ]
      }
    ]
  },
  {
    id: 2, title: "Unit II", subtitle: "User Authentication & Access Control",
    emoji: "🔑", color: "#7d3c98", light: "#fdf5ff",
    topics: [
      {
        title: "2.1 & 2.2 — Authentication & Password Attacks",
        content: [
          { type: "heading", text: "Authentication & Password Security" },
          {
            type: "section", title: "What is Authentication?",
            text: `Authentication = Proving you are who you claim to be.\n\nThree Factors of Authentication (3F Model):\n\nFACTOR 1 — SOMETHING YOU KNOW (Knowledge)\n• Password, PIN, Security question, Passphrase\n• Pros: Easy to implement, free\n• Cons: Can be forgotten, guessed, or stolen\n• Example: Gmail password, ATM PIN\n\nFACTOR 2 — SOMETHING YOU HAVE (Possession)\n• Smart card, OTP token, Phone (SMS OTP), USB security key\n• Pros: Physical item — harder to steal remotely\n• Cons: Can be lost, stolen physically\n• Example: Bank token, Google Authenticator app\n\nFACTOR 3 — SOMETHING YOU ARE (Inherence = Biometrics)\n• Fingerprint, retina scan, face recognition, voice\n• Pros: Unique to you, can't be forgotten or given away\n• Cons: Can't change if compromised (unlike password), expensive\n• Example: iPhone Face ID, laptop fingerprint reader\n\nMULTI-FACTOR AUTHENTICATION (MFA):\nUsing 2 or more factors TOGETHER.\n• ATM = Card (HAVE) + PIN (KNOW) = 2FA\n• Gmail = Password (KNOW) + OTP to phone (HAVE) = 2FA\n• Bank = Fingerprint (ARE) + Password (KNOW) = 2FA\n\nWhy MFA is stronger: Even if attacker steals your password, they STILL need your phone/fingerprint!`
          },
          {
            type: "section", title: "Token-Based Authentication",
            text: `A hardware/software TOKEN generates a One-Time Password (OTP) that changes every 30-60 seconds.\n\nHow it works:\n1. You enter username + password (KNOW)\n2. Then enter the 6-digit code from your token app (HAVE)\n3. The code expires in 30 seconds — useless to attacker even if they see it!\n\nTypes:\n• Hardware Token: Physical device (RSA SecurID)\n• Software Token: App on phone (Google Authenticator, Authy)\n• SMS Token: Code sent to your registered mobile number\n\nReal Example: Netbanking — after entering password, bank sends "OTP: 483921" to your phone. This OTP expires in 5 minutes.`
          },
          {
            type: "section", title: "Password Attacks — Guessing",
            text: `DICTIONARY ATTACK:\nTries words from a list of common passwords and dictionary words.\nList contains: "password", "123456", "admin", "qwerty", "hello", and thousands more.\n\nBRUTE FORCE ATTACK:\nTries EVERY possible combination — a, b, c ... aa, ab ... zzzz ... 0000 ... A1b2!\nGiven enough time, ALWAYS succeeds.\nA 6-character password takes minutes. An 8-character password takes days. A 12-character password = years!\n\nRAINBOW TABLE ATTACK:\nPre-computes hash values of common passwords.\nAttacker has a table: "hash(password123)" = "482c811da5d5b4bc..." → instantly finds it!\n\nDefenses:\n• Account lockout after 5 failed attempts\n• CAPTCHA to prevent automated attacks\n• Long, complex passwords (12+ chars)\n• Salted hashes to defeat rainbow tables`
          },
          {
            type: "section", title: "Password Attacks — Physical",
            text: `PIGGYBACKING:\nAttacker physically FOLLOWS closely behind an authorized person through a secure door before it closes.\nNo access card/code needed — just walk in behind someone!\nAlso: Sharing WiFi without permission = digital piggybacking.\nDefense: Security guards, man-traps (airlock-style one-person entry), strict policies.\n\nSHOULDER SURFING:\nAttacker physically positions themselves to OBSERVE a user entering their password/PIN.\nExample: Standing behind someone at ATM watching them type PIN.\nCan be done from a distance with binoculars!\nDefense: Shield keypad with hand/body, use privacy screen filters, be aware of surroundings.\n\nDUMPSTER DIVING:\nGoing through TRASH/GARBAGE to find useful security information.\nWhat attackers look for:\n• Papers with passwords written on them\n• Old hard drives with data\n• Printed documents with employee details\n• Discarded access cards\nDefense: Shred ALL sensitive documents. Degauss/physically destroy old drives.`
          },
          {
            type: "section", title: "Good Password Guidelines",
            text: `Strong password criteria:\n✓ Minimum 8 characters (12+ recommended)\n✓ Mix of UPPERCASE letters (A-Z)\n✓ Mix of lowercase letters (a-z)\n✓ Numbers (0-9)\n✓ Special characters (#, @, %, &, !)\n✗ No dictionary words\n✗ No personal info (name, birthday, phone number)\n✗ Not same as username\n✗ Not reused across multiple accounts\n\nExample of WEAK passwords: "password", "1234", "riya2000"\nExample of STRONG passwords: "Rt#9mK!2vP8@", "Purple$Tiger7Moon!"\n\nPassword Manager: Use software like Bitwarden or 1Password to store complex unique passwords for every account.`
          },
          {
            type: "section", title: "Role of People in Security",
            text: `People are called the WEAKEST LINK in security because even perfect technical controls fail if people are untrained or careless.\n\n1. SECURITY AWARENESS TRAINING:\n• Employees must know: How to recognize phishing emails, why passwords must be strong, what to do when they suspect a breach\n• Frequency: At least annually, plus immediate training after new threats\n• Forms: Online courses, simulated phishing tests, security newsletters\n\n2. SEPARATION OF DUTIES:\n• No single person has complete control over a critical process\n• Example: Person who approves payments should NOT be same as person who processes them\n• Prevents: Fraud, insider theft, accidental errors\n\n3. DUAL CONTROL:\n• Two people must act together to complete a sensitive action\n• Example: Opening a bank vault requires TWO keys held by TWO different people\n\n4. JOB ROTATION:\n• Employees periodically switched between roles\n• Prevents: Long-term insider fraud (harder to maintain if role changes)\n• Detects: Irregularities when another person takes over a role\n\n5. MANDATORY LEAVE:\n• Employees required to take continuous leave periods\n• During absence, irregularities in their work become visible\n\n6. LEAST PRIVILEGE:\n• Every user, program, and system gets ONLY minimum access needed\n• Example: Receptionist can see appointment schedule but NOT salary data\n\n7. BACKGROUND CHECKS:\n• Before hiring, verify employee history, criminal record, references\n• Especially important for roles with sensitive data access\n\n8. INSIDER THREAT INDICATORS:\n• Working at unusual hours (3AM-5AM logins)\n• Accessing data not related to their job\n• Copying large amounts of data to USB drives\n• Recently disgruntled or given notice`
          },
          {
            type: "section", title: "Incident Response Plan",
            text: `When a security breach occurs, a structured response is critical. The 6-step incident response process:\n\nStep 1 — PREPARATION:\nBefore any incident: Train team, have tools ready, document assets, establish communication plan.\n\nStep 2 — IDENTIFICATION:\nDetect that an incident has occurred. Determine: What happened? When? Which systems affected?\n\nStep 3 — CONTAINMENT:\nImmediately limit the damage. Short-term: Isolate affected systems. Long-term: Apply patches.\n\nStep 4 — ERADICATION:\nRemove the root cause: Delete malware, close vulnerabilities, remove unauthorized accounts.\n\nStep 5 — RECOVERY:\nRestore systems to normal operation. Verify systems are clean before reconnecting.\n\nStep 6 — LESSONS LEARNED:\nPost-incident review: What happened? What worked? What must be improved? Update policies.\n\nMemory trick: P-I-C-E-R-L (Preparation, Identification, Containment, Eradication, Recovery, Lessons)`
          },
          { type: "examtip", text: "4 password attacks: Guessing, Piggybacking, Shoulder Surfing, Dumpster Diving — know all 4 with examples. MFA explanation with ATM example is always asked. Role of People in Security (Separation of Duties, Least Privilege, Job Rotation) is an 8-mark question. Incident Response 6 steps (P-I-C-E-R-L) is asked." }
        ]
      },
      {
        title: "2.3 — Biometrics",
        content: [
          { type: "heading", text: "Biometric Authentication" },
          { type: "para", text: "Biometrics = Unique physical or behavioral characteristics used to identify a person. From Greek: 'bio' (life) + 'metric' (measurement)." },
          {
            type: "section", title: "Biometric System Architecture",
            text: `A biometric system has 4 main stages:\n\n1. SENSOR: The hardware that captures the biometric.\n   Examples: Fingerprint scanner, camera, microphone\n\n2. PREPROCESSING: Cleans and normalizes the captured data.\n   Removes noise, adjusts lighting, filters artifacts.\n\n3. FEATURE EXTRACTOR: Extracts the unique identifying characteristics.\n   For fingerprint: extracts ridge patterns, minutiae points\n   For face: extracts distance between eyes, nose shape, jaw line\n\n4. MATCHER / TEMPLATE DATABASE:\n   ENROLLMENT (first time): Feature template is stored in database\n   VERIFICATION (subsequent use): New template is compared with stored template\n   If match score > threshold → GRANT ACCESS ✓\n   If match score < threshold → DENY ACCESS ✗`
          },
          {
            type: "diagram", id: "biometric",
            svg: `<svg viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <defs><marker id="ba" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#534AB7"/></marker></defs>
  <rect x="10" y="30" width="110" height="50" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="65" y="53" textAnchor="middle" fontSize="12" fontWeight="500" fill="#3C3489">1. Sensor</text>
  <text x="65" y="70" textAnchor="middle" fontSize="10" fill="#534AB7">Capture biometric</text>
  <line x1="120" y1="55" x2="145" y2="55" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#ba)"/>
  <rect x="145" y="30" width="120" height="50" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="205" y="53" textAnchor="middle" fontSize="12" fontWeight="500" fill="#3C3489">2. Preprocess</text>
  <text x="205" y="70" textAnchor="middle" fontSize="10" fill="#534AB7">Clean + normalize</text>
  <line x1="265" y1="55" x2="290" y2="55" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#ba)"/>
  <rect x="290" y="30" width="120" height="50" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="350" y="53" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3C3489">3. Feature Extract</text>
  <text x="350" y="70" textAnchor="middle" fontSize="10" fill="#534AB7">Get unique features</text>
  <line x1="410" y1="55" x2="435" y2="55" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#ba)"/>
  <rect x="435" y="30" width="110" height="50" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="490" y="53" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">4. Matcher</text>
  <text x="490" y="70" textAnchor="middle" fontSize="10" fill="#3B6D11">Compare template</text>
  <line x1="545" y1="55" x2="570" y2="55" stroke="#3B6D11" strokeWidth="1.5" markerEnd="url(#ba)"/>
  <rect x="570" y="30" width="100" height="50" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="620" y="53" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">Grant /</text>
  <text x="620" y="68" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">Deny</text>
</svg>`
          },
          {
            type: "section", title: "Types of Biometrics",
            text: `1. FINGERPRINT SCAN\nScans ridge patterns, whorls, and minutiae (endpoints/bifurcations) of fingerprint.\nAccuracy: Very high. Used in: Smartphones, laptops, attendance systems, forensics.\nLimitations: Cuts, burns, or dirt can affect reading.\n\n2. HAND GEOMETRY\nMeasures shape, size, length, and thickness of hand and fingers.\nAccuracy: Moderate. Used in: Building access control, clock-in systems.\nLimitations: Arthritis or injury affects reading.\n\n3. RETINA SCAN\nScans the unique blood vessel pattern on the back of the eye (retina).\nAccuracy: HIGHEST of all biometrics. Even identical twins differ!\nUsed in: High-security military/government facilities.\nLimitations: Perceived as invasive, expensive equipment, contact lenses/glasses interfere.\n\n4. IRIS SCAN\nScans the unique colored ring patterns of the iris (colored part of eye).\nAccuracy: Very high, stable over lifetime.\nUsed in: Airports, border control, banking.\nLimitations: Poor lighting, eye infections can interfere.\n\n5. VOICE RECOGNITION\nAnalyzes frequency, tone, cadence, and unique characteristics of voice.\nUsed in: Phone banking, smart speakers (Alexa, Siri).\nLimitations: Cold/illness changes voice. Background noise interferes. Can be spoofed with recordings.\n\n6. FACE RECOGNITION\nAnalyzes facial geometry — distance between eyes, nose shape, jaw line, cheekbones.\nUsed in: Smartphone unlock, surveillance, border control.\nLimitations: Poor lighting, aging, disguises. Old systems tricked by photos (modern 3D scanning solves this).\n\n7. SIGNATURE RECOGNITION\nAnalyzes HOW you sign — not just the shape, but pressure, speed, and pen movement rhythm.\nUsed in: Banking documents, legal agreements.\nLimitations: Signature varies with mood/posture/health.\n\n8. KEYSTROKE DYNAMICS\nAnalyzes your unique typing rhythm — dwell time (how long each key is held) + flight time (time between keystrokes).\nUsed in: Continuous authentication for banking portals.\nNo hardware needed — works with regular keyboard!`
          },
          {
            type: "section", title: "FAR, FRR and EER — Biometric Accuracy Metrics",
            text: `These 3 metrics measure how accurate a biometric system is:\n\nFAR — FALSE ACCEPTANCE RATE:\nDefinition: The probability that the system accepts an UNAUTHORIZED person as legitimate.\nAlso called: False Match Rate (FMR)\nFormula: FAR = (False Acceptances) / (Total Impostor Attempts) × 100%\nExample: 100 attackers try to fool fingerprint scanner. 2 succeed. FAR = 2%.\nImpact: HIGH FAR = system is too LENIENT (security risk!)\nLow FAR = good for high-security systems (military, banking)\n\nFRR — FALSE REJECTION RATE:\nDefinition: The probability that the system REJECTS a legitimate, authorized user.\nAlso called: False Non-Match Rate (FNMR)\nFormula: FRR = (False Rejections) / (Total Legitimate Attempts) × 100%\nExample: Employee tries to scan fingerprint 10 times. Rejected 3 times. FRR = 30%.\nImpact: HIGH FRR = system is too STRICT (usability problem, user frustration!)\n\nTRADE-OFF: FAR and FRR have INVERSE relationship!\nIf you make threshold STRICTER: FRR increases, FAR decreases (harder to fool, but real users rejected more)\nIf you make threshold LENIENT: FAR increases, FRR decreases (easier for attackers, but real users rarely rejected)\n\nEER — EQUAL ERROR RATE (Crossover Error Rate):\nDefinition: The point where FAR = FRR. The threshold setting where both error rates are equal.\nUsage: Used to COMPARE biometric systems — LOWER EER = BETTER SYSTEM\nExample:\nSystem A: EER = 0.1% (extremely accurate — e.g., retina scan)\nSystem B: EER = 2.5% (less accurate — e.g., voice recognition)\nSystem A is BETTER.\n\nRanking of Biometrics by EER (best to worst):\n1. Retina scan (lowest EER, most accurate)\n2. Iris scan\n3. Fingerprint\n4. Hand geometry\n5. Face recognition\n6. Voice (highest EER, least accurate)`
          },
          { type: "examtip", text: "7-8 biometric types — list all with one-line description. Retina scan = most accurate. Keystroke dynamics = behavioral biometric. Biometric system diagram (4 stages) is frequently asked. FAR vs FRR vs EER definitions + trade-off relationship is a 6-mark question — draw the FAR/FRR crossover graph!" }
        ]
      },
      {
        title: "2.4 & 2.5 — Authorization & Access Control",
        content: [
          { type: "heading", text: "Authorization & Access Control" },
          {
            type: "section", title: "Authentication vs Authorization",
            text: `AUTHENTICATION = "WHO are you?" → Verify Identity\nAUTHORIZATION = "WHAT are you allowed to do?" → Assign Permissions\n\nThey always happen in this ORDER:\nFirst: Authenticate (login) → Then: Authorize (check what you can do)\n\nExample:\n• You log into a company system (Authentication)\n• But you can only see YOUR department's files, not HR's salary data (Authorization)\n\nGOALS OF AUTHORIZATION:\n• Grant minimum necessary access (Principle of Least Privilege)\n• Protect sensitive resources from unauthorized modification\n• Create clear audit trails (who accessed what when)\n• Prevent privilege escalation (user gaining more access than allowed)`
          },
          {
            type: "section", title: "Access Control Matrix",
            text: `An Access Control Matrix is a table showing which subjects (users/processes) can perform which operations on which objects (files/resources).\n\nExample Matrix:\n         File1       File2       Printer\nUser A:  Read,Write  Read        Execute\nUser B:  Read        Read,Write  Read\n\nThis can be stored as:\n• Access Control List (ACL): Per object — "File1 can be read by User A, User B"\n• Capability List: Per subject — "User A can read File1, print to Printer"`
          },
          {
            type: "section", title: "1. DAC — Discretionary Access Control",
            text: `CONCEPT: The OWNER of a resource decides who can access it.\n"Discretionary" = Owner has discretion (choice) over who gets access.\n\nHow it works:\n• File owner sets permissions (read/write/execute) for each user\n• Owner can grant access to anyone they choose\n\nReal Example:\n• Windows file: Right-click → Properties → Security → Add user and set permissions\n• UNIX/Linux: chmod 755 file (owner=rwx, group=r-x, others=r-x)\n\nAdvantages:\n• Flexible — easy to customize\n• Simple to understand and manage\n\nDisadvantages:\n• Users can accidentally grant access to wrong people\n• If owner account is compromised, all their files are vulnerable\n• Hard to enforce organization-wide policy`
          },
          {
            type: "section", title: "2. MAC — Mandatory Access Control",
            text: `CONCEPT: Security level LABELS control access — not owner's choice.\n"Mandatory" = System enforces it, owner cannot override.\n\nHow it works:\n• Every FILE has a security classification label: Top Secret, Secret, Confidential\n• Every USER has a clearance level\n• Access ONLY granted if User's clearance ≥ File's classification\n• Even the file owner cannot grant access to someone with insufficient clearance!\n\nReal Example (Military):\n• File labeled "SECRET"\n• User with "CONFIDENTIAL" clearance → DENIED (clearance too low)\n• User with "SECRET" clearance → ALLOWED\n• User with "TOP SECRET" clearance → ALLOWED (higher clearance is fine)\n\nAdvantages:\n• Very secure — no human error can grant wrong access\n• Mandatory = enforced by system automatically\n\nDisadvantages:\n• Very rigid — no flexibility\n• Expensive to implement and manage\n• Used mainly in military/government settings`
          },
          {
            type: "section", title: "3. RBAC — Role Based Access Control",
            text: `CONCEPT: Access is assigned based on JOB ROLE, not individual user.\n"Role" = a job function in an organization.\n\nHow it works:\n1. Define roles: Doctor, Nurse, Receptionist, Admin, Manager\n2. Assign permissions to roles (not to individual users)\n3. Assign users to roles\n\nReal Example (Hospital System):\n• Role "Doctor" → can view + prescribe patient records\n• Role "Nurse" → can view + update patient records\n• Role "Receptionist" → can only see appointment schedules, not medical records\n• Role "Admin" → full access to all records\n\nWhen a nurse gets promoted to doctor:\n• Old way (no RBAC): Change 50 individual permissions\n• RBAC way: Change role from "Nurse" to "Doctor" — ONE change!\n\nAdvantages:\n• Easy to manage — change role, not individual permissions\n• Principle of least privilege automatic\n• Easy to audit — what does each role have access to?\n\nDisadvantages:\n• Less flexible than DAC\n• Role explosion — if too many unique roles needed`
          },
          {
            type: "section", title: "4. ABAC — Attribute Based Access Control",
            text: `CONCEPT: Access based on MULTIPLE ATTRIBUTES of user, resource, and environment.\nMost flexible and most complex model.\n\nAttributes considered:\n• User attributes: Role, department, clearance level, age\n• Resource attributes: Classification, file type, sensitivity\n• Environment attributes: TIME of day, location, IP address, device type\n\nReal Example:\n"A Doctor can access Patient Records ONLY IF:\n→ They are in Department = 'Oncology' (user attribute)\n→ AND the record is from their own patients (resource attribute)\n→ AND current time is between 9AM-6PM (environment attribute)\n→ AND they are accessing from hospital network IP (environment attribute)"\n\nAdvantages:\n• Extremely fine-grained control\n• Very powerful — can handle complex scenarios\n\nDisadvantages:\n• Very complex to implement\n• Difficult to audit`
          },
          {
            type: "diagram", id: "ac",
            svg: `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <text x="340" y="18" textAnchor="middle" fontSize="13" fontWeight="500" fill="#3C3489">Access Control Models Comparison</text>
  <rect x="10" y="25" width="155" height="165" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="87" y="48" textAnchor="middle" fontSize="12" fontWeight="500" fill="#0C447C">DAC</text>
  <text x="87" y="65" textAnchor="middle" fontSize="10" fill="#185FA5">Owner decides</text>
  <text x="87" y="82" textAnchor="middle" fontSize="10" fill="#185FA5">Flexible</text>
  <text x="87" y="99" textAnchor="middle" fontSize="10" fill="#185FA5">Windows files</text>
  <text x="87" y="116" textAnchor="middle" fontSize="10" fill="#185FA5">UNIX chmod</text>
  <rect x="175" y="25" width="155" height="165" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1"/>
  <text x="252" y="48" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">MAC</text>
  <text x="252" y="65" textAnchor="middle" fontSize="10" fill="#A32D2D">System enforces</text>
  <text x="252" y="82" textAnchor="middle" fontSize="10" fill="#A32D2D">Labels/Clearance</text>
  <text x="252" y="99" textAnchor="middle" fontSize="10" fill="#A32D2D">Military use</text>
  <text x="252" y="116" textAnchor="middle" fontSize="10" fill="#A32D2D">Very rigid</text>
  <rect x="340" y="25" width="155" height="165" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="417" y="48" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">RBAC</text>
  <text x="417" y="65" textAnchor="middle" fontSize="10" fill="#3B6D11">Role decides</text>
  <text x="417" y="82" textAnchor="middle" fontSize="10" fill="#3B6D11">Job function based</text>
  <text x="417" y="99" textAnchor="middle" fontSize="10" fill="#3B6D11">Most common</text>
  <text x="417" y="116" textAnchor="middle" fontSize="10" fill="#3B6D11">in organizations</text>
  <rect x="505" y="25" width="165" height="165" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="587" y="48" textAnchor="middle" fontSize="12" fontWeight="500" fill="#3C3489">ABAC</text>
  <text x="587" y="65" textAnchor="middle" fontSize="10" fill="#534AB7">Attributes decide</text>
  <text x="587" y="82" textAnchor="middle" fontSize="10" fill="#534AB7">User+Resource+Env</text>
  <text x="587" y="99" textAnchor="middle" fontSize="10" fill="#534AB7">Most flexible</text>
  <text x="587" y="116" textAnchor="middle" fontSize="10" fill="#534AB7">Most complex</text>
</svg>`
          },
          { type: "examtip", text: "DAC vs MAC vs RBAC vs ABAC comparison table is the MOST COMMON exam question in Unit 2. Know all 4 with definition, example, advantage, and disadvantage." }
        ]
      }
    ]
  },
  {
    id: 3, title: "Unit III", subtitle: "Cryptography",
    emoji: "🔒", color: "#1a5276", light: "#eaf4fb",
    topics: [
      {
        title: "3.1 & 3.2 — Cryptography Fundamentals",
        content: [
          { type: "heading", text: "Cryptography Fundamentals" },
          {
            type: "section", title: "Key Definitions",
            text: `PLAIN TEXT (Clear Text): The original, readable message that anyone can understand.\nExample: "HELLO WORLD"\n\nCIPHER TEXT: The scrambled, unreadable version after encryption.\nExample: "KHOOR ZRUOG" (after Caesar cipher shift 3)\n\nENCRYPTION: The process of converting PLAIN TEXT → CIPHER TEXT using an algorithm and key.\n"Locking" the message.\n\nDECRYPTION: The process of converting CIPHER TEXT → PLAIN TEXT using an algorithm and key.\n"Unlocking" the message.\n\nCRYPTOGRAPHY: Art and science of creating encryption/decryption methods (making ciphers).\n\nCRYPTANALYSIS: Science of breaking ciphers without knowing the key (what attackers do).\n\nCRYPTOLOGY = CRYPTOGRAPHY + CRYPTANALYSIS (the whole field)\n\nKEY: A secret value used with the algorithm to encrypt/decrypt. Without the correct key, even if you know the algorithm, you can't decrypt.\n\nPROCESS FLOW:\nSender: Plain Text + Key → [Encryption Algorithm] → Cipher Text → send over network\nReceiver: Cipher Text + Key → [Decryption Algorithm] → Plain Text`
          },
          {
            type: "diagram", id: "crypto",
            svg: `<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <defs><marker id="ca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#185FA5"/></marker></defs>
  <rect x="10" y="40" width="90" height="50" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="55" y="63" textAnchor="middle" fontSize="11" fontWeight="500" fill="#27500A">Plain Text</text>
  <text x="55" y="78" textAnchor="middle" fontSize="10" fill="#3B6D11">"HELLO"</text>
  <line x1="100" y1="65" x2="148" y2="65" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#ca)"/>
  <rect x="148" y="30" width="130" height="70" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="213" y="57" textAnchor="middle" fontSize="11" fontWeight="500" fill="#0C447C">ENCRYPTION</text>
  <text x="213" y="73" textAnchor="middle" fontSize="10" fill="#185FA5">Algorithm + Key</text>
  <text x="213" y="88" textAnchor="middle" fontSize="10" fill="#185FA5">(Caesar, AES...)</text>
  <line x1="278" y1="65" x2="326" y2="65" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#ca)"/>
  <rect x="326" y="40" width="90" height="50" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1"/>
  <text x="371" y="63" textAnchor="middle" fontSize="11" fontWeight="500" fill="#791F1F">Cipher Text</text>
  <text x="371" y="78" textAnchor="middle" fontSize="10" fill="#A32D2D">"KHOOR"</text>
  <line x1="416" y1="65" x2="464" y2="65" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#ca)"/>
  <text x="340" y="18" textAnchor="middle" fontSize="11" fill="#888">sent over insecure network →</text>
  <rect x="464" y="30" width="130" height="70" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="529" y="57" textAnchor="middle" fontSize="11" fontWeight="500" fill="#0C447C">DECRYPTION</text>
  <text x="529" y="73" textAnchor="middle" fontSize="10" fill="#185FA5">Algorithm + Key</text>
  <text x="529" y="88" textAnchor="middle" fontSize="10" fill="#185FA5">(reverse process)</text>
  <line x1="594" y1="65" x2="642" y2="65" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#ca)"/>
  <rect x="642" y="40" width="28" height="50" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="656" y="68" textAnchor="middle" fontSize="9" fontWeight="500" fill="#27500A">PT</text>
</svg>`
          },
          {
            type: "section", title: "Symmetric vs Asymmetric Cryptography",
            text: `SYMMETRIC CRYPTOGRAPHY (Secret Key Cryptography):\n• SAME key used for BOTH encryption AND decryption\n• Sender and receiver must SHARE the same secret key\n• Fast — suitable for large amounts of data\n• Problem: KEY DISTRIBUTION — how do you securely share the key with recipient?\n• Examples: DES, AES, 3DES\n\nASYMMETRIC CRYPTOGRAPHY (Public Key Cryptography):\n• TWO DIFFERENT keys: PUBLIC key + PRIVATE key\n• What PUBLIC key ENCRYPTS → Only PRIVATE key can DECRYPT\n• Public key: share with everyone (publish it!)\n• Private key: NEVER share (keep secret!)\n• Slower than symmetric, but SOLVES key distribution problem!\n• Examples: RSA, Diffie-Hellman, ECC\n\nHYBRID (Used in practice — best of both):\n1. Use asymmetric (RSA) to securely exchange a symmetric key\n2. Use symmetric (AES) for actual data encryption (fast!)\nExample: HTTPS uses this approach!`
          },
          {
            type: "diagram", id: "symvsasym",
            svg: `<svg viewBox="0 0 680 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <rect x="10" y="25" width="310" height="140" rx="8" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="165" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill="#27500A">SYMMETRIC</text>
  <text x="165" y="68" textAnchor="middle" fontSize="11" fill="#3B6D11">Same key for encrypt + decrypt</text>
  <rect x="25" y="78" width="280" height="30" rx="4" fill="#C0DD97" stroke="#3B6D11" strokeWidth="0.5"/>
  <text x="165" y="98" textAnchor="middle" fontSize="11" fill="#173404">Alice [SecretKey] → Encrypt → Send → Decrypt [SecretKey] → Bob</text>
  <text x="165" y="125" textAnchor="middle" fontSize="11" fill="#3B6D11">Fast | DES, AES | Key sharing problem</text>
  <text x="165" y="145" textAnchor="middle" fontSize="11" fill="#3B6D11">Best for: large data encryption</text>
  <rect x="360" y="25" width="310" height="140" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="515" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill="#3C3489">ASYMMETRIC</text>
  <text x="515" y="68" textAnchor="middle" fontSize="11" fill="#534AB7">Public key encrypts, Private decrypts</text>
  <rect x="375" y="78" width="280" height="30" rx="4" fill="#AFA9EC" stroke="#534AB7" strokeWidth="0.5"/>
  <text x="515" y="98" textAnchor="middle" fontSize="11" fill="#26215C">Alice uses Bob's PublicKey → Encrypt → Bob uses PrivateKey → Decrypt</text>
  <text x="515" y="125" textAnchor="middle" fontSize="11" fill="#534AB7">Slower | RSA | Solves key distribution</text>
  <text x="515" y="145" textAnchor="middle" fontSize="11" fill="#534AB7">Best for: key exchange, digital signatures</text>
</svg>`
          },
          {
            type: "section", title: "Kerckhoffs' Principle",
            text: `Proposed by Auguste Kerckhoffs in 1883. One of the fundamental principles of cryptography.\n\nSTATEMENT: "A cryptographic system should be secure even if EVERYTHING about the system, except the KEY, is public knowledge."\n\nIn simple words: Security must depend ONLY on the secrecy of the KEY, not on the secrecy of the algorithm.\n\nWHY THIS MATTERS:\n• Bad approach: "Security by Obscurity" — keep the algorithm secret. Problem: Once algorithm is discovered, system is permanently broken!\n• Good approach (Kerckhoffs): Algorithm is public, openly analyzed, peer-reviewed. Only the key is secret. Even if algorithm is known, without the key, data is safe.\n\nReal Examples:\n• AES algorithm is publicly known! Anyone can read the spec. But without the 256-bit key, you cannot decrypt.\n• RSA algorithm is published in textbooks. Without the private key, data is safe.\n• Open source cryptography (OpenSSL) is STRONGER than proprietary hidden algorithms — because thousands of experts review the code for vulnerabilities!\n\nCONTRARY EXAMPLE (Bad Practice):\nA company creates a secret encryption algorithm and tells no one how it works. If ONE person reverse-engineers it, ALL data encrypted with it is compromised forever.`
          },
          {
            type: "section", title: "Stream Cipher vs Block Cipher",
            text: `BLOCK CIPHER:\nEncrypts data in fixed-size BLOCKS (64-bit, 128-bit).\nIf message is shorter than block size → padding added.\nIf message is longer → split into multiple blocks, each encrypted separately.\nExamples: DES (64-bit blocks), AES (128-bit blocks)\n\nADVANTAGES: Good for large files, parallelizable, widely used.\nDISADVANTAGES: Slower for streaming data, padding adds overhead.\n\nSTREAM CIPHER:\nEncrypts data ONE BIT (or one byte) AT A TIME.\nUses a keystream (pseudo-random bit sequence) XORed with plaintext.\nCipher = Plaintext XOR Keystream\nExamples: RC4 (deprecated), ChaCha20\n\nADVANTAGES: Fast, excellent for streaming data (phone calls, video, real-time).\nDISADVANTAGES: If keystream is reused → catastrophic security failure!\n\nMODES OF OPERATION (for Block Ciphers):\n1. ECB (Electronic Code Book): Same input = same output. WEAK! Never use.\n   (Same block in → same block out, patterns visible)\n2. CBC (Cipher Block Chaining): Each block XORed with previous ciphertext before encrypting.\n   Strong! Used in TLS 1.0/1.1 (now deprecated)\n3. CTR (Counter Mode): Block cipher used like stream cipher. XOR with encrypted counter value.\n   Fast, parallelizable.\n4. GCM (Galois/Counter Mode): CTR + authentication tag. Used in TLS 1.3, AES-GCM.\n   Most widely used today!`
          },
          { type: "examtip", text: "Symmetric vs Asymmetric comparison table is very commonly asked. Remember: Symmetric = same key (fast), Asymmetric = two keys (solves key distribution problem). Kerckhoffs' Principle is a 4-mark question. Stream vs Block Cipher + ECB weakness (same input = same output) is frequently asked." }
        ]
      },
      {
        title: "3.3 — Substitution Techniques",
        content: [
          { type: "heading", text: "Substitution Techniques" },
          { type: "para", text: "Substitution means REPLACING each letter with another letter/symbol based on a rule or key. The position of letters stays the same — only their identity changes." },
          {
            type: "section", title: "1. Caesar Cipher",
            text: `Proposed by Julius Caesar. Also called SHIFT CIPHER.\nSimplest substitution: Replace each letter with the letter N positions further in the alphabet.\n\nWITH SHIFT = 3:\nA→D, B→E, C→F, D→G, E→H, F→I, G→J, H→K, I→L, J→M, K→N, L→O, M→P\nN→Q, O→R, P→S, Q→T, R→U, S→V, T→W, U→X, V→Y, W→Z, X→A, Y→B, Z→C\n\nENCRYPT "SECRET" with shift 3:\nS→V, E→H, C→F, R→U, E→H, T→W\nCipher text = "VHFUHW"\n\nENCRYPT "HELLO" with shift 3:\nH→K, E→H, L→O, L→O, O→R\nCipher text = "KHOOR"\n\nDECRYPT "KHOOR" with shift 3 (subtract 3):\nK→H, H→E, O→L, O→L, R→O\nPlain text = "HELLO"\n\nFORMULA:\nEncrypt: C = (P + K) mod 26\nDecrypt: P = (C - K + 26) mod 26\n(Where P = plain text letter position, C = cipher letter position, K = key/shift)\n\nWEAKNESS: Only 25 possible shifts! Very easy to break by trying all 25.`
          },
          {
            type: "section", title: "2. Playfair Cipher",
            text: `Uses a 5×5 KEY MATRIX of letters. Encrypts PAIRS of letters (digrams) instead of single letters.\nI and J share the same cell (to fit 25 letters in 25 cells).\n\nCREATING THE MATRIX with keyword "MONARCHY":\nStep 1: Write keyword letters (remove duplicates): M, O, N, A, R, C, H, Y\nStep 2: Fill remaining alphabet letters (skip those already in keyword, skip J):\nB, D, E, F, G, I, K, L, P, Q, S, T, U, V, W, X, Z\n\nResult matrix:\nM O N A R\nC H Y B D\nE F G I K\nL P Q S T\nU V W X Z\n\nENCRYPTION RULES for each pair of letters:\nRule 1: SAME ROW → Replace each with the letter to its RIGHT (wrap around)\nRule 2: SAME COLUMN → Replace each with the letter BELOW it (wrap around)\nRule 3: RECTANGLE → Each letter replaced by the one in SAME ROW but OTHER LETTER'S COLUMN\n\nWhy stronger than Caesar? 676 possible digrams vs 25 shifts. Frequency analysis harder!`
          },
          {
            type: "section", title: "3. Vigenère Cipher",
            text: `Uses a KEYWORD where each letter of the keyword determines the shift for the corresponding letter of the plaintext. Shift changes for each letter!\n\nENCRYPT "HELLO" with key "KEY":\nK=10, E=4, Y=24 (positions in alphabet)\nH(+10)=R, E(+4)=I, L(+24)=J, L(+10 repeat K)=V, O(+4 repeat E)=S\nCipher = "RIJVS"\n\nDECRYPT "RIJVS" with key "KEY":\nR(-10)=H, I(-4)=E, J(-24)=L, V(-10)=L, S(-4)=O\nPlain = "HELLO" ✓\n\nWhy stronger? Different shifts for different positions — frequency analysis much harder!`
          },
          {
            type: "section", title: "4. Vernam Cipher (One-Time Pad)",
            text: `Uses a completely RANDOM KEY that is:\n• Same LENGTH as the plaintext\n• Used only ONCE (never reused!)\n• Completely random (no pattern)\n\nOperation: Uses XOR bitwise operation\nCipher = Plain XOR Key\nPlain = Cipher XOR Key (XOR is its own inverse!)\n\nExample:\nPlain:  H=01001000\nKey:    X=01011000\nCipher: 00010000 (XOR each bit)\n\nWHY UNBREAKABLE:\nIf the key is truly random and used only once, the cipher text gives NO statistical information about the plaintext. Every possible plaintext is equally likely!\n\nPRACTICAL PROBLEM: Key must be as long as the message AND delivered securely to recipient. For large files = impractical. But perfect for short messages in spy communications!`
          },
          { type: "examtip", text: "Caesar cipher calculation is ALWAYS in exams — practice encrypting and decrypting. 'HELLO' with shift 3 = 'KHOOR'. Know all 4 substitution techniques with their key differences." }
        ]
      },
      {
        title: "3.4 & 3.5 — Transposition & Steganography",
        content: [
          { type: "heading", text: "Transposition Techniques & Steganography" },
          { type: "para", text: "Transposition = REARRANGE the letters, don't replace them. The same letters are used but in a different order." },
          {
            type: "section", title: "1. Rail Fence Technique",
            text: `Write the plaintext in a ZIGZAG pattern across multiple "rails" (rows). Then read each rail horizontally left to right.\n\nEXAMPLE: Encrypt "COME HOME" with 2 rails:\n\nRail 1: C . M . H . M . (positions 0,2,4,6,8)\nRail 2: . O . E . O . E (positions 1,3,5,7)\n\nActual layout:\nC   M   H   M\n  O   E   O   E\n\nRead Rail 1 first: CMHM\nRead Rail 2 next: OEOE\nCipher text: CMHMOEOE\n\nEXAMPLE: Encrypt "COMPUTER SECURITY" with 2 rails:\nC . m . u . e . s . c . r . t .  → Rail 1: Cmuestrscrcirt (even positions)\n. o . p . t . r . e . u . i . y → Rail 2: optreuiy (odd positions)\nCipher: cmuescroptreuiy\n\nDECRYPTION: Know number of rails → reconstruct zigzag → read diagonally.`
          },
          {
            type: "diagram", id: "railfence",
            svg: `<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <text x="340" y="18" textAnchor="middle" fontSize="13" fontWeight="500" fill="#185FA5">Rail Fence: "COME HOME" with 2 rails</text>
  <text x="30" y="50" fontSize="12" fill="#27500A" fontWeight="500">Rail 1:</text>
  <text x="90" y="50" fontSize="16" fill="#0C447C" fontWeight="500">C</text>
  <text x="130" y="50" fontSize="16" fill="#0C447C" fontWeight="500">M</text>
  <text x="210" y="50" fontSize="16" fill="#0C447C" fontWeight="500">H</text>
  <text x="290" y="50" fontSize="16" fill="#0C447C" fontWeight="500">O</text>
  <text x="370" y="50" fontSize="16" fill="#0C447C" fontWeight="500">M</text>
  <text x="30" y="100" fontSize="12" fill="#791F1F" fontWeight="500">Rail 2:</text>
  <text x="110" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">O</text>
  <text x="170" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">E</text>
  <text x="250" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">H</text>
  <text x="330" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">O</text>
  <text x="410" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">M</text>
  <text x="450" y="100" fontSize="16" fill="#A32D2D" fontWeight="500">E</text>
  <line x1="92" y1="52" x2="112" y2="98" stroke="#888" strokeWidth="1" strokeDasharray="3,2"/>
  <line x1="112" y1="98" x2="132" y2="52" stroke="#888" strokeWidth="1" strokeDasharray="3,2"/>
  <line x1="132" y1="52" x2="172" y2="98" stroke="#888" strokeWidth="1" strokeDasharray="3,2"/>
  <text x="30" y="140" fontSize="12" fill="#534AB7" fontWeight="500">Cipher text = CMHM (rail1) + OEHOEME (rail2) = CMHMOEHOEME</text>
  <text x="30" y="155" fontSize="11" fill="#888">(Read each rail left to right, rail 1 first, then rail 2)</text>
</svg>`
          },
          {
            type: "section", title: "2. Simple Columnar Transposition",
            text: `Write the message in ROWS of fixed width. Rearrange and read COLUMNS based on a key.\n\nEXAMPLE with keyword "ZEBRA" (key length = 5):\nPlain text: "COMPUTER SECURITY" (remove spaces: COMPUTERSECURITY)\n\nWrite in rows of 5:\nZ E B R A   (keyword - determines column order)\n3 2 1 4 0   (alphabetical position of each key letter → gives column read order)\n\nC O M P U\nT E R S E\nC U R I T\nY\n\nRead columns in KEY ORDER (A=col5, B=col3, E=col2, R=col4, Z=col1):\nCol 0 (A): U, E, T\nCol 1 (B): M, R, R\nCol 2 (E): O, E, U\nCol 3 (R): P, S, I\nCol 4 (Z): C, T, C, Y\n\nCipher text: UET + MRR + OEU + PSI + CTCY\n\nWhy stronger: Column order is determined by the key — without key, hard to reconstruct!`
          },
          {
            type: "section", title: "Steganography — Hiding the Message",
            text: `STEGANOGRAPHY = Hiding the EXISTENCE of a message (not just making it unreadable).\nFrom Greek: "steganos" = covered + "graphos" = writing = "Covered Writing"\n\nKEY DIFFERENCE:\nCryptography: Message exists but is UNREADABLE (locked)\nSteganography: Message is INVISIBLE — hidden inside another file!\n\nSTEGANOGRAPHY FORMULA:\nCover-media + Hidden data + Stego-key = Stego-medium\n\nTYPES:\n\n1. IMAGE STEGANOGRAPHY (Most Common):\nTechnique: LSB (Least Significant Bit)\nEach pixel has R, G, B values (0-255 = 8 bits each)\nChanging the LAST BIT of each value → invisible color change (1/256 change)\nBut you can store 1 bit of secret data per channel!\nImage with 1MP = 1,000,000 pixels × 3 channels = 3,000,000 bits = 375,000 bytes of hidden data!\n\n2. AUDIO STEGANOGRAPHY:\nHide data in audio samples. Human ears cannot detect tiny changes in audio.\n\n3. TEXT STEGANOGRAPHY:\nHide data in extra spaces between words, capitalization patterns, specific word choices.\n\n4. VIDEO STEGANOGRAPHY:\nSame as image, applied frame by frame.\n\nReal World Example:\nSpy sends "vacation photo.jpg" by email. To untrained eye: normal beach photo. Inside the image, hidden in LSB: "Meet at warehouse 3 at midnight."\n\nPrevention: Steganalysis tools detect statistical anomalies in image data.\n\nTools: OpenStego (open source), Steghide`
          },
          { type: "examtip", text: "Rail Fence with example calculation is always asked. Steganography vs Cryptography comparison is important. LSB technique for image steganography should be explained." }
        ]
      }
    ]
  },
  {
    id: 4, title: "Unit IV", subtitle: "Firewall & Encryption Algorithms",
    emoji: "🔥", color: "#d35400", light: "#fef5ec",
    topics: [
      {
        title: "4.1 & 4.2 — Firewalls",
        content: [
          { type: "heading", text: "Firewalls" },
          {
            type: "section", title: "What is a Firewall?",
            text: `A Firewall is a network security device (hardware or software) that MONITORS and CONTROLS incoming and outgoing network traffic based on predetermined security RULES (policies).\n\nAnalogy: A firewall is like a SECURITY GUARD at a building gate. Guard checks each person's ID and reason for entry. Allows authorized people in, blocks unauthorized ones.\n\nNEED FOR FIREWALL:\n• First line of defense between trusted internal network and untrusted internet\n• Enforces access control policies\n• Blocks unauthorized access attempts\n• Prevents malicious traffic from entering\n• Logs all traffic for audit purposes\n\nHARDWARE FIREWALL:\n• Physical device between router and internal network\n• Protects the ENTIRE network\n• Examples: Cisco ASA, Palo Alto, FortiGate\n• Used in: Enterprises, data centers\n\nSOFTWARE FIREWALL:\n• Application installed on individual computers\n• Protects ONLY that specific machine\n• Examples: Windows Defender Firewall, iptables (Linux)\n• Used in: Home computers, laptops, individual servers`
          },
          {
            type: "section", title: "1. Packet Filter Firewall",
            text: `Works at NETWORK LAYER (Layer 3) and TRANSPORT LAYER (Layer 4).\n\nHow it works:\n1. Receive each incoming/outgoing packet\n2. Check packet HEADER information:\n   • Source IP address\n   • Destination IP address\n   • Source Port number\n   • Destination Port number\n   • Protocol (TCP/UDP/ICMP)\n3. Compare against RULE TABLE:\n   • Rule 1: Allow if Source IP = internal network\n   • Rule 2: Block if Destination Port = 23 (Telnet — insecure)\n   • Rule 3: Allow if Destination Port = 443 (HTTPS)\n4. If matches rule → Apply rule (allow/block)\n5. If no rule matches → Apply DEFAULT action (usually block all)\n\nADVANTAGES:\n• Very FAST (only checks headers, not content)\n• TRANSPARENT to users (they don't notice it)\n• Simple to configure for basic filtering\n\nDISADVANTAGES:\n• Cannot look INSIDE the packet (no content inspection)\n• Cannot understand application context\n• Difficult to handle fragmented packets\n• No authentication support`
          },
          {
            type: "section", title: "2. Stateful Packet Filter",
            text: `SMARTER than packet filter. Tracks the STATE of network connections.\n\nWhat is "state"?\nTCP connections have states: SYN, SYN-ACK, ACK, ESTABLISHED, FIN, etc.\n\nHow stateful inspection works:\n1. Tracks all ACTIVE connections in a STATE TABLE\n2. For each new packet, checks:\n   - Is this packet part of an EXISTING, ESTABLISHED connection?\n   - Was this connection initiated by OUR internal network?\n3. Allows packets that belong to legitimate established connections\n4. Blocks unexpected packets not part of any known connection\n\nExample:\n• Internal user requests web page → outgoing SYN packet → allowed\n• Web server responds → incoming packet → ALLOWED (part of established connection)\n• Someone from outside sends unexpected packet → BLOCKED (not in state table)\n\nADVANTAGES: Much smarter than packet filter. Tracks full connection context.\nDISADVANTAGES: Uses more memory/CPU for state table.`
          },
          {
            type: "section", title: "3. Application Gateway (Proxy Firewall)",
            text: `Works at APPLICATION LAYER (Layer 7). Acts as a PROXY (middle-man) between internal user and internet.\n\nHow it works:\n1. User requests www.google.com\n2. Request goes to APPLICATION GATEWAY, not directly to Google\n3. Gateway INSPECTS the request deeply (understands HTTP, FTP, DNS, etc.)\n4. If request is safe → Gateway makes request to Google on user's behalf\n5. Google responds to Gateway → Gateway forwards to user\n6. External systems never see internal IP addresses!\n\nWhat it can filter:\n• Block specific URLs and websites\n• Block specific file types (e.g., .exe downloads)\n• Detect and block malware in HTTP content\n• Filter email attachments\n• Authenticate users before allowing access\n\nADVANTAGES:\n• Deep inspection of application-layer content\n• Full authentication support\n• Can understand and filter application protocols\n\nDISADVANTAGES:\n• SLOWEST type of firewall\n• High processing overhead\n• Application-specific — need proxy for each protocol`
          },
          {
            type: "section", title: "4. Circuit Gateway",
            text: `Works at SESSION LAYER (between Transport and Application layers).\n\nHow it works:\n1. Internal user requests connection to external server\n2. Circuit gateway validates the SESSION handshake (TCP three-way handshake)\n3. If valid → creates a CIRCUIT between internal client and external server\n4. After circuit is established, forwards packets WITHOUT further inspection\n\nTHink of it as: A switchboard operator who connects your call. Once connected, the operator doesn't listen in — the conversation flows directly.\n\nAdvantages: Faster than application gateway (no per-packet inspection after setup)\nDisadvantages: Once circuit established, malicious content can flow through`
          },
          {
            type: "section", title: "Firewall Policies & DMZ",
            text: `FIREWALL POLICIES (Rules for what to allow/block):\n• Allow internal → external HTTP (port 80) and HTTPS (port 443)\n• Block all Telnet (port 23) — insecure\n• Block all inbound connections from known malicious IPs\n• Allow specific VPN traffic\n• Block all by default ("deny all" default rule)\n\nFIREWALL LIMITATIONS:\n• Cannot protect against INSIDE threats (employees already inside)\n• Cannot stop encrypted malware inside allowed HTTPS traffic\n• Protocol tunneling (hiding one protocol inside another) can bypass rules\n• Cannot protect against social engineering\n• Cannot prevent zero-day attacks (new, unknown attack patterns)\n\nDMZ — DEMILITARIZED ZONE:\nA "neutral zone" network between internal network and internet.\nPublic-facing servers (web server, mail server, DNS) are placed here.\nThey're accessible from internet, but isolated from internal network.\n\nLayout: Internet → [Firewall 1] → DMZ → [Firewall 2] → Internal Network\n\nWhy DMZ helps:\n• Even if attacker compromises web server in DMZ, they STILL face Firewall 2 to reach internal systems!\n• Internal network is protected even if DMZ is breached.`
          },
          {
            type: "diagram", id: "dmz",
            svg: `<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#534AB7"/></marker></defs>
  <rect x="10" y="55" width="90" height="40" rx="6" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
  <text x="55" y="80" textAnchor="middle" fontSize="12" fontWeight="500" fill="#791F1F">Internet</text>
  <line x1="100" y1="75" x2="133" y2="75" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#da)"/>
  <rect x="133" y="45" width="80" height="60" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.5"/>
  <text x="173" y="72" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3C3489">Firewall</text>
  <text x="173" y="88" textAnchor="middle" fontSize="10" fill="#534AB7">1</text>
  <line x1="213" y1="75" x2="246" y2="75" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#da)"/>
  <rect x="246" y="40" width="140" height="70" rx="6" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
  <text x="316" y="68" textAnchor="middle" fontSize="12" fontWeight="500" fill="#633806">DMZ</text>
  <text x="316" y="84" textAnchor="middle" fontSize="10" fill="#854F0B">Web Server</text>
  <text x="316" y="98" textAnchor="middle" fontSize="10" fill="#854F0B">Mail Server, DNS</text>
  <line x1="386" y1="75" x2="419" y2="75" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#da)"/>
  <rect x="419" y="45" width="80" height="60" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.5"/>
  <text x="459" y="72" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3C3489">Firewall</text>
  <text x="459" y="88" textAnchor="middle" fontSize="10" fill="#534AB7">2</text>
  <line x1="499" y1="75" x2="532" y2="75" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#da)"/>
  <rect x="532" y="40" width="140" height="70" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="602" y="68" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">Internal</text>
  <text x="602" y="84" textAnchor="middle" fontSize="10" fill="#3B6D11">Network</text>
  <text x="602" y="98" textAnchor="middle" fontSize="10" fill="#3B6D11">(Protected)</text>
  <text x="340" y="130" textAnchor="middle" fontSize="11" fill="#5F5E5A">Even if DMZ is breached → Firewall 2 still protects internal network!</text>
</svg>`
          },
          {
            type: "section", title: "SSL/TLS — How HTTPS Works",
            text: `SSL (Secure Sockets Layer) and TLS (Transport Layer Security) provide secure communication between client and server. TLS is the modern, secure version of SSL.\n\nHTTPS = HTTP + TLS\n\nSSL/TLS HANDSHAKE (Simplified for exams):\nStep 1 — CLIENT HELLO: Browser sends: TLS version + list of cipher suites + Client Random number.\nStep 2 — SERVER HELLO: Server sends: Chosen cipher suite + Server Random + Digital Certificate.\nStep 3 — CERTIFICATE VERIFICATION: Browser verifies server's certificate with CA's public key.\nStep 4 — KEY EXCHANGE: Browser generates Pre-Master Secret, encrypts with server's public key, sends it.\nStep 5 — SESSION KEY GENERATION: Both sides compute same Session Key from Pre-Master Secret + both Randoms.\nStep 6 — FINISHED: Both sides send "Finished" messages encrypted with Session Key. Secure channel ready!\n\nAFTER HANDSHAKE:\nAll data encrypted with symmetric Session Key (AES-256 typically). Fast!\nThis is HYBRID CRYPTOGRAPHY:\n→ Asymmetric (RSA) used to securely exchange the session key\n→ Symmetric (AES) used for actual data (fast!)\n\nSSL/TLS VERSIONS:\nSSL 2.0, SSL 3.0: BROKEN — do not use (POODLE attack on SSL 3.0)\nTLS 1.0, TLS 1.1: Deprecated (2020)\nTLS 1.2: Widely used, secure\nTLS 1.3: Latest (2018), fastest, most secure. Mandatory for new systems.\n\nIMPORTANT ATTACKS:\n• POODLE: Exploits SSL 3.0. Fix: Disable SSL 3.0\n• Heartbleed: Bug in OpenSSL library that leaked server's private keys. Fix: Update OpenSSL.\n• BEAST: Exploits TLS 1.0 CBC. Fix: Use TLS 1.2+`
          },
          {
            type: "section", title: "IPS vs IDS — Key Difference",
            text: `IDS — Intrusion Detection System:\n• PASSIVELY monitors network/host\n• DETECTS and ALERTS on suspicious activity\n• Does NOT block attacks — only raises alarm\n• Analogy: Security CAMERA — records and alerts but doesn't stop intruder\n\nIPS — Intrusion Prevention System:\n• ACTIVELY monitors AND BLOCKS attacks in real time\n• Sits INLINE in network (all traffic passes through it)\n• Can: Drop malicious packets, block IP addresses, reset connections\n• Analogy: Security GUARD — detects AND stops intruder\n\nCOMPARISON:\nFeature      | IDS           | IPS\nMode         | Passive       | Active/Inline\nAction       | Alert only    | Block + Alert\nNetwork pos  | Out-of-band   | Inline (traffic flows through)\nFalse pos    | Less critical | Dangerous (blocks legit traffic!)\nPerformance  | No impact     | Slight latency\n\nIDPS = Intrusion Detection and Prevention System (combines both)\n\nVPN — Virtual Private Network:\nCreates encrypted tunnel through public internet.\nAllow remote workers to securely access company network.\nTypes of VPN:\n1. Remote Access VPN: Individual user → Company network (WFH employees)\n2. Site-to-Site VPN: Branch office ↔ Head office (connects entire networks)\n\nVPN Protocols:\n• PPTP: Old, fast, WEAK security\n• L2TP/IPSec: Better security, widely used\n• OpenVPN: Open source, very secure, uses SSL/TLS\n• IKEv2/IPSec: Fast and secure, best for mobile devices`
          },
          { type: "examtip", text: "4 types of firewalls (Packet Filter, Stateful, Application Gateway, Circuit Gateway) — know how each works. DMZ diagram is frequently asked. Firewall limitations list is also important. SSL/TLS Handshake steps, IDS vs IPS differences, and VPN types are all 4-6 mark questions." }
        ]
      },
      {
        title: "4.3 & 4.4 — DES, AES, RSA & Diffie-Hellman",
        content: [
          { type: "heading", text: "Encryption Algorithms" },
          {
            type: "section", title: "DES — Data Encryption Standard",
            text: `Type: Symmetric (same key encrypt+decrypt)\nKey size: 56 bits\nBlock size: 64 bits (processes 64 bits at a time)\nRounds: 16 rounds\nDeveloped: 1977 by IBM for US Government\n\nDES WORKING (Step by Step):\n\nStep 1 — INITIAL PERMUTATION (IP):\nThe 64-bit plaintext is permuted (rearranged).\nBit 1 goes to position 58, bit 2 goes to position 50, etc. (according to IP table)\nResult: Still 64 bits, just rearranged.\n\nStep 2 — SPLIT into LEFT (LPT) and RIGHT (RPT):\nThe 64-bit permuted text is split into two 32-bit halves.\nLPT = Left 32 bits. RPT = Right 32 bits.\n\n16 ROUNDS (each round does these 5 steps on LPT and RPT):\n\nSTEP A — KEY TRANSFORMATION:\n56-bit key is compressed by discarding every 8th bit.\nA different 48-bit SUB-KEY is derived for each round using shifts.\n\nSTEP B — EXPANSION PERMUTATION:\nRPT is EXPANDED from 32 bits → 48 bits by repeating some bits.\n(So it can be XORed with the 48-bit sub-key)\n\nSTEP C — S-BOX SUBSTITUTION:\n48-bit result XORed with 48-bit sub-key.\nResult fed into 8 S-Boxes (Substitution boxes).\nEach S-Box: 6 bits input → 4 bits output.\n8 × 4 = 32 bits output.\nS-boxes provide CONFUSION (obscure relationship between key and cipher).\n\nSTEP D — P-BOX PERMUTATION:\n32-bit S-box output is permuted (rearranged) using P-box.\nProvides DIFFUSION (spread influence of each input bit across many output bits).\n\nSTEP E — XOR and SWAP:\nLPT is XORed with P-box output → becomes new RPT.\nOld RPT becomes new LPT.\n\nStep 3 — FINAL PERMUTATION:\nAfter all 16 rounds, apply Final Permutation (inverse of Initial Permutation).\nOutput: 64-bit cipher text!\n\nWEAKNESS: 56-bit key is TOO SHORT! Modern computers crack it in less than 24 hours.\nSOLUTION: 3DES (Triple DES) — apply DES 3 times with different keys. Effective key = 168 bits.`
          },
          {
            type: "section", title: "AES — Advanced Encryption Standard",
            text: `Type: Symmetric\nKey sizes: 128, 192, or 256 bits (you choose!)\nBlock size: 128 bits\nRounds: 10 (128-bit key), 12 (192-bit), 14 (256-bit)\nDeveloped: 2001 by NIST — replaced DES\nDesigned by: Daemen and Rijmen (also called Rijndael)\n\nAES OPERATIONS PER ROUND:\n1. SubBytes: Each byte replaced using a lookup table (S-box)\n2. ShiftRows: Rows of 4×4 byte matrix are shifted left cyclically\n3. MixColumns: Each column multiplied by a polynomial (except last round)\n4. AddRoundKey: XOR with round key\n\nWhy AES is better than DES:\n• Much larger key (128-256 bits vs 56 bits)\n• Larger block size (128 bits vs 64 bits)\n• More rounds of processing\n• No known practical attacks!\n\nAES IS EVERYWHERE:\n• WiFi security (WPA2, WPA3)\n• HTTPS (TLS)\n• File encryption (BitLocker, FileVault)\n• WhatsApp end-to-end encryption\n• Government/military communications`
          },
          {
            type: "section", title: "RSA Algorithm",
            text: `Type: Asymmetric (public key + private key)\nKey sizes: 1024, 2048, 4096 bits\nNamed after: Rivest, Shamir, Adleman (MIT, 1977)\nSecurity based on: Difficulty of FACTORING large numbers into primes\n\nRSA KEY GENERATION STEPS:\nStep 1: Choose two large PRIME numbers p and q\nStep 2: Calculate n = p × q (this is the modulus)\nStep 3: Calculate φ(n) = (p-1)(q-1)\nStep 4: Choose e such that: 1 < e < φ(n) and gcd(e, φ(n)) = 1\nStep 5: Calculate d such that: (d × e) mod φ(n) = 1\nPublic Key = (e, n). Private Key = (d, n)\n\nENCRYPTION: C = M^e mod n (using receiver's PUBLIC key)\nDECRYPTION: M = C^d mod n (using receiver's PRIVATE key)\n\nSMALL EXAMPLE:\np=3, q=11 → n = 33, φ(n) = 2×10 = 20\nChoose e=3 (gcd(3,20)=1 ✓)\nd such that 3d mod 20 = 1 → d=7 (since 3×7=21, 21 mod 20=1) ✓\nPublic key = (3, 33). Private key = (7, 33)\n\nEncrypt M=4: C = 4^3 mod 33 = 64 mod 33 = 31\nDecrypt C=31: M = 31^7 mod 33 = 4 ✓`
          },
          {
            type: "section", title: "Diffie-Hellman Key Exchange",
            text: `PURPOSE: Two parties establish a SHARED SECRET over an insecure channel without ever transmitting the secret!\n\nPublic parameters (everyone knows): Prime p, Generator g\n\nSTEP BY STEP:\n1. Alice chooses secret: a. Computes A = g^a mod p. Sends A to Bob.\n2. Bob chooses secret: b. Computes B = g^b mod p. Sends B to Alice.\n3. Alice computes: K = B^a mod p\n4. Bob computes: K = A^b mod p\nBOTH GET SAME K! (Because B^a = g^(b×a) = g^(a×b) = A^b)\n\nATTACKER SEES: p, g, A=g^a mod p, B=g^b mod p\nATTACKER CANNOT GET: a or b (this is the DISCRETE LOGARITHM problem — computationally infeasible)\n\nNUMERICAL EXAMPLE (Common Exam Question):\np = 23, g = 5\nAlice's secret: a = 6\nBob's secret: b = 15\n\nAlice: A = 5^6 mod 23 = 15625 mod 23 = 8 → sends 8 to Bob\nBob: B = 5^15 mod 23 = 30517578125 mod 23 = 19 → sends 19 to Alice\n\nAlice: K = 19^6 mod 23 = 47045881 mod 23 = 2\nBob: K = 8^15 mod 23 = 35184372088832 mod 23 = 2 ✓\nShared Secret = 2!\n\nVULNERABILITY: Susceptible to MAN-IN-THE-MIDDLE attack!\nAttacker can intercept A and B, substitute their own values.\nFix: Use digital certificates to authenticate the key exchange.`
          },
          { type: "examtip", text: "DES steps (5 steps of one round) are commonly asked. RSA key generation steps are important. Diffie-Hellman numerical example (p=23, g=5, a=6, b=15) appears in exams — practice this calculation!" }
        ]
      },
      {
        title: "4.5 & 4.6 — Hash Functions & Digital Signatures",
        content: [
          { type: "heading", text: "Hash Functions & Digital Signatures" },
          {
            type: "section", title: "Hash Functions",
            text: `A Hash Function takes INPUT of ANY size and produces FIXED-SIZE output called hash/digest.\n\nFORMAT: h = H(M)\nWhere M = message (any size), h = hash (fixed size)\n\nPROPERTIES OF A GOOD HASH FUNCTION:\n1. DETERMINISTIC: Same input → ALWAYS same output\n2. ONE-WAY: Cannot reverse-engineer original from hash (computationally infeasible)\n3. AVALANCHE EFFECT: Tiny change in input → completely different hash\n4. COLLISION RESISTANT: Two different inputs should not produce same hash\n5. FIXED OUTPUT SIZE: Regardless of input size\n6. FAST TO COMPUTE\n\nEXAMPLE (SHA-256):\n"Hello" → 185f8db32921bd46d35cc0c65bfb... (64 hex chars = 256 bits)\n"hello" → 2cf24dba5fb0a30e26e83b2ac5b9... (completely different!)\n(One capital letter change → completely different hash)\n\nMD5 — Message Digest 5:\nOutput: 128 bits (32 hex characters)\nSpeed: Fast\nStatus: BROKEN — collision attacks found! Do NOT use for security!\nStill used for: File integrity checks (verify downloaded file not corrupted)\n\nSHA (Secure Hash Algorithm):\nSHA-1: 160 bits. BROKEN — do not use.\nSHA-256: 256 bits. SECURE — widely used.\nSHA-512: 512 bits. Very secure.\n\nUSES OF HASH FUNCTIONS:\n• Storing passwords (store hash, not plaintext)\n• File integrity verification\n• Digital signatures\n• Blockchain (Bitcoin uses SHA-256)\n• Data deduplication`
          },
          {
            type: "section", title: "Digital Signatures — How They Work",
            text: `A Digital Signature provides:\n• AUTHENTICATION — proves who sent the message\n• INTEGRITY — proves message not modified\n• NON-REPUDIATION — sender cannot deny having sent it\n\nSIGNING PROCESS (at Sender — Alice's side):\n1. Alice writes message M.\n2. Alice runs M through Hash function (SHA-256) → gets Message Digest (MD)\n3. Alice ENCRYPTS MD with her PRIVATE KEY → this encrypted hash IS the Digital Signature\n4. Alice sends: [Original Message] + [Digital Signature] to Bob\n\nVERIFICATION PROCESS (at Receiver — Bob's side):\n1. Bob receives: [Message] + [Digital Signature]\n2. Bob DECRYPTS the Digital Signature using Alice's PUBLIC KEY → gets Hash A\n3. Bob independently runs the received Message through SHA-256 → gets Hash B\n4. If Hash A == Hash B → Message is AUTHENTIC and UNMODIFIED! ✓\n5. If Hash A ≠ Hash B → Message was TAMPERED with! Alert! ✗\n\nWHY IT WORKS:\n• Only Alice has her PRIVATE key → only she could have created that signature\n• Hash changes if message changes → any modification is detected\n• Alice cannot deny → the signature can only be from her private key`
          },
          {
            type: "diagram", id: "digsig",
            svg: `<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <defs><marker id="dsa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#185FA5"/></marker></defs>
  <text x="170" y="18" textAnchor="middle" fontSize="12" fontWeight="500" fill="#0C447C">SENDER (Alice)</text>
  <text x="530" y="18" textAnchor="middle" fontSize="12" fontWeight="500" fill="#27500A">RECEIVER (Bob)</text>
  <rect x="10" y="25" width="80" height="35" rx="5" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="50" y="47" textAnchor="middle" fontSize="11" fill="#0C447C">Message M</text>
  <line x1="90" y1="42" x2="115" y2="42" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#dsa)"/>
  <rect x="115" y="25" width="90" height="35" rx="5" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="160" y="43" textAnchor="middle" fontSize="10" fill="#3C3489">Hash (SHA-256)</text>
  <text x="160" y="55" textAnchor="middle" fontSize="9" fill="#534AB7">→ Digest</text>
  <line x1="205" y1="42" x2="230" y2="42" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#dsa)"/>
  <rect x="230" y="25" width="100" height="35" rx="5" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="280" y="40" textAnchor="middle" fontSize="10" fill="#3C3489">Encrypt with</text>
  <text x="280" y="52" textAnchor="middle" fontSize="9" fill="#534AB7">Alice's PRIVATE KEY</text>
  <text x="180" y="90" textAnchor="middle" fontSize="11" fill="#534AB7">= Digital Signature</text>
  <rect x="100" y="110" width="230" height="30" rx="5" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="215" y="130" textAnchor="middle" fontSize="11" fill="#27500A">Send: Message + Digital Signature →→→→→→→→→</text>
  <rect x="370" y="110" width="290" height="30" rx="5" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
  <text x="515" y="130" textAnchor="middle" fontSize="11" fill="#27500A">Bob receives both</text>
  <rect x="370" y="155" width="120" height="35" rx="5" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="430" y="170" textAnchor="middle" fontSize="10" fill="#3C3489">Decrypt Signature</text>
  <text x="430" y="182" textAnchor="middle" fontSize="9" fill="#534AB7">with Alice's PUBLIC KEY → Hash A</text>
  <rect x="510" y="155" width="130" height="35" rx="5" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="575" y="170" textAnchor="middle" fontSize="10" fill="#3C3489">Hash Message</text>
  <text x="575" y="182" textAnchor="middle" fontSize="9" fill="#534AB7">(SHA-256) → Hash B</text>
  <rect x="420" y="200" width="220" height="20" rx="5" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="530" y="214" textAnchor="middle" fontSize="11" fontWeight="500" fill="#27500A">Hash A == Hash B → Valid! ✓</text>
</svg>`
          },
          {
            type: "section", title: "Digital Certificate",
            text: `A Digital Certificate is an electronic document issued by a CERTIFICATE AUTHORITY (CA) that binds a public key to an identity.\n\nContents of a Digital Certificate:\n• Owner's name (e.g., "Amazon.com")\n• Owner's PUBLIC key\n• Certificate validity period (start date, end date)\n• CA's name (e.g., "VeriSign", "DigiCert")\n• CA's digital signature (proof of authenticity)\n• Serial number\n\nVERIFYING A DIGITAL CERTIFICATE (when you visit https://amazon.com):\nStep 1: Browser receives Amazon's digital certificate.\nStep 2: Browser checks: "Which CA signed this?" (e.g., DigiCert)\nStep 3: Browser checks its trusted CA list — is DigiCert trusted? Yes!\nStep 4: Browser runs certificate through hash algorithm → gets Digest A\nStep 5: Browser decrypts CA's signature using CA's public key → gets Digest B\nStep 6: Digest A == Digest B → Certificate is authentic!\nStep 7: Check if certificate is EXPIRED (validity dates)\nStep 8: Check if certificate is REVOKED (Certificate Revocation List)\nStep 9: Check email/domain in certificate matches the actual domain you're visiting\nStep 10: Certificate is valid → Secure connection established → Green padlock! 🔒`
          },
          { type: "examtip", text: "Digital Signature working with step-by-step process is a 6-mark question. Digital Certificate verification steps are also asked. MD5 vs SHA comparison is important." }
        ]
      }
    ]
  },
  {
    id: 5, title: "Unit V", subtitle: "Network & Database Security",
    emoji: "🌐", color: "#1a5276", light: "#eaf4fb",
    topics: [
      {
        title: "5.1 — Intrusion Detection Systems",
        content: [
          { type: "heading", text: "Intrusion Detection Systems (IDS)" },
          {
            type: "section", title: "What is an IDS?",
            text: `An IDS monitors network/system activity and DETECTS suspicious behavior, then ALERTS the administrator.\n\nDifference from Firewall:\n• Firewall = PREVENTIVE (blocks before attack enters)\n• IDS = DETECTIVE (detects attack after or during, raises alert)\n\nIDS Detection Methods:\n1. SIGNATURE-BASED: Compare activity against a database of known attack signatures.\n   Fast, low false positives. Cannot detect NEW (zero-day) attacks.\n2. ANOMALY-BASED: Learn what "normal" looks like, alert on DEVIATIONS.\n   Can detect new attacks. Higher false positive rate.\n\nComponents of IDS:\n1. TRAFFIC COLLECTOR: Captures network packets or system log events\n2. ANALYSIS ENGINE: Examines collected data, compares with signature DB (the "brain")\n3. SIGNATURE DATABASE: Library of known attack patterns and definitions\n4. USER INTERFACE & REPORTING: Shows alerts to administrator, logs events`
          },
          {
            type: "section", title: "NIDS — Network Based IDS",
            text: `NIDS monitors network traffic at STRATEGIC POINTS on the network.\nPlaced at: Network entry/exit points, between segments, at internet gateway.\n\nWhat NIDS looks for:\n• Denial of Service attacks (unusual traffic spikes)\n• Port scanning/sweeping (attacker mapping the network)\n• Malicious payloads in packet data\n• Trojan, virus, or worm signatures\n• Brute force login attempts\n• Known attack patterns in TCP/IP traffic\n\nHow NIDS captures traffic:\n• Network tap: Physical device that copies all traffic\n• Port mirroring: Switch sends copy of all traffic to IDS port\n• Promiscuous mode NIC: Network card that accepts all packets, not just its own\n\nADVANTAGES:\n• ONE NIDS can monitor ENTIRE network (thousands of computers)\n• No software installation needed on individual machines\n• Attacker cannot easily detect or disable it\n• Works even for encrypted traffic metadata analysis\n\nDISADVANTAGES:\n• Cannot see INSIDE encrypted traffic (TLS/HTTPS)\n• High network traffic can cause packet drops\n• Cannot monitor activity ON individual hosts (local file access, process runs)`
          },
          {
            type: "section", title: "HIDS — Host Based IDS",
            text: `HIDS is installed on individual HOSTS (computers/servers) and monitors activity ON that specific machine.\n\nWhat HIDS monitors on the host:\n• System log files (failed logins, unusual activity)\n• File system changes (critical system files modified?)\n• Running processes (new unexpected processes?)\n• User login patterns (logins at 3AM? unusual!)\n• Registry changes (Windows)\n• Network traffic to/from that specific host\n\nSpecific suspicious activities HIDS looks for:\n• Logins at unusual hours (2AM-5AM)\n• Multiple failed login attempts\n• New user accounts created unexpectedly\n• Critical system file modification\n• Binary file removal or modification\n• Privilege escalation (regular user gaining admin rights)\n• Unusual programs being executed\n\nADVANTAGES:\n• Can see ENCRYPTED traffic (after decryption at the host)\n• OS-specific and application-specific signatures possible\n• Can detect insider attacks and local threats\n• Can identify specific impact on that machine\n\nDISADVANTAGES:\n• Must be installed on EVERY machine to monitor (high cost)\n• Uses local system resources (CPU, RAM, disk)\n• If attacker gains admin access, can disable HIDS\n• If logs stored locally, attacker can delete them`
          },
          {
            type: "diagram", id: "ids",
            svg: `<svg viewBox="0 0 680 185" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <text x="340" y="18" textAnchor="middle" fontSize="13" fontWeight="500" fill="#185FA5">NIDS vs HIDS Comparison</text>
  <rect x="10" y="25" width="320" height="150" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
  <text x="170" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill="#0C447C">NIDS (Network-Based)</text>
  <text x="170" y="70" textAnchor="middle" fontSize="11" fill="#185FA5">Monitors: All network traffic</text>
  <text x="170" y="87" textAnchor="middle" fontSize="11" fill="#185FA5">Location: Network gateway/switch</text>
  <text x="170" y="104" textAnchor="middle" fontSize="11" fill="#185FA5">Coverage: Entire network</text>
  <text x="170" y="121" textAnchor="middle" fontSize="11" fill="#185FA5">Cannot see: Encrypted content</text>
  <text x="170" y="138" textAnchor="middle" fontSize="11" fill="#185FA5">Tools: Snort, Suricata</text>
  <text x="170" y="160" textAnchor="middle" fontSize="10" fill="#185FA5">One NIDS protects thousands of machines</text>
  <rect x="350" y="25" width="320" height="150" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
  <text x="510" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill="#3C3489">HIDS (Host-Based)</text>
  <text x="510" y="70" textAnchor="middle" fontSize="11" fill="#534AB7">Monitors: Single host activity</text>
  <text x="510" y="87" textAnchor="middle" fontSize="11" fill="#534AB7">Location: Each computer</text>
  <text x="510" y="104" textAnchor="middle" fontSize="11" fill="#534AB7">Coverage: One machine</text>
  <text x="510" y="121" textAnchor="middle" fontSize="11" fill="#534AB7">CAN see: Encrypted content</text>
  <text x="510" y="138" textAnchor="middle" fontSize="11" fill="#534AB7">Tools: OSSEC, Tripwire</text>
  <text x="510" y="160" textAnchor="middle" fontSize="10" fill="#534AB7">Needs install on every machine</text>
</svg>`
          },
          {
            type: "section", title: "Honeypot",
            text: `A HONEYPOT is a deliberately vulnerable fake system set up to ATTRACT attackers and study their methods.\n\nHow it works:\n1. IT team sets up a server that looks like a valuable target (fake database, fake file server)\n2. This server has no real data — it's a TRAP\n3. No legitimate user would ever access this server\n4. If anyone accesses it → they MUST be an attacker!\n5. All attacker activity is logged and analyzed\n\nWhat honeypots reveal:\n• What techniques attackers use\n• What vulnerabilities they look for\n• Where attacks originate from\n• How long attacks take\n• New/unknown attack methods\n\nTypes:\n• Low-interaction honeypot: Simulates services, easy to set up, limited info\n• High-interaction honeypot: Full OS, more realistic, more dangerous to manage\n\nReal Example: Security team sets up a fake "employee salary database" server. After 2 days, they notice someone logged in from Russia trying to download it → active attacker identified and blocked!`
          },
          { type: "examtip", text: "NIDS vs HIDS comparison table + Honeypot definition are common exam questions. HIDS components diagram (4 parts: Collector, Analysis Engine, Signature DB, UI) is frequently asked." }
        ]
      },
      {
        title: "5.2 — Kerberos & IP Security",
        content: [
          { type: "heading", text: "Kerberos & IP Security (IPSec)" },
          {
            type: "section", title: "Kerberos — Network Authentication",
            text: `Named after the three-headed dog Cerberus that guards the underworld in Greek mythology.\n\nPURPOSE: Provides strong SINGLE SIGN-ON authentication for client-server applications over a network.\nUSES: Secret key cryptography (symmetric)\nKEY FEATURE: Password is NEVER sent over the network!\n\nTHREE ENTITIES:\n1. AS — Authentication Server: Verifies user identity initially (checks username)\n2. TGS — Ticket Granting Server: Issues access tickets for specific services\n3. SS — Service Server: The actual service user wants to use (print server, file server, etc.)\n\nKERBEROS AUTHENTICATION FLOW (6 Steps):\n\nStep 1: User logs in → sends UserID to Authentication Server (AS)\nAS checks: "Yes, this user exists in our database."\n\nStep 2: AS sends back encrypted TGT (Ticket Granting Ticket)\nTGT is encrypted with USER's PASSWORD HASH (only user can decrypt it)\nTGT contains: Session key + Timestamp (8 hour expiry)\n\nStep 3: User decrypts TGT using their PASSWORD\n(This proves user knows the password without sending it!)\n\nStep 4: User sends TGT + service request to TGS\n"I have a valid TGT, I want to access the File Server"\n\nStep 5: TGS verifies TGT → sends back a SERVICE TICKET for that specific service\nService Ticket is encrypted with the Service Server's secret key\n\nStep 6: User presents Service Ticket to Service Server (SS)\nSS decrypts ticket → grants access to that service!\n\nBENEFITS:\n• Password never travels over network!\n• Single login → access to multiple services (SSO)\n• Tickets expire after 8 hours → limited replay attack window\n• Centralized authentication`
          },
          {
            type: "diagram", id: "kerberos",
            svg: `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px">
  <defs><marker id="ka" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#534AB7"/></marker></defs>
  <rect x="10" y="85" width="90" height="50" rx="6" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.5"/>
  <text x="55" y="108" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3C3489">Client</text>
  <text x="55" y="123" textAnchor="middle" fontSize="10" fill="#534AB7">User</text>
  <rect x="270" y="20" width="90" height="50" rx="6" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
  <text x="315" y="43" textAnchor="middle" fontSize="11" fontWeight="500" fill="#0C447C">AS</text>
  <text x="315" y="58" textAnchor="middle" fontSize="10" fill="#185FA5">Auth Server</text>
  <rect x="270" y="150" width="90" height="50" rx="6" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.5"/>
  <text x="315" y="173" textAnchor="middle" fontSize="11" fontWeight="500" fill="#27500A">TGS</text>
  <text x="315" y="188" textAnchor="middle" fontSize="10" fill="#3B6D11">Ticket Server</text>
  <rect x="560" y="85" width="110" height="50" rx="6" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
  <text x="615" y="108" textAnchor="middle" fontSize="11" fontWeight="500" fill="#633806">Service</text>
  <text x="615" y="123" textAnchor="middle" fontSize="10" fill="#854F0B">Server (SS)</text>
  <line x1="100" y1="97" x2="268" y2="40" stroke="#534AB7" strokeWidth="1" markerEnd="url(#ka)"/>
  <text x="165" y="60" textAnchor="middle" fontSize="10" fill="#534AB7">① UserID</text>
  <line x1="268" y1="55" x2="100" y2="107" stroke="#185FA5" strokeWidth="1" markerEnd="url(#ka)"/>
  <text x="178" y="90" textAnchor="middle" fontSize="10" fill="#185FA5">② TGT (encrypted)</text>
  <line x1="100" y1="120" x2="268" y2="170" stroke="#534AB7" strokeWidth="1" markerEnd="url(#ka)"/>
  <text x="165" y="155" textAnchor="middle" fontSize="10" fill="#534AB7">③④ TGT + service request</text>
  <line x1="268" y1="175" x2="100" y2="125" stroke="#3B6D11" strokeWidth="1" markerEnd="url(#ka)"/>
  <text x="170" y="195" textAnchor="middle" fontSize="10" fill="#3B6D11">⑤ Service Ticket</text>
  <line x1="100" y1="108" x2="558" y2="108" stroke="#854F0B" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#ka)"/>
  <text x="340" y="100" textAnchor="middle" fontSize="10" fill="#854F0B">⑥ Present Service Ticket → ACCESS GRANTED!</text>
</svg>`
          },
          {
            type: "section", title: "IP Security (IPSec)",
            text: `IPSec = IP Security. A framework of protocols to provide security at the NETWORK LAYER (Layer 3).\nApplied to ALL IP traffic — applications don't need to be modified!\n\nIPSec SERVICES:\n• Authentication: Verifies sender identity\n• Integrity: Data not modified in transit\n• Confidentiality: Data encrypted\n• Anti-replay: Prevents replay attacks (sequence numbers)\n\nIPSec PROTOCOLS:\n\n1. AH — Authentication Header:\n• Provides: Authentication + Integrity\n• Does NOT provide: Encryption (confidentiality)\n• How: Computes HMAC over packet content, adds AH header between IP header and data\n• Format: IP Header | AH Header | Data\n\n2. ESP — Encapsulating Security Payload:\n• Provides: Authentication + Integrity + ENCRYPTION (more complete!)\n• Encrypts the payload portion of the packet\n• Format: IP Header | ESP Header | Encrypted Data | ESP Trailer | ESP Auth\n\nIPSec MODES:\n\nTRANSPORT MODE:\n• Only the PAYLOAD (data) is protected/encrypted\n• Original IP header remains VISIBLE in plain text\n• Used for: End-to-end communication between two hosts\n• IP Header remains: Source/destination IPs visible to routers\n\nTUNNEL MODE:\n• The ENTIRE original IP packet is encrypted and encapsulated\n• New outer IP header added\n• Used for: VPNs (Virtual Private Networks) — branch-to-branch connections\n• Even original IP header is hidden from intermediate routers!`
          },
          { type: "examtip", text: "Kerberos 3 servers (AS, TGS, SS) and 6-step flow is commonly asked. Draw the Kerberos diagram! AH vs ESP comparison and Transport vs Tunnel mode comparison are also important." }
        ]
      },
      {
        title: "5.3 — Email Security",
        content: [
          { type: "heading", text: "Email Security" },
          {
            type: "section", title: "Why Email Security is Needed",
            text: `Regular email (SMTP) has NO built-in security!\n• Messages travel as PLAIN TEXT by default\n• Anyone intercepting network traffic can read emails\n• No built-in authentication (easy to spoof sender address)\n• No integrity protection (emails can be modified in transit)\n\nEmail security provides: Confidentiality + Integrity + Authentication + Non-repudiation`
          },
          {
            type: "section", title: "SMTP — Simple Mail Transfer Protocol",
            text: `The BASIC protocol for SENDING emails.\nPort 25 (server to server), Port 587 (client to server with auth)\n\nSMTP Process:\nSender → [Sender's Mail Server] → [Internet] → [Receiver's Mail Server] → Receiver\n\nProblems with basic SMTP:\n• No encryption — plain text emails\n• No sender authentication — anyone can claim to be anyone\n• Spam and phishing trivially easy\n\nModern addition: STARTTLS command upgrades SMTP to encrypted TLS connection\nModern addition: SPF, DKIM, DMARC for sender authentication`
          },
          {
            type: "section", title: "PGP — Pretty Good Privacy",
            text: `Created by Phil Zimmermann in 1991. One of the most widely used email encryption systems.\nFREE, OPEN-SOURCE implementation: GnuPG (GNU Privacy Guard)\n\nPGP PROVIDES: Confidentiality + Digital Signature + Compression\n\nPGP ENCRYPTION PROCESS (5 Steps):\n\nStep 1 — DIGITAL SIGNATURE:\n• PGP runs message through SHA-1 → creates Message Digest\n• Message Digest is encrypted with SENDER's PRIVATE KEY → Digital Signature\n• Provides: Authentication + Non-repudiation\n\nStep 2 — COMPRESSION:\n• Message + Digital Signature are COMPRESSED together\n• Algorithm: Lempel-Ziv (LZ) algorithm\n• Reduces message size for faster transmission\n\nStep 3 — ENCRYPTION:\n• Compressed data is encrypted with a RANDOM SYMMETRIC SESSION KEY\n• Algorithm: 3DES or IDEA or AES\n• Much faster than asymmetric for large data\n\nStep 4 — DIGITAL ENVELOPING:\n• The SESSION KEY from Step 3 is encrypted with RECEIVER's PUBLIC KEY\n• This encrypted session key is the "digital envelope"\n• Output of Steps 3 + 4 together = "Digital Envelope" (encrypted message + encrypted key)\n\nStep 5 — BASE-64 ENCODING:\n• Binary data cannot always be safely sent as email\n• PGP converts binary to printable ASCII characters\n• Process: 3 bytes (24 bits) → 4 groups of 6 bits → 4 printable characters\n• Makes email safe to transmit through all mail systems\n\nPGP DECRYPTION (Receiver's side):\n1. Decode Base-64 → get binary data\n2. Decrypt envelope key using RECEIVER's PRIVATE KEY → get session key\n3. Use session key to decrypt the compressed data\n4. Decompress → get message + digital signature\n5. Verify digital signature using SENDER's PUBLIC KEY → authentication!`
          },
          {
            type: "section", title: "S/MIME & PEM",
            text: `S/MIME — Secure/Multipurpose Internet Mail Extensions:\n• More standardized than PGP\n• Uses X.509 digital certificates (issued by Certificate Authority)\n• Built into major email clients: Outlook, Apple Mail, Thunderbird\n• Provides: Encryption + Digital Signatures\n• Difference from PGP: Uses CA-issued certs (centralized trust) vs PGP's web-of-trust\n\nPEM — Privacy Enhanced Mail:\n• Older email security standard (1993)\n• Less used today but concepts still relevant\n• Provides: Authentication, Confidentiality, Message Integrity\n• 4 Steps similar to PGP: Canonical conversion → Digital Signature → Encryption → Base-64 encoding\n• Key difference from PGP: No compression step; uses MD2/MD5 for hash`
          },
          {
            type: "section", title: "Finding Email Origin",
            text: `Every email contains HEADERS with routing information that can reveal its origin.\n\nEmail headers contain:\n• "Received:" headers: Each mail server adds its own entry showing IP and timestamp\n• "Message-ID": Unique identifier generated by sending server\n• "X-Originating-IP": Original sender's IP address (often)\n• SMTP server information\n\nTool: Email Tracker Pro — analyzes email headers to trace origin\nProcess:\n1. Open email → View Headers (full)\n2. Copy the Received: chain (list of servers the email passed through)\n3. Trace IP addresses of each "Received" entry\n4. First "Received" entry is closest to origin\n5. Use IP geolocation to find approximate location\n\nLimitation: Spammers use VPNs, Tor, and open relays to hide origin.`
          },
          {
            type: "section", title: "SET — Secure Electronic Transaction",
            text: `Developed jointly by VISA and Mastercard in 1996 to secure credit card payments over the internet.\n\nSET PARTICIPANTS:\n1. CARDHOLDER: Customer with credit card\n2. MERCHANT: Online seller accepting payment\n3. PAYMENT GATEWAY: Bank's server that processes payment\n4. CERTIFICATE AUTHORITY (CA): Issues digital certificates to all parties\n\nKEY INNOVATION — DUAL SIGNATURE:\nThe cardholder sends TWO pieces of info to the merchant:\n• Order Information (OI): What you're buying (merchant needs this, not bank)\n• Payment Information (PI): Card details (bank needs this, not merchant!)\n\nDUAL SIGNATURE PROCESS:\nStep 1: Hash OI → Hash PI separately\nStep 2: Concatenate both hashes → Hash the result = "Message Digest"\nStep 3: Encrypt Message Digest with cardholder's PRIVATE KEY = Dual Signature\n\nResult:\n• Merchant gets: OI + Dual Signature + Hash(PI) — merchant verifies OI, sees PI hash only\n• Bank gets: PI + Dual Signature + Hash(OI) — bank verifies PI, sees OI hash only\n• NEITHER party sees the other's information — PERFECT PRIVACY!\n\nSET Security Features:\n• Confidentiality: Payment info encrypted — merchant never sees full card number\n• Integrity: Dual signature ensures neither OI nor PI can be altered\n• Authentication: All parties have CA-issued digital certificates\n• Non-repudiation: Cannot deny having made the purchase`
          },
          {
            type: "section", title: "SSL vs SET — Key Differences",
            text: `SSL:\n• Provides secure CHANNEL between browser and server\n• Merchant can see full credit card number\n• Simple to implement — just install SSL certificate\n• Used by: Amazon, Flipkart, all HTTPS sites\n\nSET:\n• Provides secure TRANSACTION between cardholder, merchant, and bank\n• Merchant NEVER sees credit card number (only bank does)\n• Complex to implement — all parties need certificates\n• More secure but less widely adopted due to complexity\n\nReal difference: SSL secures the pipe. SET secures the transaction itself.`
          },
          { type: "examtip", text: "PGP 5 steps (Digital Signature → Compression → Encryption → Digital Envelope → Base-64) is commonly asked. SMTP working with diagram is also frequently tested. SET Dual Signature concept (Merchant sees OI, Bank sees PI — neither sees both) is a 6-mark question. SSL vs SET comparison is important." }
        ]
      },
      {
        title: "5.4 & 5.5 — Database & Cloud Security",
        content: [
          { type: "heading", text: "Database Security & Cloud Security" },
          {
            type: "section", title: "Why Database Security is Needed",
            text: `Databases contain the MOST VALUABLE data:\n• Customer personal information (name, address, phone)\n• Financial records (credit card numbers, bank details)\n• Medical records (health conditions, medications)\n• Business secrets (trade secrets, pricing data)\n• Employee data (salaries, social security numbers)\n\nThreats to databases:\n• Unauthorized access (stolen credentials)\n• SQL injection attacks\n• Insider threats (employees with database access)\n• Malware (ransomware encrypting the database)\n• Data breaches (stolen database files)\n• Accidental data loss (deletion, corruption)`
          },
          {
            type: "section", title: "SQL Injection Attack — In Depth",
            text: `SQL injection = Inserting malicious SQL code into input fields to manipulate database queries.\n\nNORMAL LOGIN QUERY:\nSELECT * FROM users WHERE username='alice' AND password='1234'\n→ Returns user record if both match → Login succeeds\n\nATTACK TYPE 1 — Authentication Bypass:\nAttacker enters username: alice' OR '1'='1\nResulting query: SELECT * FROM users WHERE username='alice' OR '1'='1' AND password=''\n'1'='1' is ALWAYS TRUE → returns ALL users → LOGIN SUCCEEDS without password!\n\nATTACK TYPE 2 — Database Deletion:\nAttacker enters: alice'; DROP TABLE users; --\nResulting query: SELECT * FROM users WHERE username='alice'; DROP TABLE users; --\nThis DELETES the entire users table!\nThe -- comments out the rest of the query.\n\nATTACK TYPE 3 — Data Extraction:\nAttacker enters: alice' UNION SELECT username, password FROM admin --\nReturns admin credentials as part of the result!\n\nDEFENSES AGAINST SQL INJECTION:\n1. PREPARED STATEMENTS (Parameterized Queries) — BEST DEFENSE:\n   Input is treated as DATA, not executable code.\n   Example (Java): PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");\n   The '?' values can NEVER be executed as SQL!\n\n2. INPUT VALIDATION: Reject inputs containing SQL special characters (', ;, --, etc.)\n\n3. PRINCIPLE OF LEAST PRIVILEGE: Database user should only have minimum necessary permissions\n   (e.g., web app user can only SELECT, not DROP TABLE)\n\n4. WEB APPLICATION FIREWALL (WAF): Detects and blocks SQL injection patterns\n\n5. STORED PROCEDURES: Predefined database operations that limit query flexibility`
          },
          {
            type: "section", title: "Database Encryption",
            text: `Encrypting data IN the database so even if stolen, it's unreadable.\n\nTYPES:\n1. COLUMN-LEVEL ENCRYPTION:\n• Only sensitive columns are encrypted (e.g., credit card number, SSN, password)\n• Other columns remain readable\n• Fine-grained control\n\n2. TRANSPARENT DATA ENCRYPTION (TDE):\n• Encrypts entire database files at the storage level\n• Completely transparent to applications\n• If database files are stolen from disk, they're unreadable\n• Supported by: SQL Server, Oracle, MySQL\n\n3. APPLICATION-LEVEL ENCRYPTION:\n• Application encrypts data before storing in database\n• Database only stores encrypted values\n• Maximum control\n\nPASSWORD STORAGE (Important!):\nNEVER store passwords in plain text!\nStored as: hash(salt + password)\nSalt = random value added to prevent rainbow table attacks`
          },
          {
            type: "section", title: "Cloud Security — Characteristics & Models",
            text: `CLOUD COMPUTING = Using computing resources (servers, storage, software) over the internet, on-demand, without owning them.\n\n5 ESSENTIAL CHARACTERISTICS (NIST Definition):\n1. ON-DEMAND SELF-SERVICE: Get resources instantly without human intervention. "I need 10 more servers → get them in 2 minutes."\n2. BROAD NETWORK ACCESS: Accessible from anywhere via internet (laptop, phone, tablet).\n3. RESOURCE POOLING: Multiple customers share same physical infrastructure (multi-tenant).\n4. RAPID ELASTICITY: Scale UP or DOWN instantly based on demand. Pay only for what you use.\n5. MEASURED SERVICE: Usage is monitored and metered. Billing per GB, per hour, per request.\n\nSERVICE MODELS:\nIaaS (Infrastructure as a Service):\n• Rent virtual servers, storage, networks\n• You manage: OS, applications\n• Provider manages: Physical hardware\n• Examples: AWS EC2, Azure VMs, Google Compute Engine\n\nPaaS (Platform as a Service):\n• Rent development platform\n• You manage: Applications and data\n• Provider manages: OS, servers, middleware\n• Examples: Google App Engine, AWS Elastic Beanstalk, Heroku\n\nSaaS (Software as a Service):\n• Use software over internet, no installation\n• You manage: Nothing (just use the software)\n• Examples: Gmail, Microsoft Office 365, Salesforce, Zoom\n\nDEPLOYMENT MODELS:\nPUBLIC CLOUD: Resources shared with other organizations. Cheapest. Examples: AWS, Azure, GCP.\nPRIVATE CLOUD: Dedicated to one organization. More control. Expensive. Examples: On-premise cloud, VMware.\nHYBRID CLOUD: Mix of public + private. Best of both worlds. Critical data private, other workloads public.\nCOMMUNITY CLOUD: Shared by specific community (e.g., government agencies, healthcare organizations).`
          },
          {
            type: "section", title: "Cloud-Specific Security Threats",
            text: `1. DATA BREACHES:\nShared infrastructure means a vulnerability in one customer's environment could affect others.\nMitigations: Encryption, strong access controls, regular audits.\n\n2. INSECURE APIs:\nCloud services are accessed through APIs. Insecure APIs = major attack vector.\nMitigations: API authentication (keys, OAuth), input validation, rate limiting.\n\n3. ACCOUNT HIJACKING:\nStolen cloud credentials give attacker access to EVERYTHING.\nMitigations: MFA, strong password policy, monitoring for unusual access patterns.\n\n4. INSIDER THREATS:\nCloud provider employees have physical access to hardware.\nMitigations: Encryption (provider can't read encrypted data even with physical access), SOC 2 compliance audits.\n\n5. DATA LOSS:\nAccidental deletion, no backups, hardware failure.\nMitigations: Regular backups, cross-region replication, data retention policies.\n\n6. INSUFFICIENT DUE DILIGENCE:\nOrganizations migrate to cloud without proper security assessment.\nMitigations: Proper planning, security assessment, understanding shared responsibility model.\n\nSHARED RESPONSIBILITY MODEL:\nCloud Provider is responsible for: Security OF the cloud (physical hardware, hypervisor, network)\nCustomer is responsible for: Security IN the cloud (data, applications, access management, OS configuration)`
          },
          {
            type: "section", title: "IT Act 2000 & IT Act 2008 (Amendment)",
            text: `The Information Technology Act 2000 is India's primary law for cybercrime and electronic commerce.\n\nIT ACT 2000 — KEY SECTIONS:\nSection 43: Penalty for unauthorized access/damage to computer system.\nPenalty: Compensation up to Rs. 1 crore.\nCovers: Hacking, introducing viruses, denial of service, data theft.\n\nSection 65: Tampering with Computer Source Documents.\nPenalty: Up to 3 years imprisonment OR fine up to Rs. 2 lakhs.\nExample: Altering source code of a banking application.\n\nSection 66: Computer-related offenses (Hacking).\nPenalty: Up to 3 years imprisonment AND/OR fine up to Rs. 5 lakhs.\nCovers: Dishonestly deleting/altering data.\n\nSection 67: Publishing obscene material in electronic form.\nPenalty: First offence: 5 years + Rs. 1 lakh fine. Repeat: 10 years + Rs. 2 lakh fine.\n\nSection 72: Breach of confidentiality and privacy.\nPenalty: Up to 2 years imprisonment AND/OR Rs. 1 lakh fine.\nApplies to: Anyone who has secured access to data but discloses it without consent.\n\nIT ACT 2008 AMENDMENTS (Key additions):\nSection 66A: Sending offensive messages through communication services. (Was struck down by Supreme Court in 2015)\nSection 66B: Dishonestly receiving stolen computer resources.\nSection 66C: IDENTITY THEFT — Fraudulently using someone's electronic signature/password.\nPenalty: Up to 3 years + Rs. 1 lakh fine.\nSection 66D: Cheating by personation using computer resources (PHISHING).\nSection 66E: Violation of PRIVACY — publishing private images of a person.\nSection 66F: CYBER TERRORISM — Acts that threaten unity/security of India using computer networks.\nPenalty: Life imprisonment!\nSection 70: Protected systems — Government can notify critical systems. Unauthorized access = 10 years imprisonment.\nSection 79: Safe harbour for intermediaries (websites not liable for user content if they follow guidelines).`
          },
          {
            type: "section", title: "Data Recovery — Concepts & Methods",
            text: `DATA RECOVERY = Process of retrieving inaccessible, lost, corrupted, or formatted data from storage media.\n\nCASE 1 — RECOVERING DELETED FILES:\nWhen you delete a file:\n• The OS marks the file's directory entry as deleted (adds 'E5' prefix to filename)\n• The file's data BLOCKS are marked as 'available' in the File Allocation Table (FAT)\n• The actual data REMAINS on disk until overwritten by new data!\n\nRecovery Process:\n1. Immediately STOP using the drive (prevent overwriting!)\n2. Use recovery software to scan for file headers (magic numbers)\n3. Reconstruct file from data blocks\nTools: Recuva (free), R-Studio, PhotoRec\n\nCASE 2 — RECOVERING FROM FORMATTED PARTITION:\nQuick Format: Only MBR/FAT erased — data mostly intact. Easy to recover.\nFull Format: Low-level sector-by-sector overwrite — very hard to recover.\n\nRecovery Process:\n1. Use tools that bypass the FAT and scan raw disk sectors\n2. Search for file signatures (e.g., JPEG starts with FF D8 FF)\n3. Reconstruct files from sectors\nTools: TestDisk, GetDataBack\n\nCASE 3 — RAID-BASED RECOVERY:\nRAID 1 (Mirroring): If one drive fails, other has identical copy. Immediate recovery.\nRAID 5: Distributed parity allows 1 drive failure. Rebuild from parity.\nRAID 6: Can tolerate 2 simultaneous drive failures.\n\nBACKUP STRATEGY — 3-2-1 RULE:\n• 3 copies of data\n• 2 different storage media types\n• 1 copy offsite (or cloud)\nExample: Original on laptop + external HDD backup + Google Drive cloud backup`
          },
          {
            type: "section", title: "Application Hardening",
            text: `Application Hardening = Reducing attack surface of an application by removing unnecessary features and fixing vulnerabilities.\n\n1. INPUT VALIDATION:\n• NEVER trust user input\n• Validate ALL input on server side (not just client side)\n• Use whitelist validation (only allow known good values)\n• Prevents: SQL injection, XSS, Buffer overflow\n\n2. PRINCIPLE OF LEAST PRIVILEGE:\n• Application runs with MINIMUM permissions needed\n• Web server shouldn't run as root/Administrator\n• Database user should only have SELECT permission if only reading\n\n3. ERROR HANDLING:\n• NEVER show detailed error messages to users\n• Attacker uses error messages to understand system structure\n• Log errors internally, show generic message to user\nBad: "SQL Error: table 'users' doesn't exist at line 47"\nGood: "An error occurred. Please try again."\n\n4. PATCH MANAGEMENT:\n• Keep all frameworks, libraries, and dependencies updated\n• Enable automatic security updates\n• Monitor CVE (Common Vulnerabilities and Exposures) for used libraries\n\n5. CODE SIGNING:\n• Digitally sign executable code\n• Users/OS verify signature before running\n• Prevents running tampered/malicious code\n\n6. OWASP TOP 10 (Most critical web app vulnerabilities):\n1. Broken Access Control\n2. Cryptographic Failures\n3. Injection (SQL, LDAP, XSS)\n4. Insecure Design\n5. Security Misconfiguration\n6. Vulnerable & Outdated Components\n7. Identification & Auth Failures\n8. Software & Data Integrity Failures\n9. Security Logging & Monitoring Failures\n10. Server-Side Request Forgery (SSRF)\n\n7. WEB APPLICATION FIREWALL (WAF):\n• Sits in front of web application\n• Filters malicious HTTP requests\n• Blocks common attacks (SQLi, XSS) automatically`
          },
          { type: "examtip", text: "SQL injection with actual query is very commonly asked. IT Act 2000 Sections (43, 65, 66, 67, 72) + IT Act 2008 Sections (66C identity theft, 66D phishing, 66F cyber terrorism) are important for 4-mark questions. Data recovery — deleted file recovery process + 3-2-1 backup rule. Application hardening — OWASP Top 10 list and input validation are asked." }
        ]
      }
    ]
  }
];

const quizBank = [
  { q: "What does CIA stand for in computer security?", a: "Confidentiality, Integrity, Availability", unit: 1 },
  { q: "Which attack makes a service unavailable to legitimate users?", a: "Denial of Service (DoS) attack. Example: SYN Flood — attacker sends fake SYN requests, filling the server's connection queue.", unit: 1 },
  { q: "What is the difference between a virus and a worm?", a: "Virus: needs a HOST file, spreads when host is executed. Worm: STANDALONE, self-replicates automatically through networks without needing a host.", unit: 1 },
  { q: "Name the 4 phases of a virus lifecycle.", a: "1. Dormant (idle, waiting) → 2. Propagation (copies itself) → 3. Triggering (event activates it) → 4. Execution (performs harmful action)", unit: 1 },
  { q: "What are the 3 factors of authentication?", a: "1. Something you KNOW (password, PIN) 2. Something you HAVE (token, smart card) 3. Something you ARE (biometrics — fingerprint, retina)", unit: 2 },
  { q: "What is the difference between DAC and MAC?", a: "DAC: Owner decides who can access (discretionary, flexible). MAC: System enforces based on security labels/clearance levels (mandatory, rigid — used in military).", unit: 2 },
  { q: "Encrypt 'HELLO' using Caesar cipher with shift 3.", a: "H→K, E→H, L→O, L→O, O→R → Cipher text = KHOOR. Formula: C = (P + K) mod 26", unit: 3 },
  { q: "What is steganography? How is it different from cryptography?", a: "Steganography hides the EXISTENCE of a message (inside another file like an image). Cryptography makes the message UNREADABLE but visible. Stego = invisible, Crypto = unreadable.", unit: 3 },
  { q: "Name the 5 steps of Rail Fence encryption technique.", a: "1. Write plain text in zigzag pattern across N rails. 2. Read each rail horizontally left to right. 3. Concatenate all rails → cipher text. (Decryption: reconstruct zigzag → read diagonally)", unit: 3 },
  { q: "What are the 4 types of firewalls?", a: "1. Packet Filter (checks headers, fastest) 2. Stateful Packet Filter (tracks connection state) 3. Application Gateway (deep inspection, Layer 7) 4. Circuit Gateway (session layer)", unit: 4 },
  { q: "What is DMZ and why is it used?", a: "DMZ (Demilitarized Zone) = neutral network between internet and internal network. Public servers (web, email) placed here. Layout: Internet→Firewall1→DMZ→Firewall2→Internal. Even if DMZ is breached, internal network is still protected.", unit: 4 },
  { q: "Explain Diffie-Hellman with p=23, g=5, a=6, b=15.", a: "Alice: A = 5^6 mod 23 = 8. Bob: B = 5^15 mod 23 = 19. Alice: K = 19^6 mod 23 = 2. Bob: K = 8^15 mod 23 = 2. Shared secret = 2!", unit: 4 },
  { q: "What does a Digital Signature provide?", a: "1. Authentication (proves who sent it) 2. Integrity (proves not modified) 3. Non-repudiation (sender can't deny sending). Process: Hash message → Encrypt hash with PRIVATE key → attach as signature.", unit: 4 },
  { q: "What is the difference between NIDS and HIDS?", a: "NIDS: monitors network traffic at network level, one system protects whole network, can't see encrypted content. HIDS: installed on individual host, sees everything on that machine including encrypted content, must install on every machine.", unit: 5 },
  { q: "Explain Kerberos 3 servers and their roles.", a: "AS (Authentication Server): verifies initial identity. TGS (Ticket Granting Server): issues service tickets. SS (Service Server): provides the actual service. Process: Login→AS→TGT→TGS→Service Ticket→SS→Access!", unit: 5 },
  { q: "What is SQL injection? Give an example.", a: "Inserting malicious SQL code in input fields. Example: username='admin' OR '1'='1' — makes the WHERE clause always TRUE, bypassing login. Prevention: Use prepared statements/parameterized queries.", unit: 5 },
];

/* ─────────────────────────────────────────────
   Collapsible Section wrapper
───────────────────────────────────────────── */
function Section({ title, color, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="block-section" style={{ borderColor: color }}>
      <div className="block-section-header" onClick={() => setOpen(o => !o)}>
        <div className="block-section-title" style={{ color }}>{title}</div>
        <span className={`block-section-chevron${open ? ' open' : ''}`}>▼</span>
      </div>
      {open && <div className="block-section-body">{children}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Render a content item
───────────────────────────────────────────── */
function RenderItem({ item, color }) {
  if (item.type === 'heading') return (
    <h2 className="block-heading" style={{ color, borderColor: color }}>{item.text}</h2>
  );
  if (item.type === 'para') return <p className="block-para">{item.text}</p>;
  if (item.type === 'section') return (
    <Section title={item.title} color={color}>
      <div className="block-section-text">{item.text}</div>
    </Section>
  );
  if (item.type === 'diagram') return (
    <div className="block-diagram">
      <div className="diagram-label">📊 Diagram</div>
      <div className="diagram-body" dangerouslySetInnerHTML={{ __html: item.svg }} />
    </div>
  );
  if (item.type === 'examtip') return (
    <div className="block-examtip">
      <span className="examtip-icon">💡</span>
      <div>
        <div className="examtip-label">EXAM TIP</div>
        <div className="examtip-text">{item.text}</div>
      </div>
    </div>
  );
  if (item.type === 'trick') return (
    <div className="block-trick">
      <span className="trick-icon">🧠</span>
      <div>
        <div className="trick-label">MEMORY TRICK</div>
        <div className="trick-text">{item.text}</div>
      </div>
    </div>
  );
  if (item.type === 'keypoint') return (
    <div className="block-keypoint">{item.text}</div>
  );
  if (item.type === 'table') return (
    <div className="block-table-wrap">
      <table className="block-table">
        <thead>
          <tr>{item.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {item.rows.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return null;
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function NISDeepGuide() {
  const [selUnit, setSelUnit]   = useState(0);
  const [selTopic, setSelTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [diffSearch, setDiffSearch] = useState('');
  const [qIdx, setQIdx]         = useState(0);
  const [showAns, setShowAns]   = useState(false);
  const [filter, setFilter]     = useState(0);
  const [dark, setDark]         = useState(() => localStorage.getItem('nis-dark') !== 'false');
  const [search, setSearch]     = useState('');
  const [score, setScore]       = useState({ c:0, w:0 });
  const [progress, setProgress] = useState(() => { try { return JSON.parse(localStorage.getItem('nis-prog')||'{}'); } catch { return {}; } });
  const topicBarRef = useRef(null);
  const contentRef  = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('nis-dark', dark);
  }, [dark]);

  // Mark topic as read + scroll active tab into view
  useEffect(() => {
    if (!showQuiz) {
      const key = `${selUnit}-${selTopic}`;
      if (!progress[key]) {
        const np = { ...progress, [key]: true };
        setProgress(np);
        localStorage.setItem('nis-prog', JSON.stringify(np));
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const bar = topicBarRef.current;
    if (bar) {
      const active = bar.querySelector('.topic-tab.active');
      if (active) active.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }, [selUnit, selTopic, showQuiz]);

  // Search
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    units.forEach((u, ui) => {
      u.topics.forEach((t, ti) => {
        const hit = t.title.toLowerCase().includes(q) ||
          t.content.some(c => (c.text||'').toLowerCase().includes(q) || (c.title||'').toLowerCase().includes(q));
        if (hit) out.push({ ui, ti, u, t });
      });
    });
    return out;
  }, [search]);

  const totalTopics = units.reduce((s, u) => s + u.topics.length, 0);
  const donePct = Math.round((Object.keys(progress).length / totalTopics) * 100);
  const unit = units[selUnit];
  const topic = unit.topics[selTopic];
  const filteredQ = filter === 0 ? quizBank : quizBank.filter(q => q.unit === filter);

  const filteredDiff = useMemo(() => {
    const q = diffSearch.trim().toLowerCase();
    if (!q) return differences;
    return differences.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.unit.toLowerCase().includes(q) ||
      d.rows.some(row => row.some(cell => cell.toLowerCase().includes(q)))
    );
  }, [diffSearch]);

  const goto = (ui, ti) => { setSelUnit(ui); setSelTopic(ti); setShowQuiz(false); setShowDiff(false); setSearch(''); };
  const prevTopic = () => {
    if (selTopic > 0) setSelTopic(s => s - 1);
    else if (selUnit > 0) { setSelUnit(u => u - 1); setSelTopic(units[selUnit - 1].topics.length - 1); }
  };
  const nextTopic = () => {
    if (selTopic < unit.topics.length - 1) setSelTopic(s => s + 1);
    else if (selUnit < units.length - 1) { setSelUnit(u => u + 1); setSelTopic(0); }
  };
  const isFirst = selUnit === 0 && selTopic === 0;
  const isLast  = selUnit === units.length - 1 && selTopic === unit.topics.length - 1;

  return (
    <div style={{ minHeight: '100svh' }}>

      {/* ── Row 1: Topbar ── */}
      <header className="topbar">
        <span className="topbar-logo">🛡️ NIS Guide</span>
        <div className="topbar-search" style={{ position: 'relative' }}>
          <span style={{ color: 'var(--txt3)', fontSize: '.9rem' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics…"
            onKeyDown={e => { if (e.key === 'Escape') setSearch(''); }}
          />
          {searchResults && (
            <div className="search-results">
              {searchResults.length === 0
                ? <div className="no-results">No results for "{search}"</div>
                : searchResults.map((r, i) => (
                  <div key={i} className="search-item" onClick={() => goto(r.ui, r.ti)}>
                    <div className="search-item-unit">{r.u.emoji} {r.u.title}</div>
                    <div className="search-item-title">{r.t.title}</div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
        <div className="topbar-right">
          <div className="progress-pill">
            <span>Progress</span>
            <div className="prog-bar"><div className="prog-fill" style={{ width: `${donePct}%` }} /></div>
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{donePct}%</span>
          </div>
          <button className="icon-btn" onClick={() => setDark(d => !d)} title="Toggle theme">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <nav className="unit-tabbar">
        {units.map((u, i) => (
          <button key={i}
            className={`unit-tab${selUnit === i && !showQuiz && !showDiff ? ' active' : ''}`}
            style={{ '--tab-color': u.color }}
            onClick={() => { setSelUnit(i); setSelTopic(0); setShowQuiz(false); setShowDiff(false); }}>
            {u.emoji} {u.title}
          </button>
        ))}
        <button className={`unit-tab${showQuiz ? ' active' : ''}`}
          style={{ '--tab-color': '#ffa940' }}
          onClick={() => { setShowQuiz(true); setShowDiff(false); }}>
          🎯 Quiz
        </button>
        <button className={`unit-tab${showDiff ? ' active' : ''}`}
          style={{ '--tab-color': '#00d4a7' }}
          onClick={() => { setShowDiff(true); setShowQuiz(false); }}>
          ⚖️ Differences
        </button>
      </nav>

      {/* ── Row 3: Topic Tabs (per unit) — hidden during quiz/diff ── */}
      {!showQuiz && !showDiff && (
        <div className="topic-tabbar" ref={topicBarRef}>
          {unit.topics.map((t, i) => {
            const done = !!progress[`${selUnit}-${i}`];
            const short = t.title.replace(/^\d+[\d.&\s—–-]+/,'').replace(/\s*[—–].*/,'').trim();
            return (
              <button key={i}
                className={`topic-tab${selTopic === i ? ' active' : ''}${done ? ' done' : ''}`}
                style={{ '--tab-color': unit.color }}
                onClick={() => setSelTopic(i)}>
                {done && selTopic !== i && <span className="tick">✓ </span>}
                {short}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Main Content ── */}
      <main className={`content-wrap${showQuiz || showDiff ? ' no-topic-bar' : ''}`}>
        {showDiff ? (
          <div className="anim-up">
            {/* Differences header */}
            <div className="content-card" style={{ marginBottom: 20 }}>
              <div className="card-header" style={{ background: 'linear-gradient(135deg,rgba(0,212,167,.12),rgba(0,212,167,.03))', borderBottom: '1px solid rgba(0,212,167,.25)' }}>
                <div className="card-header-label">
                  <span>⚖️</span>
                  <span>Difference Between — All Key Comparisons</span>
                  <span style={{ marginLeft:'auto', background:'rgba(0,212,167,.15)', color:'var(--green)', padding:'2px 10px', borderRadius:99, fontSize:'.68rem', fontWeight:700 }}>
                    {filteredDiff.length} tables
                  </span>
                </div>
                <h2 style={{ color:'var(--green)' }}>📊 Exam-Focused Difference Tables</h2>
                <p style={{ fontSize:'.83rem', color:'var(--txt2)', marginTop:8 }}>All comparison tables from the syllabus — most asked in MSBTE exams</p>
                {/* search */}
                <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8, background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:99, padding:'0 14px', height:36, maxWidth:340 }}>
                  <span style={{ color:'var(--txt3)' }}>🔍</span>
                  <input value={diffSearch} onChange={e => setDiffSearch(e.target.value)}
                    placeholder="Search differences…"
                    style={{ flex:1, background:'none', border:'none', outline:'none', color:'var(--txt)', fontSize:'.86rem', fontFamily:'var(--font)' }} />
                </div>
              </div>
            </div>
            {/* Filter pills */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
              {['All','Unit I','Unit II','Unit III','Unit IV','Unit V'].map((u,i) => (
                <button key={i} onClick={() => setDiffSearch(i===0 ? '' : u)}
                  style={{ padding:'5px 14px', borderRadius:99, fontSize:'.75rem', fontWeight:600,
                    cursor:'pointer', border:'1px solid var(--border2)', fontFamily:'var(--font)',
                    background: diffSearch===u||( i===0&&!diffSearch) ? 'var(--green)' : 'transparent',
                    color: diffSearch===u||(i===0&&!diffSearch) ? '#001a14' : 'var(--txt2)' }}>
                  {u}
                </button>
              ))}
            </div>
            {/* Tables */}
            {filteredDiff.map(d => (
              <div key={d.id} className="content-card" style={{ marginBottom:16 }}>
                <div className="card-header" style={{ padding:'14px 22px 12px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:'1.2rem' }}>{d.emoji}</span>
                    <div>
                      <div style={{ fontSize:'.68rem', color:'var(--green)', fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase', marginBottom:2 }}>{d.unit}</div>
                      <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--txt)' }}>{d.title}</div>
                    </div>
                  </div>
                </div>
                <div style={{ overflowX:'auto' }}>
                  <table className="block-table" style={{ minWidth:500 }}>
                    <thead>
                      <tr>{d.headers.map((h,i) => <th key={i} style={{ background:'rgba(0,212,167,.08)', color:'var(--green)' }}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {d.rows.map((row, ri) => (
                        <tr key={ri}>
                          <td style={{ fontWeight:700, color:'var(--txt2)', background:'var(--bg3)' }}>{row[0]}</td>
                          {row.slice(1).map((cell,ci) => <td key={ci}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {filteredDiff.length === 0 && (
              <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--txt3)' }}>
                <div style={{ fontSize:'2rem', marginBottom:8 }}>🔍</div>
                <div>No difference tables match "{diffSearch}"</div>
              </div>
            )}
          </div>
        ) : showQuiz ? (

          <div className="quiz-wrap anim-up">
            <div className="quiz-card">
              <div className="quiz-header">
                <h2>🎯 Exam Practice Quiz</h2>
                <p>Based on actual MSBTE model answer paper questions</p>
              </div>
              <div className="quiz-filters">
                {['All Units','Unit I','Unit II','Unit III','Unit IV','Unit V'].map((lbl, i) => (
                  <button key={i} className={`qf-btn${filter === i ? ' active' : ''}`}
                    onClick={() => { setFilter(i); setQIdx(0); setShowAns(false); }}>
                    {lbl}
                  </button>
                ))}
              </div>
              <div className="quiz-score">
                <span className="sc" style={{ color: 'var(--green)' }}>✅ {score.c}</span>
                <span className="sc" style={{ color: 'var(--red)' }}>❌ {score.w}</span>
                <span style={{ color: 'var(--txt3)' }}>Total: {score.c + score.w}</span>
                {(score.c + score.w) > 0 && (
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                    {Math.round(score.c / (score.c + score.w) * 100)}% accuracy
                  </span>
                )}
                <button onClick={() => setScore({ c: 0, w: 0 })}
                  style={{ marginLeft: 'auto', fontSize: '.72rem', color: 'var(--txt3)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Reset
                </button>
              </div>
              {filteredQ.length > 0 && (
                <div className="quiz-body">
                  <div className="quiz-counter">Question {qIdx + 1} of {filteredQ.length}</div>
                  <div className="quiz-q">{filteredQ[qIdx].q}</div>
                  {showAns && (
                    <div className="quiz-answer anim-up">
                      <div className="qa-label">✅ MODEL ANSWER</div>
                      <div className="qa-text">{filteredQ[qIdx].a}</div>
                    </div>
                  )}
                  <div className="quiz-btns">
                    {!showAns ? (
                      <button className="qb qb-show" onClick={() => setShowAns(true)}>Reveal Answer</button>
                    ) : (
                      <>
                        <button className="qb qb-ok"
                          onClick={() => { setScore(s => ({ ...s, c: s.c + 1 })); setQIdx(q => (q + 1) % filteredQ.length); setShowAns(false); }}>
                          ✅ Got it
                        </button>
                        <button className="qb qb-no"
                          onClick={() => { setScore(s => ({ ...s, w: s.w + 1 })); setQIdx(q => (q + 1) % filteredQ.length); setShowAns(false); }}>
                          ❌ Missed it
                        </button>
                      </>
                    )}
                    <button className="qb qb-rand"
                      onClick={() => { setQIdx(Math.floor(Math.random() * filteredQ.length)); setShowAns(false); }}>
                      🎲
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="anim-up">
            <div className="content-card">
              <div className="card-header"
                style={{ background: `linear-gradient(135deg,${unit.color}20,${unit.color}06)`, borderBottom: `1px solid ${unit.color}30` }}>
                <div className="card-header-label">
                  <span>{unit.emoji}</span>
                  <span>{unit.title} — {unit.subtitle}</span>
                  <span style={{ marginLeft: 'auto', background: unit.color + '22', color: unit.color, padding: '2px 10px', borderRadius: 99, fontSize: '.68rem', fontWeight: 700 }}>
                    {selTopic + 1} / {unit.topics.length}
                  </span>
                </div>
                <h2 style={{ color: unit.color }}>{topic.title}</h2>
              </div>
              <div className="card-body">
                {topic.content.map((item, i) => (
                  <RenderItem key={i} item={item} color={unit.color} />
                ))}
              </div>
              <div className="content-nav">
                <button className="nav-btn nav-btn-prev" onClick={prevTopic} disabled={isFirst}>← Previous</button>
                <div className="nav-pos">
                  <div style={{ fontWeight: 600, fontSize: '.8rem', color: unit.color }}>{unit.title}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--txt3)', marginTop: 2 }}>Topic {selTopic + 1} of {unit.topics.length}</div>
                </div>
                <button className="nav-btn nav-btn-next" onClick={nextTopic} disabled={isLast}
                  style={{ background: unit.color }}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}