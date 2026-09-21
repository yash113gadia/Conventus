// Knowledge base for the Conventus chatbot. Edit this file to improve answers —
// it is injected into the system prompt of pages/api/chat.js on every request.

const CONVENTUS_CONTEXT = `
ABOUT CONVENTUS
- Conventus is the official Model United Nations (MUN) Society of NIET (Noida Institute of Engineering and Technology), Greater Noida.
- Motto: "Negatio · Solutio · Actio".
- It is a student-run forum for diplomacy, debate, negotiation, public speaking, and global affairs. The club organizes MUN conferences, debates, public-speaking competitions, and literary initiatives.

LOCATION & CONTACT
- Address: NIET, Plot 19, Institutional Area, Knowledge Park II, Greater Noida, Uttar Pradesh 201306, India.
- Email: conventus@niet.co.in
- Contact page on the website: /ContactForm
- Instagram: @niet_conventus | LinkedIn: niet-conventus | Linktree: linktr.ee/conventusclub

EVENTS / CONFERENCES
- CMUN 1.0 (Conventus MUN, first edition) — the club's inaugural Model UN conference. Info at /mun1.0.
- CMUN 2.0 (Conventus MUN 2025, second edition) — held in March 2025 and has officially concluded ("session adjourned"). Recap, gallery, winners and details at /mun2.0.
- CMUN Connect ("Voices United Online") has concluded. Its closing communiqué, committee overview, and event gallery are at /cmun-connect.

COMMITTEES (at CMUN Connect)
- DISEC — Disarmament & International Security Committee (UNGA First Committee; global security and disarmament).
- UNHRC — United Nations Human Rights Council (human rights and civil liberties).
- UNCSW — Commission on the Status of Women (gender equality and women's rights).
- AIPPM — All India Political Parties Meet (Indian domestic politics and policy).

REGISTRATION
- CMUN Connect registration is closed because the conference has concluded. Do not direct visitors to a registration form.
- Future conference opportunities will be announced on /upcomingevents and the official Conventus social channels.

PEOPLE
- Founder: Manas Gupta (Founder President).
- Student leadership: President — Deepanjali Sharma; Vice Presidents — Yash Gadia, Rachit Sai Sheelwant and Gouri Saxena; Head Coordinators — Ankur Mehrotra and Ashkand Mishra.
- Technical team: Sarvesh Mishra (Technical Head), Yash Gadia (Technical Co-Head).
- The club is mentored by NIET faculty under the office of the Dean of Student Welfare.

WEBSITE MAP (useful links)
- Home: / | About: /aboutus | Committees: /commnew | Media gallery: /media | Contact: /ContactForm
- MUN: /mun2.0, /mun1.0, Diplomatic Resources: /Resources, Newsletter: /news
- Club: Ink & Insights /ink&insights, Past Events /pastevents, Upcoming Events /upcomingevents, Founder /founder
- CMUN Connect recap and gallery: /cmun-connect
`;

export default CONVENTUS_CONTEXT;
