# BLI product-first commerce redesign implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive React/Vite implementation of the approved Concept 2 BLI homepage and core commerce interactions using verified BLI content, local source assets, and a clear product-plus-quote path.

**Architecture:** Use a small client-side React app with route-aware views for Home, Products, and Product Detail. Keep product/category data in one typed data module, reusable UI in focused components, and the visual system in one CSS token layer. Use local BLI assets from the captured research bundle; use no remote image dependency for the primary UI.

**Tech Stack:** React 19, Vite 7, plain CSS with custom properties, Lucide React icons, Vitest for data/UI smoke tests, and Playwright-compatible browser verification through the Codex browser tab.

---

### Task 1: Create the runnable app shell

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/styles.css`

- [ ] **Step 1: Define the package scripts and dependencies**

Use `dev`, `build`, `preview`, and `test` scripts with React, Vite, Lucide React, and Vitest dependencies.

- [ ] **Step 2: Create the Vite entry document**

Create the root element, document title, viewport metadata, and a preload for the local logo asset.

- [ ] **Step 3: Mount the React application**

Render the application into `#root`, import global styles, and enable strict mode.

- [ ] **Step 4: Add the visual token layer**

Define BLI red, BLI blue, ink, muted ink, cool background, border, spacing, shadows, type scale, container widths, button states, reduced motion rules, and responsive breakpoints.

- [ ] **Step 5: Run the initial build**

Run `npm install` and `npm run build`. Expected: Vite completes without errors.

### Task 2: Add verified BLI data and local assets

**Files:**
- Create: `src/data/products.js`
- Create: `src/data/categories.js`
- Create: `src/data/site.js`
- Create: `public/assets/logo.jpg`
- Create: `public/assets/hero.jpg`
- Create: `public/assets/products/*`
- Create: `public/assets/categories/*`
- Create: `public/assets/clients/*`

- [ ] **Step 1: Copy selected real assets**

Copy the captured BLI logo, one verified hero image, category imagery, and product imagery from `research/bli-assets` into public asset folders. Keep the original source manifest in `research/bli-assets/manifest.json`.

- [ ] **Step 2: Define product records**

Use verified products and prices from the live site: CP PLUS E39A, Hikvision dome camera, EZVIZ H3C, Agni 8 Zone Fire Alarm Panel, Mantra mBio-G1, and representative PABX/access-control products. Include category, brand, model, price, image, short specs, and quote eligibility.

- [ ] **Step 3: Define category records**

Use the verified product families: CCTV & Cameras, Fire Alarm Systems, Access Control, Time Attendance, PABX & Communication, Networking, and Smart Locks. Keep descriptions short and product-focused.

- [ ] **Step 4: Define site content**

Store phone, email, Sanepa address, verified support/service claims, brand names visible in the catalogue, and the approved homepage copy.

- [ ] **Step 5: Add data smoke tests**

Verify every featured product has an image, price, brand, model, and category, and that every category has at least one product.

### Task 3: Build reusable commerce components

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/MegaMenu.jsx`
- Create: `src/components/SearchBar.jsx`
- Create: `src/components/CategoryCard.jsx`
- Create: `src/components/ProductCard.jsx`
- Create: `src/components/BrandStrip.jsx`
- Create: `src/components/QuoteModal.jsx`
- Create: `src/components/CartDrawer.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Build the header**

Implement the logo, prominent search input, account/wishlist/cart utility buttons, category menu trigger, primary category links, and responsive mobile navigation.

- [ ] **Step 2: Build the category and product cards**

Product cards must show image, brand/model, verified short specs, price, availability state, `Buy now`, and `Request quote`. Keep buttons accessible and prevent long names from breaking the grid.

- [ ] **Step 3: Build the quote modal**

Collect name, company, phone, email, industry, requirement, quantity, and message. Show the selected product when launched from a card or detail view. The form is UI-only until a backend is confirmed.

- [ ] **Step 4: Build the cart drawer**

Support add, increment, decrement, remove, subtotal, and a `Request a quote` action. Do not imply checkout exists.

- [ ] **Step 5: Build the footer**

Use verified BLI contact information, product families, support links, and a quote CTA without invented claims.

### Task 4: Build the approved homepage

**Files:**
- Create: `src/pages/HomePage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Build the search-led hero**

Use the approved message `CCTV, Fire Alarm, Access Control & More at BLI`, the BLI subline, real product imagery, and `Shop products` plus `Request a quote` actions.

- [ ] **Step 2: Add popular categories**

Render six product family cards with real category imagery and links into product filtering.

- [ ] **Step 3: Add featured product discovery**

Render a filter-tab row and five featured products with compare controls, prices, stock state, buy and quote actions.

- [ ] **Step 4: Add brands and installation support**

Render CP PLUS, Hikvision, EZVIZ, and Agni brand proof plus the verified installation-support message.

- [ ] **Step 5: Add responsive mobile sections**

Collapse the desktop navigation, reduce card columns, preserve product actions, and keep the quote CTA reachable without an oversized hero.

### Task 5: Build product listing and product detail views

**Files:**
- Create: `src/pages/ProductsPage.jsx`
- Create: `src/pages/ProductDetailPage.jsx`
- Create: `src/components/ProductFilters.jsx`

- [ ] **Step 1: Build product listing filters**

Support category, brand, price range, and text search filters with visible result count and a mobile drawer layout.

- [ ] **Step 2: Build product detail layout**

Include gallery, breadcrumb, brand/model, price, top selling points, quote/call actions, specification table, description, features, related products, and support note.

- [ ] **Step 3: Connect product links and browser routes**

Use `location.pathname` and `URLSearchParams` so the app works at `/`, `/products`, and `/product/<slug>` without a router dependency.

- [ ] **Step 4: Add empty and error states**

Show a clear zero-result state with a reset action and a missing-product state with a products link.

### Task 6: Add interaction state and accessibility behavior

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/QuoteModal.jsx`
- Modify: `src/components/CartDrawer.jsx`

- [ ] **Step 1: Add shared UI state**

Manage mobile menu, mega menu, active search, quote modal, cart drawer, compare selection, and toast feedback at the app layer.

- [ ] **Step 2: Add keyboard and focus handling**

Support Escape to close overlays, visible focus rings, labelled form fields, and focus-safe modal/drawer behavior.

- [ ] **Step 3: Add reduced-motion behavior**

Disable nonessential transitions and reveal effects when `prefers-reduced-motion: reduce` is active.

- [ ] **Step 4: Add interaction tests**

Test product filtering, add-to-cart, quote modal opening, and mobile menu toggling.

### Task 7: Verify and polish in the browser

**Files:**
- Modify: `src/styles.css`
- Modify: any component that fails browser verification

- [ ] **Step 1: Run unit tests**

Run `npm test -- --run`. Expected: all data and interaction smoke tests pass.

- [ ] **Step 2: Run production build**

Run `npm run build`. Expected: Vite completes with exit code 0.

- [ ] **Step 3: Start the preview server**

Run `npm run dev -- --host 0.0.0.0` and open the local URL in the Codex browser.

- [ ] **Step 4: Verify desktop routes**

Check homepage hierarchy, search, filters, product detail, quote modal, cart drawer, footer links, and no overflow at the browser viewport.

- [ ] **Step 5: Verify mobile behavior**

Use a mobile viewport to check navigation, category cards, product cards, filters, detail tabs, quote form, and fixed action reachability.

- [ ] **Step 6: Capture final screenshots**

Capture homepage, products, product detail, quote modal, and mobile navigation screenshots for review.

