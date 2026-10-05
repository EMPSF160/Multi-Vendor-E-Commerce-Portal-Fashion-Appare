# AURA LUXE — Multi-Vendor Luxury Fashion & Apparel Platform (FARFETCH Inspired)

A modern, full-stack ready SaaS Multi-Vendor E-Commerce Portal for Luxury Fashion & Apparel inspired by **FARFETCH**. Features high-fashion editorial aesthetics, multi-vendor boutique fulfillment, role-based access control (RBAC), multi-currency conversion, live shipment milestone tracking, and full export tools.

---

## 🌟 Key Architecture & Highlights

- **5 Core Client Pages**:
  1. **01. Home**: Editorial hero slider, designer brands marquee, curated categories, trending runway highlights, partner boutiques spotlight, and VIP private client offers.
  2. **02. Shop / Products**: Full catalog with multi-faceted filtering (Boutique, Category, Brand, Price Range, In-Stock, Rating), live search query autocomplete, sorting, view switchers (4-col, 3-col, List), wishlist toggles, and Quick View modals.
  3. **03. Product Details**: Multi-image high-resolution gallery, international size selector with conversion modal, color swatches, stock alerts, direct boutique partner info card, collapsible accordions (Composition, Shipping & Duties, Authenticity NFC), and verified client reviews with submission form.
  4. **04. Cart & Checkout**: Multi-vendor item grouping by boutique, coupon discount engine (`LUXURY2026`, `FARFETCH10`), address manager, express courier SLAs (DHL Express, FedEx, White Glove Concierge), encrypted payment simulators (Credit Card, UPI QR, NetBanking, COD), order breakdown, and instant order creation with celebration confetti.
  5. **05. Account**: VIP client tier badge (FARFETCH Private Client), live interactive order tracking timeline with milestone stages (Placed → Boutique Dispatched → Customs Clearance → Out for Delivery → Delivered), invoice PDF generator, saved addresses, payment cards, and security settings.

- **2 Dedicated SaaS Dashboards**:
  1. **Vendor Boutique Portal**:
     - Gross Boutique Sales & Available Escrow Balance
     - Products Catalog Management (Add / Edit / Delete Runway Pieces with multi-images, SKU, sizes, stock)
     - Orders Pipeline with shipment status update & carrier tracking
     - VIP Boutique Client Directory
     - Earnings & Wire Payout Request Modal
     - Automated CSV & JSON Export Tools
     - Storefront Branding & Shipping SLA Settings
  2. **Global Admin Suite**:
     - Platform GMV & Commission Revenue Analytics
     - Vendor Moderation (Approve, Suspend, Adjust Commission Take Rates)
     - Product Catalog Moderation & Homepage Featured Toggles
     - Platform-wide Orders & Escrow Settlement
     - Customer Lifetime Value (LTV) Directory
     - Sales & Geographic Fulfillment Hub Analytics
     - Audit Data Export (CSV & JSON)
     - **Client Access Control & RBAC Matrix** (Super Admin, Vendor Partner, VIP Client permissions)
     - Global Announcement Ticker & Currency System Settings

- **Authentication & RBAC Simulation**:
  - Sign In, Register (as Customer or Vendor Boutique), and Forgot Password.
  - Quick 1-Click Persona Switcher directly from the top navigation bar.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🔑 Demo Personas & Quick Switch
You can switch roles anytime using the top navigation bar dropdown or the Auth modal:
- **VIP Customer**: Sophia Laurent (`sophia.laurent@luxury-client.com`)
- **Vendor Partner**: Jean-Paul Gautier / Atelier Montaigne Paris (`manager@atelier-montaigne.paris`)
- **Platform Super Admin**: Alexander Vance (`alexander.vance@auraluxe.com`)
