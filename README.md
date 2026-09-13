# SingleCart • Next-Gen Virtual Mall Platform 🛍️

[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%26%20Auth-green.svg?style=flat-square&logo=supabase)](https://supabase.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black.svg?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square)](LICENSE)

**SingleCart** is a modern multi-tenant digital mall architecture that bridges the gap between single-vendor ordering systems and multi-store SaaS marketplaces. It enables customers to browse curated boutique storefronts with zero login friction, drop products from multiple independent merchants into a unified cart, and fulfill orders with real-time tracking.

---

## 🌟 3-Sided Ecosystem Architecture

```
                               ┌────────────────────────┐
                               │   SingleCart Platform   │
                               └───────────┬────────────┘
                ┌──────────────────────────┼──────────────────────────┐
                ▼                          ▼                          ▼
     ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
     │    Customer Mall    │    │  Retailer Operation │    │    Admin Command    │
     │  (Zero Auth / Free) │    │  (Store-Scoped Auth)│    │  (Master Governance)│
     └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### 1. 🛒 Customer Experience (`/mall`, `/store/:id`)
- **Multi-Store Unified Cart**: Collect items across multiple boutique shops and checkout in a single friction-free transaction.
- **Real-Time Live Order Tracker**: Visual 4-stage pipeline stepper (`Pending` ➔ `Preparing` ➔ `Ready` ➔ `Completed`).
- **Customer Order History Lookup**: Instant access to previous receipts and fulfillment statuses via phone number without requiring account registration.
- **Canvas Digital Receipt**: Generates and downloads high-resolution PNG order summaries directly from the browser.
- **Boutique Catalog & Product Zoom**: Rich product showcase with high-res zoom, verified merchant badges, category filtering, and interactive wishlist.

### 2. 🏪 Retailer Operations Center (`/retailer`)
- **Store-Scoped Theme Isolation**: Dedicated dark/light preferences persisted strictly per individual `shop.id`, preventing theme bleed across merchants.
- **Live Orders Feed**: Real-time incoming order notifications with sound alerts and one-click status transitions.
- **Interactive Catalog Management**: Add, modify, toggle stock availability, and delete products with category dropdown selectors.
- **Custom Store Branding**: Configurable shop banner cover photos, contact details, and location notes.

### 3. 👑 Global Admin Command Center (`/admin`)
- **Automated Tenant Provisioning**: Onboard new stores, generate secure credentials, and dispatch automated welcome emails via EmailJS.
- **Real-Time Revenue Analytics**: Live mall Gross Merchandise Value (GMV), active storefront count, order volume, and Average Ticket Size calculations.
- **Order History & Archive**: Searchable global audit log with multi-factor date filtering and soft/hard record deletion capabilities.
- **Direct Store Access & Controls**: Preview and manage any tenant catalog directly from the administration dashboard.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (`react-scripts`) |
| **Routing & Navigation** | React Router DOM v6 |
| **Icons & Micro-Interactions** | Lucide React |
| **Styling & Design System** | Modular Vanilla CSS (Light & Obsidian Dark Modes, CSS Grid & Flexbox, Fluid Typography) |
| **Backend & Database** | Supabase (PostgreSQL, Realtime WebSockets, Row Level Security) |
| **Notification Engine** | EmailJS REST API for merchant provisioning alerts |
| **Deployment** | Vercel (Continuous Deployment linked to GitHub `main`) |

---

## 🗄️ Database Architecture & Security Model

SingleCart is powered by **Supabase PostgreSQL** designed around multi-tenant isolation and strict Row Level Security (RLS):
- **Core Entities**: Partitioned into `profiles` (merchants & administrators), `products` (storefront catalogs), and `orders` (per-merchant routed transactions).
- **Row Level Security (RLS)**: Enforces public catalog discovery while strictly restricting order management and catalog mutations to authenticated store managers.
- **SQL Migration Script**: Complete production DDL schema and security policies are maintained in [`supabase/schema.sql`](supabase/schema.sql).

### Hybrid Persistence Engine
SingleCart implements an offline-first hybrid synchronization layer:
- Operates in full cloud-connected mode when Supabase credentials are configured.
- Automatically falls back to resilient `localStorage` state with optimistic UI updates when operating offline or during evaluation without external credentials.

---

## 🚀 Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/AbdullahZafar9/SingleCart.git
cd SingleCart
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_EMAILJS_SERVICE_ID=your-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-public-key
```

### 3. Launch Development Server
```bash
npm start
```
The application will launch at `http://localhost:3000`.

---

## 🔑 Evaluation & Demo Credentials

Recruiters and evaluators can test each portal using the following pre-configured credentials:

| Portal | Route | Role / Identity | Password |
| :--- | :--- | :--- | :--- |
| **Welcome / Customer Mall** | `/` or `/mall` | Frictionless Shopper | *No login needed* |
| **Retailer Operations** | `/retailer` | Store Manager (`aura@singlecart.com`) | `store123` |
| **Admin Command Center** | `/admin` | Global Administrator (`admin@singlecart.com`) | `12345678` |

---

## 📱 Mobile & Desktop Responsiveness
- **Mobile First**: Dynamic viewport scaling, full-width touch drawers, responsive category filter chips with invisible horizontal momentum scrolling, and touch-optimized action targets (>= 44px).
- **Laptop & Desktop**: Centered max-width containers, multi-column product grids, real-time analytics side panels, and keyboard accessibility.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
