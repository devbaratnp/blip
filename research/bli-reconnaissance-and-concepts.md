# Bhagya Laxmi International website reconnaissance and concept review

Date: 30 September 2026

Scope: read-only inspection of the live BLI website, asset capture, UX/CRO audit, revised information architecture, and three homepage concepts. No implementation code was started.

## Research record

Inspected from the open Codex browser tab and direct page reads:

- [Homepage](https://www.bli.com.np/home)
- [Company](https://www.bli.com.np/company)
- [About Us](https://www.bli.com.np/about-us)
- [Products](https://www.bli.com.np/products)
- [All categories](https://www.bli.com.np/all-categories)
- [Services](https://www.bli.com.np/services)
- [Download](https://www.bli.com.np/download)
- [Become a Dealer](https://www.bli.com.np/become-a-dealer)
- [Career](https://www.bli.com.np/career)
- [Contact](https://www.bli.com.np/contact-us)
- Five product details: Mantra mBio-G1, CP PLUS E39A, Agni 8 Zone Fire Alarm Panel, EZVIZ H3C, and Hikvision DS-2CE76D0T-LPFS.

The browser capture set included full-page views of the homepage, products page, five product details, services, company, and contact. The page-assets bundle is preserved in [research/bli-assets](D:/www/blip/research/bli-assets), with original source URLs in `manifest.json`. The three concept boards are in [research/concepts](D:/www/blip/research/concepts).

The local workspace was empty at the start of the task, so there was no existing app, CMS codebase, database schema, or local design system to inspect. The live website remains the source of truth for this phase.

The prescribed `agent-reach` command was unavailable in this environment. The same read-only research was completed through the open Codex browser tab, direct HTTP reads, and the web search fallback. Mobile viewport emulation was not available from the current browser surface, so responsive behavior was checked from the site CSS rules and desktop rendering rather than from a true 390px device capture.

## Existing site inventory

### Header and navigation

The public header has a small utility-style navigation row with duplicated `Career`, followed by a logo/search row. The second row contains the BLI logo, an `All Categories` dropdown, a product search input, a red Search button, and the customer-service phone numbers `01-5183328 | 01-5183329`.

The visible category menu exposes PABX System, CCTV Camera, Electronics Door Lock, Biometric Attendance System, and Education. The homepage also has a category rail with nine entries. The footer repeats almost the entire page list.

### Homepage

Purpose: send visitors into categories, products, or contact paths.

Main content:

- Carousel hero made from promotional product artwork.
- Category rail with PABX, CCTV, electronic locks, biometric, facial, fingerprint, access control, IP dome, and Wi-Fi camera categories.
- Latest Products carousel with visible prices.
- Promotional slides for Smart School Bell System and a 6MP Wi-Fi camera package.
- Featured Products carousel with visible prices.
- Testimonials carousel.
- Our Clients logo carousel.
- Repeated company description and a large footer.

Primary actions are product search, category links, `View All`, `Learn More`, phone contact, and product-level `Inquiry Now`. There is no clear homepage-level quote or site consultation path.

What is worth retaining: real product photography, visible Nepalese rupee pricing, testimonials, client logos, the BLI logo, and the service phone number.

What needs rewriting: the hero value proposition, the repeated company paragraph, product naming, the category language, and the calls to action. The homepage should explain the product-plus-installation offer before the visitor reaches a product carousel.

### Company and About Us

The `/company` and `/about-us` routes resolve to the same company story. The page presents:

- Vision: `Advance, Authentic and Affordable security solutions for all.`
- About text covering CCTV, DVR, NVR, PABX, biometric attendance, access control, video door phone, PA system, burglar alarm, fire alarm, and more.
- Verticals including governments, hotels, hospitals, educational institutes, homes, infrastructure, and transportation.
- Mission focused on affordable security solutions, contemporary technology, dealers, and fair practices.

The page uses generic stock-style imagery and does not make the company’s delivery process, team, installations, brands, or after-sales support easy to verify.

### Products, category pages, and search

The main products route has a left filter column and a grid of priced product cards. The exposed category list is much larger than the homepage menu and includes:

- PABX System, EPABX, IP Phone, Analog Phone
- CCTV Camera, AHD CCTV, IP Dome Camera, Wi-Fi Camera, DVR/NVR
- Electronics Door Lock, Smart Lock, Mortise Lock, Access Control System, Access Controls, Access Control & Remote Kits
- Biometric Attendance System, Facial Attendance System, Fingerprint Attendance System
- Video Door Phone, Education, PA System, Automated Bell System
- Fire Safety, Fire Alarms & Releases, burglar/security-related products
- Cash Counting Machine, Currency Counting and Detection Machines, Metal Detectors
- Electronics, Printers, Gadgets, Monitors
- Networking Products, Routers, Switches, Wireless Access Points, Networking Cables, Audio and Video Cables, Data Transfer Cable
- Barcode Scanner and other related equipment

The main listing shows a wide mix of phones, school bell equipment, access-control parts, door-release hardware, video door phones, attendance devices, CCTV cameras, and accessories. It has price-range filters and a `View More` button.

Two route checks exposed an important issue: `products?category_id=2` displays `No Products Found` even though the site labels category 2 as CCTV Camera, while `products?category_id=18` correctly displays Fire Alarms & Releases. This suggests category mapping, product tagging, or route handling needs review before any frontend redesign.

The search field submits a GET request to `/products` with a `query` parameter. There is no visible search-result explanation, autocomplete, product comparison, or zero-results recovery path.

### Product detail pages

Five representative details were inspected:

1. Mantra mBio-G1 Time Attendance Biometric Device, Rs. 9999.
2. CP PLUS E39A 3MP Wi-Fi PT Camera, Rs. 4200.
3. Agni Protection 8 Zone Fire Alarm Panel, Rs. 30000.
4. EZVIZ H3C 2K 3MP Wi-Fi Smart Home Camera, Rs. 7200.
5. Hikvision 2MP IR Smart Light Audio Camera, Rs. 3250.

Common structure: breadcrumb, product image and thumbnail, tabbed product information, price, description, red `Inquiry Now` button, related products, and footer.

The pages do contain real technical content. Examples include camera resolution, lenses, IR distance, audio, storage, power, dimensions, fingerprint capacity, transaction capacity, fire-panel dimensions, and zone behavior. The content should be kept and reformatted into a readable specification table with scannable selling points.

The product enquiry form posts to `/product-inquiry/store` and includes first name, last name, category, product, address, mobile, email, quantity, and message. No field is required in the inspected markup. The current flow has a useful product context, but it lacks a visible response expectation, warranty/download area, stock status, WhatsApp or call shortcut, and a clear distinction between purchase and project enquiry.

There is no public cart, checkout, account, login, register, or buy-now route exposed in the inspected pages. The current public flow is catalogue plus enquiry, even though the visible prices make the site feel like a complete store.

### Services

The [services page](https://www.bli.com.np/services) verifies five service areas:

- CCTV installation: site survey, camera positioning, wire planning, installation, uninstallation, and maintenance.
- Access control and lock fitting.
- Gate automation motor installation.
- Intelligent door lock installation and integration.
- Attendance system installation and integration.

The service copy also mentions trained technicians, board-level programming, access control, RFID, Bluetooth access technologies, and electrical knowledge. This is valuable proof for a solutions-led position, but the page has no service-specific lead form, service regions, process, project examples, or response promise.

### Download, dealer, career, help, and contact

- [Download](https://www.bli.com.np/download) exposes one visible resource: `IP-PTZ-5M-20X.docx`, 0.18 MB, under IVR.
- [Become a Dealer](https://www.bli.com.np/become-a-dealer) has a detailed dealer form covering company, contact, website, address, dealership area, current products, sales and service employees, years in business, and desired products.
- [Career](https://www.bli.com.np/career) shows accountant and technical support roles with application windows in November and December 2024. These are closed by the inspection date and need an archive/current-status treatment.
- [Help Center](https://www.bli.com.np/help-center) returns a 404 page.
- [Contact](https://www.bli.com.np/contact-us) shows office hours of Sun-Fri 10:00-17:00, Saturday closed, Indrayani Marga, Sanepa-02, `01-5183328 | 01-5183329`, `info@bli.com.np`, and a form with name, email, subject, and message. The page promises a response within 24 hours.

## Verified business and brand picture

BLI is a Kathmandu-area supplier of security, surveillance, communication, access, attendance, fire-safety, networking, and related electronics products. The business combines catalogue sales with technical installation and maintenance. Dealer recruitment is also a visible business path.

The customer mix is mixed, with B2B work carrying the higher-value journey because the site describes site surveys, wiring plans, trained technicians, installation, maintenance, and dealer relationships. B2C and small-business product purchase still matters for Wi-Fi cameras, locks, attendance devices, phones, and accessories.

Verified customer environments named on the site include governments, hotels, hospitals, educational institutes, homes, infrastructure, and transportation. Retail, factory, and warehouse use cases are reasonable redesign pathways, but they should be treated as proposed content until BLI confirms them.

The most credible BLI proof currently available is:

- Real product catalogue with technical specifications and prices.
- Installation and maintenance capability.
- A visible office address, phone numbers, email, and office hours.
- Client logo imagery and testimonial copy on the homepage.
- Existing product brands visible in the catalogue, including CP PLUS, Hikvision, EZVIZ, Agni, Mantra, and Excelltel.

No company-wide years-of-experience figure, certification, warranty policy, project count, service coverage map, or named client case study was verified. Those should not be invented in the redesign.

## Current UX, UI, content, and conversion audit

### Header and navigation

Problem: the header duplicates `Career`, mixes company and commerce navigation at the same level, and repeats the same page list in the footer.

Why it hurts: visitors cannot tell whether they are shopping, seeking a solution, looking for support, or trying to contact sales. The navigation also uses space for low-frequency routes while burying high-value paths such as a quote request.

Replacement: use four clear primary groups: Products, Solutions, Industries, and Company. Keep Support and Contact as utility actions. Add a persistent `Request a quote` button and a visible phone/WhatsApp action.

### Homepage hierarchy

Problem: the carousel leads with promotional artwork and moves directly into category and product rails.

Why it hurts: the visitor has to infer what BLI does, who it serves, and whether BLI installs systems or only sells equipment.

Replacement: lead with a plain statement of the offer, two paths for `Explore solutions` and `Shop products`, then prove the offer with installation, brands, clients, and service support.

### Product discovery

Problem: category labels are long, duplicated, and inconsistent. The main category route has 40-plus filters, while the homepage exposes only a small subset.

Why it hurts: visitors who know the outcome they need, such as office attendance or hotel access, are forced to browse component names.

Replacement: expose product families and use-case filters. Keep technical subcategories one level deeper. Add search suggestions, recent searches, zero-result recovery, compare, and clear product-to-solution links.

### Category and listing pages

Problem: the sidebar is long, the layout is dense, product cards are inconsistent, and the CCTV category route returned no results.

Why it hurts: the page feels like an uncurated inventory feed. A broken category route directly damages trust and organic discovery.

Replacement: fix category data first. Add a category intro, result count, sort, filter chips, brand/model labels, short specifications, availability, quote/buy choices, and a mobile filter drawer.

### Product cards

Problem: cards mostly show an image, title, and price. Product names are often long SEO phrases, and related products repeat in ways that look like duplication.

Why it hurts: comparison is hard and the commercial action is unclear.

Replacement: show brand, model, one or two verified specs, price or `Request price`, availability when verified, `View details`, `Buy now` only if checkout exists, and `Request quote` for project-fit products.

### Product detail pages

Problem: real specifications are present but hidden inside tabs with weak hierarchy. The pages do not show brand/model as structured metadata, warranty, downloads, stock, delivery, compatibility, or support options.

Why it hurts: technical buyers cannot quickly confirm fit, while casual buyers cannot tell what happens after clicking `Inquiry Now`.

Replacement: create a purchase and enquiry panel with price, availability, delivery note, call, WhatsApp, quote, and enquiry actions. Put the top five selling points beside the image. Turn the existing tabs into a specification table, description, features, downloads, warranty/support, and related products.

### Lead generation

Problem: the contact form is generic and the product enquiry form is hidden behind an inquiry button. There is no quote, site survey, or installation flow.

Why it hurts: a large CCTV, access, fire, or attendance requirement cannot be explained well through a generic subject field.

Replacement: create a short quote flow with name, company, phone, email, industry, location, requirement, estimated quantity, and message. Offer `Talk to an expert`, `Book a site survey`, `Request installation`, `Call sales`, and `WhatsApp BLI`.

### Trust and proof

Problem: testimonials and client logos appear late, with little context. The company page does not connect them to products, projects, or service outcomes.

Why it hurts: security buyers need evidence that the supplier can install, configure, and support systems after delivery.

Replacement: use verified client logos, named testimonials only where the attribution is already public, installation photos, a clear service process, product brand relationships, warranty language, and downloadable documentation. Avoid unverified numbers and certifications.

### Visual system

Problem: the current layout relies on small text, loose image quality, grey panels, repeated carousels, and generic decorative shapes. The homepage hero can occupy a very large area without a clear message.

Why it hurts: the site looks like a low-confidence electronics catalogue rather than a security technology partner.

Replacement: use a disciplined type scale, a limited navy/white/red/blue palette, consistent card proportions, fewer carousels, real product imagery, and stronger editorial sections for solutions and installations.

### Mobile and accessibility

The CSS exposes breakpoints from 375px through desktop widths, which indicates responsive intent. The inspected desktop DOM suggests the main risks are a long category menu, a dense filter sidebar, long product titles, and specification tabs that will need deliberate mobile treatment. The accessible tree exposes labels for search, navigation, category controls, and product links, but image alt text is often blank or filename-based. Future implementation should add meaningful alt text, visible focus states, keyboard-friendly dropdowns, semantic labels, and mobile-first filter controls.

### Performance and SEO

The site loads Bootstrap, jQuery, Bootstrap JS, Popper, multiple icon sets, Slick, LightGallery, Google Fonts, several style sheets, and many product/client images. That creates avoidable script and image weight, especially on Nepal’s variable networks. The redesign should keep the server-rendered product data and URLs where possible, use responsive WebP/AVIF assets, lazy-load below-the-fold imagery, remove duplicate libraries, and preserve product/category canonical paths.

The site has useful indexable product titles and technical text, but titles are often overlong and contain awkward phrases such as `near me` and `price in Nepal`. Each page should receive a clean title, meta description, canonical URL, breadcrumb schema, product schema, organization schema, and useful internal links. Any URL change needs redirects.

## Proposed information architecture

This structure keeps the existing product catalogue while making the B2B solution journey visible.

- Home
- Products
  - CCTV cameras
  - IP and Wi-Fi cameras
  - DVR and NVR
  - Access control and locks
  - Biometric and attendance
  - Video door phones
  - Fire and safety
  - PABX and communication
  - PA and public address
  - Networking
  - POS, barcode, counting, and office electronics
  - Accessories and cables
- Solutions
  - CCTV surveillance
  - Office attendance
  - Access control
  - Fire alarm
  - Communication systems
  - Network infrastructure
  - Smart locks and gate automation
- Industries
  - Government
  - Corporate offices
  - Hotels and hospitality
  - Hospitals
  - Education
  - Homes
  - Infrastructure and transportation
  - Other confirmed BLI environments
- Projects and installations
- Brands
- Support
  - Installation
  - Maintenance
  - Downloads
  - Help center
- About BLI
- Careers
- Become a dealer
- Contact
- Request a quote

Account, cart, and checkout should appear only after BLI confirms that the underlying business flow exists. The current public site did not expose those routes.

## Homepage content strategy

The shared strategy across the concepts is `Products + Solutions + Consultation + Installation`.

The page should answer these questions in order:

1. What does BLI provide?
2. Can BLI help with a whole site, not only a device?
3. Which products and brands are available?
4. Can BLI install and support the system?
5. How can a visitor request a price, consultation, or product?

The strongest verified content to carry forward is the actual category catalogue, five installation services, the public contact details, technical product specifications, existing client/testimonial material, the BLI logo, and the current product/hero assets.

## Concept 1: Premium enterprise technology

Positioning: a high-trust security technology integrator for workplaces, institutions, and critical environments.

Design philosophy: dark, precise, and calm. Use a restrained navy/graphite foundation with red and blue as action accents. Pair a compact navigation bar with strong typographic hierarchy, a product-plus-installation hero, and editorial project proof.

Homepage structure:

1. Header with Products, Solutions, Projects, About, Support, phone, and `Request a quote`.
2. Hero: `Security systems for places that matter`, with a real BLI product composition and two CTAs.
3. Trusted brands and client proof.
4. Why BLI: authentic products, expert installation, end-to-end support.
5. Solutions by environment.
6. Curated featured products.
7. Installation/project gallery.
8. Expert consultation banner.
9. Testimonial and footer.

Typography direction: strong sans-serif headings, compact uppercase eyebrows, readable body copy, and a short, confident sentence length.

Color strategy: warm white for most content, midnight navy for hero and consultation bands, red for primary actions, blue for secondary links and technical accents.

CTA strategy: `Explore solutions`, `Request a quote`, `View projects`, `Talk to an expert`.

Target customer: business owners, operations teams, facility managers, procurement teams, institutions, and government buyers.

Conversion reasoning: this direction reduces the risk that BLI is perceived as a commodity reseller. It makes installation, technical capability, and after-sales support visible before the catalogue.

Strengths: highest trust signal, clearest B2B positioning, strong fit for large enquiries and projects.

Trade-offs: casual product shoppers need a deliberate path into the catalogue; the design depends on verified installation/project imagery.

Visual: [concept 1, premium enterprise](D:/www/blip/research/concepts/concept-1-premium-enterprise.png)

## Concept 2: Modern product-first commerce

Positioning: the easiest place in Nepal to find, compare, buy, or request a quote for security and communication products.

Design philosophy: bright, fast, and highly scannable. Make search and category discovery the first interaction. Treat product cards as the primary conversion surface while keeping installation support visible.

Homepage structure:

1. Search-first header with account, wishlist, cart only if those flows are implemented.
2. Mega-navigation for CCTV, fire, access, attendance, PABX, networking, brands, and offers.
3. Hero with `CCTV, Fire Alarm, Access Control & More at BLI` and `Shop products` plus `Request a quote`.
4. Popular categories with real category imagery.
5. Featured product grid with compare controls, availability, prices, `Buy now`, and `Request quote`.
6. Shop by brand.
7. Installation support banner.
8. Commerce-oriented footer.

Typography direction: compact, legible sans-serif with strong product-name truncation rules and prominent price/action hierarchy.

Color strategy: white and cool grey base, blue for navigation and links, BLI red for prices and primary purchase actions.

CTA strategy: `Shop products`, `Compare`, `Buy now`, `Request a quote`, `Request installation`.

Target customer: homeowners, small businesses, office admins, dealers, technicians, and buyers who already know the product type or model they need.

Conversion reasoning: this direction shortens the path from search to product detail and makes prices, specifications, and action choices explicit.

Strengths: best catalogue usability, strongest product SEO foundation, easiest path to future cart/checkout if BLI enables it.

Trade-offs: can make the business look like a marketplace if solution content, installation, and proof are not given enough space.

Visual: [concept 2, product-first commerce](D:/www/blip/research/concepts/concept-2-product-commerce.png)

## Concept 3: Solutions and industry-led

Positioning: a security and technology partner that designs systems around how each site operates.

Design philosophy: image-led, human, and site-aware. Lead with environments and outcomes, then connect visitors to system bundles and the right enquiry path.

Homepage structure:

1. Header with Solutions, Industries, Our Process, Projects, Support, and `Talk to an expert`.
2. Hero: `Security built around how your site works`.
3. Industry chooser for corporate offices, hotels, schools, hospitals, retail, factories, and homes. Keep any unverified industries marked for confirmation.
4. Integrated solution cards for CCTV, access control, attendance, fire alarm, PA, and networking.
5. Process: consult, plan, install, support.
6. Real environments and installation gallery.
7. Installation and after-sales support.
8. Verified testimonials/client proof.
9. Consultation CTA and footer.

Typography direction: editorial sans-serif with large but compact headlines, clear section labels, and supportive explanatory copy.

Color strategy: midnight blue and warm white with stone photography surfaces. Use BLI red for action lines, buttons, and small markers.

CTA strategy: `Find my solution`, `Book a site consultation`, `View projects`, `Talk to a support specialist`.

Target customer: people responsible for a site, building, workforce, guest experience, campus, warehouse, or multi-location operation.

Conversion reasoning: this direction matches the most valuable BLI journey: a customer with a real environment and a security problem who needs advice, equipment, installation, and support.

Strengths: strongest differentiation from a commodity electronics shop, best fit for large enquiries and service relationships.

Trade-offs: requires confirmed project imagery, industry copy, and a strong internal link from each use case to real products.

Visual: [concept 3, solutions and industries](D:/www/blip/research/concepts/concept-3-solutions-industries.png)

## Recommendation and approval gate

The evidence supports Concept 1 or Concept 3 as the stronger primary direction because BLI already advertises site surveys, installation, maintenance, trained technicians, dealer relationships, and multiple customer verticals. Concept 2 is the best choice if BLI’s main growth goal is direct product sales and a real cart/checkout system is ready to support that promise.

The next step is approval of one direction or a hybrid, for example:

- Concept 1 visual style + Concept 3 structure
- Concept 2 product discovery + Concept 1 trust and project proof
- Concept 3 industry journeys + Concept 2 product detail and quote controls

No coding should begin until that choice is approved.
