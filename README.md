# RRR Centre (Reduce, Reuse, Recycle) - Butibori Nagar Parishad

A mobile-first, multilingual civic web application built in partnership with **Butibori Nagar Parishad** (Nagpur District, Maharashtra) to raise awareness about waste segregation and allow citizens to donate or sell reusable and recyclable items.

---

## 🌟 Key Features

1. **Multilingual Architecture (Marathi, Hindi, English)**:
   - Fully externalized dictionaries in `src/locales/mr.json`, `src/locales/hi.json`, and `src/locales/en.json`.
   - Defaults to Marathi (`mr`) for local Butibori community resonance, with persistent language selection stored in `localStorage`.
   - Zero hardcoded text in components.

2. **Mobile-First & High Accessibility (WCAG AA)**:
   - Designed for low-end Android smartphones and 2G/3G mobile data.
   - Touch targets $\ge 48\text{px}$, high-contrast text against friendly civic green and blue tones, explicit focus rings, and full keyboard navigation.
   - Sticky bottom navigation bar on mobile viewports for one-thumb reachability.

3. **Waste Segregation & Safety Awareness**:
   - Two-bin system explanation (Wet Waste / *Geela Kachra* vs. Dry Waste / *Sookha Kachra*).
   - Prominent notice that wet waste is processed into agricultural compost and is **not accepted** for donation.
   - Visual category cards for paper, cardboard, glass, metal, plastic, cloth, e-waste, and household items.
   - High-priority safety warnings for domestic hazardous items (batteries, CFL bulbs, expired medicines, paint) which must never go in normal bins or be burned.

4. **Real-time Saturday Collection Schedule**:
   - Two official drop-off counters:
     1. **Butibori Nagar Parishad Office** (Ground floor civic desk)
     2. **Government College of Engineering, Nagpur (GCOE)** (Sector 27, MIDC)
   - Real-time status detection identifying whether today is Saturday between 10:00 AM and 5:00 PM, plus automatic calculation of the next upcoming Saturday collection date.

5. **Community Circular Economy (Donate, Sell & Marketplace)**:
   - Controlled donation/sales form with client-side canvas photo compression (< 2 MB) to prevent data overhead.
   - Unique reference code generation (e.g. `RRR-BTR-2026-XXXX`) with Saturday drop-off instructions.
   - Filterable marketplace with category, condition, price slider, and "Free / Donation Only" toggle.
   - Item enquiry dialog with controlled validation.

6. **Environmental Impact & Local Green Jobs**:
   - Clear comparative analysis of the fate of waste (Open Dumping vs. Landfill vs. Recycling vs. Reuse vs. Composting) on soil, air, and groundwater.
   - Verified metric boxes with strict `[Insert verified figure, source: ___]` placeholders (no invented numbers).
   - Dedicated local employment section prioritizing Butibori residents (sorting staff, transport helpers, refurbishing artisans, marketplace coordinators, awareness volunteers, centre supervisors) with a direct application form.

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### Steps
1. Open terminal in the project directory:
   ```bash
   cd "cep project"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```
5. To test production build and preview:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📋 Stage Implementation Status

| Stage | Status | Details |
|---|---|---|
| **Stage 1: Static Front End** | ✅ Complete | Home page (hero, 3 large action buttons, community benefits, wet-waste notice), Segregation guide (wet vs dry, visual category cards, hazardous warning), Collection Points (2 locations, live Saturday status, map placeholders, directions), Header with persistent Language Switcher, Sticky mobile bottom navigation, and civic Footer. |
| **Stage 2: Forms & Directory** | ✅ Complete | Donate or Sell form with validation, client-side canvas photo compressor (< 2MB), reference number generator, Marketplace with multi-attribute filtering & enquiry modal, General Contact form with subject dropdown, and Job Interest form. |
| **Stage 3: Impact & Employment** | ✅ Complete | "What happens to our waste?" side-by-side pathway cards with soil/air/water effects, Community benefits, verified statistic placeholders (`[Insert verified figure, source: ___]`), and Local Green Employment section with direct application form. |
| **Stages 4 & 5: Extension Points** | ✅ Prepared | Abstracted Data Service interface (`src/data/storage.js`), Route Guard stub (`src/components/RouteGuard.jsx`), and Admin Operations portal placeholder (`/admin`) displaying live local session activity counts. |

---

## 🛠️ TODO List for Backend Work (Stages 4 & 5)

The local data service (`src/data/storage.js`) contains explicit `// TODO: Connect backend ...` markers for backend integration:

1. **Authentication & Authorization**:
   - Replace `src/components/RouteGuard.jsx` stub with JWT or OAuth2 session authentication.
   - Implement role-based access control (`citizen`, `nagarpalika_staff`, `supervisor`, `admin`).

2. **REST / GraphQL API Endpoints**:
   - `POST /api/v1/donations` - Save new donation/sale listings and generate server-validated reference IDs.
   - `GET /api/v1/marketplace` - Fetch approved active listings with server-side pagination, search, and category filtering.
   - `POST /api/v1/enquiries` - Log customer interest in items and notify collection desk volunteers.
   - `POST /api/v1/contact-messages` - Record general citizen queries.
   - `POST /api/v1/job-applications` - Store local employment and volunteer applications.

3. **Cloud Asset Storage**:
   - Upload compressed images directly to S3 / Cloudflare R2 / Google Cloud Storage with server-side validation and sanitization.

4. **SMS & WhatsApp Civic Notifications**:
   - Send confirmation SMS to donors with their Saturday collection slot and reference code via government SMS gateway or Twilio.

5. **Municipal Admin & Inventory Dashboard**:
   - Barcode/QR scanning counter at Butibori Nagar Parishad and GCOE collection desks to verify incoming items on Saturdays.

---

## 💡 Decisions Differing from or Clarifying the Brief

1. **Primary Language Default**:
   - Set default language to Marathi (`mr`) because Butibori is situated in the Nagpur district of Maharashtra. Hindi (`hi`) and English (`en`) are one-tap switchable in the header.
2. **Real-time Saturday Calculation**:
   - Built an automated helper (`getCollectionScheduleStatus`) that checks if the user is visiting on a Saturday between 10:00 AM and 5:00 PM, giving immediate real-time feedback and calculating the exact date of the next Saturday drop-off.
3. **Tabbed Contact & Job Portal**:
   - Integrated both the General Contact Form and the Job Interest Form into a single accessible interface on `/contact` with distinct tabs, while also providing a direct deep link from the Impact page.
4. **Client-side Canvas Image Compression**:
   - Implemented an in-browser HTML5 Canvas resizer in `src/utils/imageCompressor.js` to ensure image files stay well under 2 MB before storage, preventing heavy memory and network usage on entry-level Android devices.
