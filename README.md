<div align="center">

<img src="./src/assets/propvistabooking-icon.svg" alt="Propvista Architectural Mark" width="72" height="72" />

# Propvista

**Luxury Property Discovery & Private Viewing Appointment Platform**

Curating architectural residences and private viewings with understated precision. Buyers and renters explore verified properties, save curated shortlists, and reserve real-time viewing windows directly with listing advisors — while partner agencies manage their portfolios, viewing calendars, and client appointments in one unified workspace.

[**Live Demo**](https://propvista-gilt.vercel.app/)

</div>

---

## ✨ Overview

**Propvista** removes the friction of traditional real estate inquiries by connecting discerning clients directly to verified listing advisors and their published viewing calendars. Rather than waiting on unreturned calls or back-and-forth scheduling, prospective buyers and renters can evaluate residences with clear architectural photography, transparent guide pricing, and real-time slot availability.

---

## 🚀 Key Features

### Client Experience (User Portal)
- **Unified Property Discovery:** Browse verified residences with multi-criteria filtering across **Location**, **Property Type** (`Apartment`, `Duplex`, `Bungalow`, `Commercial`, `Land`), **Price Range** (`₦`), **Minimum Bedrooms**, and architectural style categories (`Architectural`, `Waterfront`, `Penthouse`, `Garden Villa`, `New Build`).
- **Editorial Property Detail View:** Bento-style architectural photo gallery with full-screen lightbox viewer, specification highlights, and published viewing windows.
- **Direct Viewing Slot Reservation:** Interactive date and time-slot selector that books directly against the listing advisor's published availability.
- **Saved Residences Shortlist:** Persistent bookmarking of favorite properties (`localStorage`-backed with instant badge counters and dedicated `/saved` view).
- **Direct Advisor Channels:** Verified listing agent credentials with one-tap telephone and email contact options.

### Partner Agency Suite (Agent Portal)
- **Portfolio Management:** Publish new architectural listings with high-resolution imagery, guide pricing, bedroom counts, and custom viewing dates/time slots.
- **Dynamic Viewing Calendars:** Configure multiple viewing dates and granular time slots per property, and update residence specifications at any time.
- **Appointment Decision Workflow:** Review incoming client viewing requests with client contact details and notes, and **Confirm** or **Decline** appointments with automated email notifications via **Resend**.
- **Portfolio Analytics & Advisor Profile:** Track active listings, total viewing requests, confirmed tours, and pending actions in real time.

---

## 🎨 Design System & Brand Direction

### 1. Color Palette — *Warm Architectural Minimalism*
| Token | Hex | Role |
| :--- | :--- | :--- |
| `--bg-primary` | `#F9F8F6` | Warm Alabaster / Stone primary canvas |
| `--bg-secondary` | `#F1EFEA` | Soft Travertine secondary surfaces & filter containers |
| `--bg-surface` | `#FFFFFF` | Pure White elevated cards & modals |
| `--bg-dark` | `#161817` | Obsidian Charcoal hero, auth split panels & footer |
| `--text-primary` | `#1A1A1A` | Deep Charcoal primary typography |
| `--text-secondary` | `#5C5C58` | Warm Slate supporting copy & metadata |
| `--text-muted` | `#8F8E88` | Muted Stone captions, labels & placeholders |
| `--accent-primary` | `#1E3A34` | Deep Architectural Cypress primary CTAs & active states |
| `--accent-hover` | `#142824` | Darkened Cypress hover state |
| `--badge-featured` | `#C86D51` | Warm Terracotta featured badges & primary accents |
| `--status-available` | `#2E7D32` | Botanical Green availability & confirmation status |
| `--border-warm` | `#E4E2DC` | Warm hairline dividers & card borders |

### 2. Typography
- **Fraunces (`--font-serif`):** Used for headings, property titles, hero headlines, brand wordmark, and editorial text (`font-weight: 400–600`, subtle negative letter-spacing `-0.025em` to `-0.015em`).
- **Inter (`--font-sans`):** Used for body copy, navigation, buttons, form controls, micro-badges, and numerical information (`font-weight: 400–600`).
- **Tabular Numerals (`tabular-nums`):** Enforced on all property prices, bedroom counts, dates, time slots, and analytics counters for clean vertical alignment.

### 3. Animations & Micro-Interactions (`Framer Motion`)
- **Page Transitions:** Smooth fade and vertical slide transitions across routes via `AnimatePresence` and `PageTransition`.
- **Hero Stagger:** Staggered entrance for hero headlines, subcopy, and glassmorphic search controls.
- **Property Cards:** Scroll-triggered fade-in (`whileInView`), subtle hover elevation, smooth image scaling, and tactile favorite heart animations.
- **Interactive Controls:** Sliding active navigation underlines and category pills (`layoutId`), animated mobile drawers, lightbox/modal transitions, and animated booking date/time selection states.
- **Accessibility:** Respects `prefers-reduced-motion` globally via `<MotionConfig reducedMotion="user">`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router v7, Tailwind CSS v4, Framer Motion |
| **Forms & Validation** | React Hook Form, Yup, `@hookform/resolvers` |
| **UI & Feedback** | Lucide React Icons, React Modal, Sonner Toast Notifications |
| **Backend & Database** | Node.js, Express.js, MongoDB (MERN Stack) |
| **Transactional Email** | Resend |

---

## 📂 Project Structure

```text
PropVista Application/
├── index.html                      # Google Fonts (Fraunces & Inter) & root mount
├── package.json                    # Scripts and dependencies
├── vite.config.js                  # Vite + Tailwind v4 configuration
├── vercel.json                     # SPA routing configuration for Vercel
└── src/
    ├── App.jsx                     # Route definitions, providers & AnimatePresence
    ├── index.css                   # Design tokens, typography scale & base utilities
    ├── main.jsx                    # Application entry point
    ├── AgentAuthPage/              # Partner Advisor Sign In & Registration
    │   ├── SignIn.jsx
    │   └── Signup.jsx
    ├── AuthPages/                  # Client Sign In & Registration
    │   ├── SignInPage.jsx
    │   └── SignupPage.jsx
    ├── Common/                     # Shared layout & brand components
    │   ├── AdminHeader.jsx
    │   ├── DashboardFooter.jsx
    │   ├── Header.jsx
    │   ├── PageTransition.jsx
    │   ├── PropvistaLogo.jsx
    │   └── ScrollToTop.jsx
    ├── Components/                 # Core feature & editorial UI components
    │   ├── AgentMatch.jsx
    │   ├── AppointmentBookData.jsx
    │   ├── FeaturedText.jsx
    │   ├── HeroSection.jsx
    │   ├── PropertyCard.jsx
    │   ├── PropertyDetail.jsx
    │   ├── TimeSlotsInput.jsx
    │   ├── UpdateProperty.jsx
    │   └── WhatWeOffer.jsx
    ├── Contexts/                   # State & API integration providers
    │   ├── AgentAuthContext.jsx
    │   ├── AppointmentContext.jsx
    │   ├── PropertyContext.jsx
    │   └── UserAuthContext.jsx
    ├── Dashboard/                  # User & Advisor dashboard views
    │   ├── AgentDashboard.jsx
    │   ├── AgentProperties.jsx
    │   ├── Sidebar.jsx
    │   └── UserDashboard.jsx
    ├── Pages/                      # Top-level route pages
    │   ├── AboutUs.jsx
    │   ├── AllPropperties.jsx
    │   ├── PostProperty.jsx
    │   └── SinglePropertyPage.jsx
    ├── ProtectedPage/              # Route authentication guards
    │   ├── AgentProtected.jsx
    │   └── ProtectedRoute.jsx
    └── utils/                      # Filtering & animation helpers
        ├── motion.js
        └── propertyFilter.js
```

---

## 🧭 Application Routes

| Path | Access | Description |
| :--- | :--- | :--- |
| `/signin` | Public | Client sign-in page |
| `/signup` | Public | Client registration page |
| `/` | Client Protected | Home discovery experience, hero search & featured residences |
| `/properties` | Client Protected | Unified property directory with 4-filter bar & category pills |
| `/saved` | Client Protected | Personal shortlist of bookmarked residences |
| `/single/:id` | Client Protected | Residence detail gallery, specifications & private viewing booking |
| `/about` | Client Protected | Editorial philosophy, platform metrics & foundational principles |
| `/agent/signin` | Public | Partner advisor sign-in portal |
| `/agent/signup` | Public | Partner advisor & agency onboarding |
| `/dashboard` | Agent Protected | Advisor workspace: residences, viewings table, analytics & profile |
| `/post-job` | Agent Protected | Publish a new residence with photography & viewing windows |
| `/property/update/:propertyId` | Agent Protected | Edit existing residence details, pricing & viewing availability |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/Emmanuel3080/propvista.git
cd "PropVista Application"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure the backend API base URL:

```env
VITE_API_URL=https://your-backend-api-url.com/api
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📄 License

Distributed under the **MIT License**.

---

## 📬 Contact

**EmmyCodes** — Full Stack Developer  
- **GitHub:** [https://github.com/Emmanuel3080](https://github.com/Emmanuel3080)  
- **Email:** [emmanuelabiodun041@gmail.com](mailto:emmanuelabiodun041@gmail.com)
- **Live Application:** [https://propvista-gilt.vercel.app/](https://propvista-gilt.vercel.app/)
