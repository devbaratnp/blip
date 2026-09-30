# BLI Admin Panel, CMS, and Dynamic Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a secure staff admin panel and CMS-backed data layer so BLI staff can manage products, public content, media, enquiries, dealers, downloads, and site settings without editing React source files.

**Architecture:** Keep the existing React/Vite public application and visual language. Add a separate API/backend with MySQL persistence, authentication, server-side authorization, validated media uploads, and audit events; add an `/admin` React surface that consumes that API. Migrate public pages behind a typed content adapter with the current static data retained as a safe fallback until each API resource is live.

**Tech Stack:** Existing React/Vite, plain CSS tokens, Lucide React, Vitest, and browser verification. Recommended backend: Laravel API with MySQL and cookie-based Sanctum authentication, using the hosting environment’s supported Laravel version; verify the available PHP/MySQL deployment before implementation. Do not add a second frontend component library.

---

## Scope and decisions

### Confirmed from the repository

- Public routing is hand-rolled in `src/App.jsx`; there is no React Router.
- Product records are static in `src/data/products.js`; categories are static in `src/data/categories.js`; site content is static in `src/data/site.js`.
- Homepage sections such as featured products, projects, testimonials, and “Why BLI” are local constants in `src/pages/HomePage.jsx`.
- Existing reusable public primitives are in `src/components/`: `Header.jsx`, `Footer.jsx`, `ProductCard.jsx`, `QuoteModal.jsx`, `CartDrawer.jsx`, and `PublicPageHero.jsx`.
- Visual tokens, typography, responsive breakpoints, focus styles, and form styling are in `src/styles.css`; the current font stack is Plus Jakarta Sans with Nunito fallback and Libre Baskerville available for accents.
- Existing forms are UI-only. `QuoteModal.jsx`, `ContactPage.jsx`, and `DealerPage.jsx` reset local state and do not persist records.

### Proposed defaults requiring confirmation before backend implementation

- Use Laravel + MySQL because the current project has no server and a PHP-compatible deployment is likely to be simpler for BLI hosting. If hosting cannot run Laravel, use the same API contracts with a managed backend such as Supabase instead; do not begin schema work until this deployment decision is confirmed.
- Authentication: one `Admin` role with full CMS access. Record scope is global for this single BLI organization; no multi-tenant, branch, or role-management system in v1.
- Content publishing workflow: `Draft → Published → Archived`. Product and media records are archived, not hard-deleted, once referenced by public content.
- Lead workflow: `New → Contacted → Qualified → Closed` with `Lost` as a terminal outcome. Exact sales stages can be adjusted before implementation.
- MVP uses structured content sections, not an unrestricted drag-and-drop page builder. This preserves the approved BLI design while allowing copy, images, cards, ordering, visibility, and SEO to change safely.

### Explicitly out of scope for v1

- Payment checkout, inventory accounting, purchasing, warehouse stock ledgers, coupons, shipping, or an ERP.
- A public customer account area.
- Arbitrary HTML injection or a full visual page builder.
- Automatic WhatsApp/CRM integrations before the lead data and statuses are proven.
- Multi-language publishing and Nepali/BS date conversion; preserve Unicode and Asia/Kathmandu timestamps so they can be added deliberately later.

## Design System Report — Checkpoint 1

| Area | Evidence | Reuse plan |
| --- | --- | --- |
| Stack | `package.json`, `package-lock.json`, `src/main.jsx` | Keep React/Vite and existing dependency versions. Add only API/auth utilities after backend choice. |
| Theme/tokens | `src/styles.css:1-31` | Reuse `--bli-red`, `--bli-blue`, `--ink`, `--muted`, `--line`, radius, shadow, and container tokens for admin. Add admin-specific tokens only when a semantic role is missing. |
| Type/icons | `src/styles.css`, imports from `lucide-react` across `src/components/` | Reuse Plus Jakarta Sans and Lucide icons. Do not add another icon pack. |
| Public shell | `src/App.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx` | Preserve public shell. Mount `/admin` behind an authenticated `AdminApp` branch without changing public navigation. |
| Existing forms | `src/components/QuoteModal.jsx`, `src/pages/ContactPage.jsx`, `src/pages/DealerPage.jsx` | Extract shared field, error, dirty-state, and submit-state primitives for admin; replace local-only public submissions with API calls. |
| Tables/feedback | No admin table, pagination, toast, permission wrapper, or server state exists | Create these only for the admin reference module, then reuse them. Do not bring in a full UI framework. |
| Mobile | Responsive rules in `src/styles.css`; `Header.jsx` already has a mobile drawer | Use a labeled desktop sidebar and modal mobile drawer. Verify the lead triage and product edit tasks at 360px. |

**Evidence status:** partial system, coherent for the public site, with admin primitives missing. The public product page and quote flow are the maintained visual references. No application code is changed by this plan.

## Feature map — Checkpoint 2

| Module | Screens/routes | Main actions and transitions | Role/scope | Acceptance criterion |
| --- | --- | --- | --- | --- |
| Dashboard | `/admin` | View actionable counts and recent work; route to filtered lists | Admin, global BLI scope | Every KPI links to the matching list; no decorative or invented counts. |
| Products | `/admin/products`, `/admin/products/new`, `/admin/products/:id` | Create, edit, preview, publish, archive; manage price, quote-only state, featured state, specs, features, category, brand, image | Admin | A published product appears in catalog, detail view, search, and featured section without a source edit. |
| Categories/brands | `/admin/categories`, `/admin/brands` | Create/edit/archive, reorder, assign products | Admin | Archived taxonomy cannot be assigned to new products; existing public URLs remain safe. |
| Pages/content | `/admin/pages`, `/admin/pages/:slug` | Edit structured sections, reorder, preview, publish/archive, edit SEO title/description/OG image | Admin | A saved/published section updates the matching public route after cache refresh; drafts never leak publicly. |
| Homepage collections | Within `/admin/pages/home` | Manage hero, benefits, solutions, featured product selection, projects, client logos, testimonials, CTA | Admin | Homepage uses configured ordering and visibility, with an empty-state fallback if no items are published. |
| Media | `/admin/media` | Upload, search, filter by type, select for content, archive unused assets | Admin | Upload validates MIME/type/size, preserves alt text, and prevents archiving an asset still referenced by published content. |
| Leads/inquiries | `/admin/leads`, `/admin/leads/:id` | View/filter quote/contact/dealer leads, assign, status transition, notes, internal tags, export current filtered view | Admin | A quote/contact/dealer form creates one durable record and staff can triage it without duplicate submissions. |
| Downloads | `/admin/downloads` | Upload/link resource, edit title/description/category, publish/archive, track public URL | Admin | Published download appears on `/download`; unpublished resources are inaccessible through public listings. |
| Site settings | `/admin/settings` | Edit contact details, hours, social links, nav labels/paths, email recipient, public fallback flags | Admin | Settings save is explicit, audited, validated, and reflected in header/footer/contact surfaces. |
| Activity/audit | `/admin/activity` | Inspect immutable audit events | Admin | Every publish/archive/status/settings change records actor, time, resource, and outcome. |

### Permission matrix

| Resource/action | Admin |
| --- | --- |
| View published/admin records | All authorized BLI records |
| Product/category/brand CRUD | Allowed |
| Publish/archive content/products | Allowed with validation and audit |
| Media upload/edit | Allowed |
| Lead view/assign/status/notes | Allowed |
| Site settings | Allowed |
| User/role management | Not part of v1 |
| Audit log | Read-only |
| Export leads/catalog | Allowed for authorized filtered scope |

Server policies must enforce this matrix. The UI only mirrors it and must hide forbidden actions without using hidden fields as authorization.

### Core data model

Use UUID or auto-increment IDs consistently after backend selection. The minimum relational records are:

- `users`, `audit_events`.
- `brands`, `categories`, `products`, `product_features`, `product_images`.
- `pages`, `page_sections`, `navigation_items`, `site_settings`, `seo_metadata`.
- `media_assets`, `solutions`, `projects`, `client_logos`, `testimonials`, `downloads`.
- `leads`, `lead_notes`, `lead_events`, with `lead_type` of `quote`, `contact`, or `dealer`.

Products need `slug`, `status`, `featured`, `sort_order`, `quote_only`, `price_npr`, `short_specs`, `description`, `features`, `brand_id`, `category_id`, primary media ID, `published_at`, and `updated_by`. Leads need `source`, submitted form fields, selected product IDs as a snapshot, status, assignee, notes, timestamps, and an idempotency key. Never rely on current product data to reconstruct an old enquiry.

## Pattern Decision Table — Checkpoint 3

| Surface/entity | Chosen pattern | Task/data reason | Mobile behavior | Rejected alternative |
| --- | --- | --- | --- | --- |
| Admin shell | 240–280px labeled sidebar, 64px top bar, modal drawer on phones | 8–10 destinations are enough for this CMS | Drawer closes after navigation, Escape returns focus to trigger | Icon-only rail; it would hide long labels and slow occasional staff users. |
| Dashboard | Work queue plus 3–5 linked counts | The admin needs leads/content needing action, not vanity analytics | Stack cards; no horizontal chart canvas | Large analytics dashboard before event data exists. |
| Product list | Semantic table, 25 rows default, 10/25/50 options, search + category/brand/status filters | Products are comparison and management records | Labeled card rows with same actions; primary `View` link remains visible | Client-only filtering of the full static array. |
| Lead list | Table with type, requester/company, status, assignee, received date; detail page for edits | Leads need triage and audit, not inline dense editing | Stacked list; detail form is one column | Kanban-only view; it hides searchable history and makes mobile harder. |
| Forms | One main column; two columns only for related short fields; explicit Save/Publish | Prevent accidental content loss and make validation clear | Full-width fields and sticky bottom action area | Autosave for published records; conflict behavior would be unclear. |
| Content editor | Structured section editor with preview and draft/publish | Preserves existing visual design while making copy/media/order dynamic | Sections stack; reorder controls use buttons, not drag-only interaction | Arbitrary HTML/WYSIWYG page builder in v1. |
| Media | Searchable grid plus metadata/detail panel | The admin needs visual selection and alt text | Two-column grid with upload action at top | Bare file browser with no reference protection. |
| Lists/export | One normalized query object for table, count, export, and selection | Prevents filters from drifting between views | Keep filters in a mobile sheet; preserve safe query state in URL | “Export all” from browser memory or hidden client records. |

## API and public data contract

The backend should expose versioned endpoints under `/api/v1`:

```text
POST   /auth/login
POST   /auth/logout
GET    /auth/me
GET    /products?search=&category=&brand=&status=&page=&pageSize=
POST   /products
GET    /products/{id}
PATCH  /products/{id}
POST   /products/{id}/publish
POST   /products/{id}/archive
GET    /public/home
GET    /public/pages/{slug}
GET    /public/products/{slug}
GET    /public/navigation
POST   /leads
GET    /admin/leads?type=&status=&assignee=&search=&page=
GET    /admin/leads/{id}
PATCH  /admin/leads/{id}
POST   /admin/leads/{id}/notes
POST   /media
GET    /media?search=&type=&page=
GET    /downloads
GET    /settings
PATCH  /settings
GET    /activity
```

Public responses must contain only published, authorized fields. Admin responses may include draft state and audit metadata. All list endpoints accept allowlisted filters/sorts, return bounded pages, and use stable ordering. Lead creation requires an idempotency key and returns the durable lead ID; the public UI must not show success until the server confirms it.

## Implementation tasks

### Task 1: Confirm backend/deployment boundary

**Files:**
- Create: `docs/architecture/bli-data-boundary.md`
- Modify: `README.md`

- [ ] **Step 1: Record the hosting decision**

Document whether the production host supports PHP/Laravel, MySQL, SMTP, and writable/public storage. Record the selected API base URL and whether the API shares the public origin.

- [ ] **Step 2: Freeze the API boundary**

Copy the endpoint, record, transition, and permission contracts from this plan into `docs/architecture/bli-data-boundary.md`. Mark unconfirmed business rules as proposed rather than silently implementing them.

- [ ] **Step 3: Add the runbook**

Document local commands for the existing Vite app plus the selected backend, required environment variables, database migration/seed commands, and the test commands used by CI.

### Task 2: Bootstrap backend authentication and persistence

**Files:**
- Create: `backend/` Laravel application files generated by the selected supported version
- Create: `backend/database/migrations/*_create_catalog_and_cms_tables.php`
- Create: `backend/database/migrations/*_create_leads_and_audit_tables.php`
- Create: `backend/app/Models/*`
- Create: `backend/app/Policies/*`
- Create: `backend/routes/api.php`
- Create: `backend/tests/Feature/Auth/*Test.php`

- [ ] **Step 1: Create the backend without touching the public app**

Initialize the selected Laravel backend in `backend/`, configure MySQL and cookie authentication, and prove `GET /api/v1/auth/me` returns `401` when unauthenticated.

- [ ] **Step 2: Add the Admin policy**

Create one `Admin` permission boundary for authenticated staff. Add policy tests for product publish, page publish, lead update, settings update, media/download access, and audit visibility. Do not build role assignment or role-switching screens in v1. Test direct HTTP requests, not only rendered UI.

- [ ] **Step 3: Add migrations and constraints**

Create foreign keys, unique slugs, status enums or validated strings, indexes for `status`, `published_at`, `category_id`, `brand_id`, `lead_type`, `lead_status`, and `created_at`. Use soft archive fields instead of deleting referenced content.

- [ ] **Step 4: Add audit events**

Record actor, action, resource type/ID, timestamp in `Asia/Kathmandu` display context, outcome, correlation ID, and safe before/after changes. Exclude passwords, tokens, and full lead messages from general logs.

### Task 3: Build the shared admin shell and API client

**Files:**
- Modify: `src/App.jsx`
- Create: `src/admin/AdminApp.jsx`
- Create: `src/admin/adminRoutes.js`
- Create: `src/admin/components/AdminShell.jsx`
- Create: `src/admin/components/AdminSidebar.jsx`
- Create: `src/admin/components/AdminTopbar.jsx`
- Create: `src/admin/components/AdminTable.jsx`
- Create: `src/admin/components/AdminForm.jsx`
- Create: `src/admin/components/StatusBadge.jsx`
- Create: `src/lib/apiClient.js`
- Create: `src/lib/authSession.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add `/admin` route ownership**

Extend `readRoute()` so `/admin` and `/admin/*` render `AdminApp`, while public routes continue to render the existing `Header` and `Footer`. Do not mount public cart/quote state inside the admin shell.

- [ ] **Step 2: Implement the shared API client**

Expose `get`, `post`, `patch`, and `delete/archive` methods that send credentials, normalize JSON errors, attach a request correlation ID, and reject stale requests when the active user/scope changes. Store no access token or permission authority in localStorage.

- [ ] **Step 3: Implement the shell**

Render nav from one definition grouped as Dashboard, Catalog, Content, Leads, and System. Use real links, `aria-current="page"`, active group state, visible Admin identity, and a mobile drawer with Escape, focus return, background inertness, and scroll-lock cleanup.

- [ ] **Step 4: Implement shared list/form states**

Create loading, empty, no-match, forbidden, fetch-error/retry, dirty, saving, saved, failed, conflict, and unknown-write states. Keep error summaries associated with invalid fields and preserve entered values after failed saves.

### Task 4: Build the catalog reference module first

**Files:**
- Create: `src/admin/pages/ProductsListPage.jsx`
- Create: `src/admin/pages/ProductFormPage.jsx`
- Create: `src/admin/pages/ProductDetailPage.jsx`
- Create: `src/admin/pages/CategoriesPage.jsx`
- Create: `src/admin/pages/BrandsPage.jsx`
- Create: `backend/app/Http/Controllers/Api/V1/ProductController.php`
- Create: `backend/app/Http/Requests/ProductRequest.php`
- Create: `backend/app/Http/Resources/ProductResource.php`
- Create: `backend/tests/Feature/Products/*Test.php`

- [ ] **Step 1: Prove the product list contract**

Implement server-side search, category/brand/status filters, stable sort by `updated_at` then ID, page sizes 10/25/50, and a visible filtered scope. Test that a forbidden field is not returned and that filter changes reset the page and selection.

- [ ] **Step 2: Implement product create/edit**

Use fields matching current `src/data/products.js`: name, slug, brand, category, model, price in NPR, quote-only, short specs, description, features, primary image, badge, availability, featured, sort order, and status. Validate unique slug, nonnegative money, required taxonomy, and image alt text.

- [ ] **Step 3: Implement publish/archive transitions**

Keep publishing separate from Save. Validate required public fields before publish, record the actor in audit events, and block archive when the product is the only product in a published category unless an authorized admin confirms the replacement.

- [ ] **Step 4: Integrate one reference task in the browser**

Verify staff can open Products → search/filter → open a product → edit invalid then valid data → Save → Publish → return to the preserved list at 360px and desktop widths. Fix shared table/form defects before copying the pattern.

### Task 5: Add structured CMS content and media

**Files:**
- Create: `src/admin/pages/PagesListPage.jsx`
- Create: `src/admin/pages/PageEditorPage.jsx`
- Create: `src/admin/pages/MediaLibraryPage.jsx`
- Create: `src/admin/components/SectionEditor.jsx`
- Create: `src/admin/components/MediaPicker.jsx`
- Create: `backend/app/Http/Controllers/Api/V1/PageController.php`
- Create: `backend/app/Http/Controllers/Api/V1/MediaController.php`
- Create: `backend/app/Http/Requests/PageSectionRequest.php`
- Create: `backend/app/Http/Requests/MediaUploadRequest.php`
- Create: `backend/tests/Feature/Content/*Test.php`

- [ ] **Step 1: Define section schemas**

Support `hero`, `rich_text`, `split_media`, `icon_grid`, `product_grid`, `solution_grid`, `project_grid`, `testimonial`, `cta`, `contact_info`, and `faq`. Store validated JSON per section with a schema version, visibility, order, and media IDs; render only known section types.

- [ ] **Step 2: Seed current public content**

Move the current copy from `src/data/site.js`, `HomePage.jsx`, `AboutPage.jsx`, `ServicesPage.jsx`, `ContactPage.jsx`, `CareersPage.jsx`, `DealerPage.jsx`, and `DownloadPage.jsx` into initial draft/published records. Preserve the current UI as the fallback while the seed is verified.

- [ ] **Step 3: Build media upload and reference protection**

Accept only approved image/document MIME types, enforce a bounded size, generate stable filenames, store alt text and attribution, and prevent archive when a published section references the asset. Use authorized downloads for non-public documents.

- [ ] **Step 4: Add preview and publish**

Preview draft JSON in the existing public renderer using a preview token or same-user authenticated endpoint. Publish atomically with section validation and audit logging; never expose draft content from public endpoints.

### Task 6: Make enquiries and dealer/contact forms dynamic

**Files:**
- Modify: `src/components/QuoteModal.jsx`
- Modify: `src/pages/ContactPage.jsx`
- Modify: `src/pages/DealerPage.jsx`
- Create: `src/admin/pages/LeadsListPage.jsx`
- Create: `src/admin/pages/LeadDetailPage.jsx`
- Create: `backend/app/Http/Controllers/Api/V1/PublicLeadController.php`
- Create: `backend/app/Http/Controllers/Api/V1/AdminLeadController.php`
- Create: `backend/app/Http/Requests/PublicLeadRequest.php`
- Create: `backend/tests/Feature/Leads/*Test.php`

- [ ] **Step 1: Normalize three public form payloads**

Send `type`, contact fields, source page, selected product snapshot, requirement/message, and an idempotency key to `POST /api/v1/leads`. Validate names as Unicode strings, phone as a string, optional email correctly, and reject oversized messages.

- [ ] **Step 2: Replace local success states**

Show success only after a confirmed server response. On network or validation failure, preserve fields, show field-level errors, and allow a safe retry with the same idempotency key. Keep the current fallback message only when the API is intentionally disabled in local development.

- [ ] **Step 3: Build the lead list/detail workflow**

List type, requester/company, status, assignee, received date, and latest activity. Detail view is read-only for submitted values with separate actions for status, assignment, and notes. Record every transition and reject duplicate status writes.

- [ ] **Step 4: Verify mobile lead triage**

At 360px, complete menu → Leads → search → open → assign/status update → return with filters preserved. Test a 422 validation response, a failed request, and a repeated submit.

### Task 7: Migrate public pages to API-backed content safely

**Files:**
- Create: `src/lib/publicContentApi.js`
- Create: `src/lib/contentFallback.js`
- Modify: `src/App.jsx`
- Modify: `src/data/products.js`
- Modify: `src/data/categories.js`
- Modify: `src/data/site.js`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/pages/ProductsPage.jsx`
- Modify: `src/pages/ProductDetailPage.jsx`
- Modify: public content pages under `src/pages/`
- Create: `src/lib/publicContentApi.test.js`

- [ ] **Step 1: Add one public content adapter**

Expose functions such as `getHomeContent()`, `getPageContent(slug)`, `getPublishedProducts(query)`, and `getProductBySlug(slug)`. If `VITE_API_BASE_URL` is absent or the public request fails, return the existing local fallback and expose a non-user-facing diagnostic state.

- [ ] **Step 2: Remove duplicated public content ownership**

Replace homepage and page-level literals with API response props while keeping presentation components unchanged. Use IDs/slugs from the API for product links, media alt text, and configured ordering.

- [ ] **Step 3: Add loading/error/empty states**

Use stable skeletons for initial loads, preserve old rows during same-query refresh, show retry for failures, and render the existing local fallback only when the adapter explicitly permits it. Do not render draft or unauthorized records.

- [ ] **Step 4: Verify cache and browser history behavior**

Test search/category query restoration, product detail direct routes, Back/Forward, stale response cancellation, and that a public update appears after publish without requiring a source edit.

### Task 8: Add settings, SEO, exports, notifications, and audit UI

**Files:**
- Create: `src/admin/pages/SettingsPage.jsx`
- Create: `src/admin/pages/ActivityPage.jsx`
- Create: `src/admin/components/SeoFields.jsx`
- Create: `src/admin/components/ExportButton.jsx`
- Create: `backend/app/Http/Controllers/Api/V1/SettingsController.php`
- Create: `backend/app/Http/Controllers/Api/V1/ActivityController.php`
- Create: `backend/app/Jobs/SendLeadNotification.php`
- Create: `backend/tests/Feature/SettingsAndAudit/*Test.php`

- [ ] **Step 1: Implement site settings and SEO fields**

Manage contact phone/email/address/hours, social links, navigation labels/paths, page title, meta description, canonical path, and OG image. Validate URLs and prevent empty required navigation paths.

- [ ] **Step 2: Implement scoped CSV export**

Export only the current authorized filtered view or an explicitly selected set. State the scope on the action, escape spreadsheet formulas, queue large exports, expire download URLs, and reauthorize the download.

- [ ] **Step 3: Add email notifications**

Queue a notification for new quote/contact/dealer records through configured SMTP. Store notification outcome and correlation ID; if delivery fails, keep the lead and show retry status rather than reporting a lost enquiry.

- [ ] **Step 4: Add user and audit screens**

The authenticated Admin can filter audit events by actor/action/resource/date. User invitation, deactivation, and role assignment are outside v1. Do not expose secrets or full sensitive lead bodies in the audit list.

### Task 9: Production verification and handoff

**Files:**
- Modify: `README.md`
- Create: `docs/operations/admin-runbook.md`
- Create: `docs/operations/content-publishing-checklist.md`
- Create: `backend/tests/Feature/Authorization/*Test.php`
- Create: `src/admin/adminSmoke.test.js`

- [ ] **Step 1: Run automated checks**

Run `npm test -- --run`, backend unit/feature tests, `npm run build`, and `git diff --check`. Expected: all pass with no new lint/build errors.

- [ ] **Step 2: Verify authorization directly**

Test unauthenticated admin routes, authenticated Admin access, archived records, draft leakage, export authorization, and media/download authorization through direct HTTP requests.

- [ ] **Step 3: Verify the 360px reference task**

At 360×800, complete Products create/edit/publish and Leads search/detail/status update with keyboard focus, validation recovery, drawer behavior, and no horizontal overflow. Repeat at desktop width.

- [ ] **Step 4: Verify realistic list behavior**

Seed non-production data with at least 1,000 products/leads. Record page size, response bytes, query count, indexed query plan, and first/deep-page timings. Use measured values to confirm or change pagination; do not label synthetic data as production performance.

- [ ] **Step 5: Handoff the operating workflow**

Document login/invite, product publishing, page preview/publish, media rules, lead triage, export scope, backup/restore, SMTP failure recovery, and rollback. Capture screenshots of the dashboard, product editor, content editor, media picker, lead detail, and mobile drawer.

## Delivery order and commit boundaries

Implement as separate reviewable slices:

1. `docs: define BLI admin data boundary`
2. `feat: add backend auth and catalog schema`
3. `feat: add admin shell and shared form table states`
4. `feat: add product catalog management`
5. `feat: add structured content and media management`
6. `feat: persist contact quote and dealer leads`
7. `feat: serve public content from the CMS with fallback`
8. `feat: add settings exports notifications and audit views`
9. `test: verify admin permissions mobile workflows and production build`

Each commit must keep the public site buildable. Do not merge a frontend API migration until the matching backend endpoint, fallback behavior, and direct authorization tests exist.

## Self-review

- The requested admin panel, CMS, and dynamic features are covered by Tasks 2–8.
- Existing static catalog/page content is preserved as a fallback in Task 7 rather than deleted during backend work.
- Lead forms are explicitly made durable and idempotent in Task 6.
- Product and content publishing, media references, settings, audit, exports, and notifications have separate owners and tests under one Admin permission boundary.
- The plan does not include a payment/ERP expansion or an unbounded page builder.
- Unknown deployment/backend choice is marked as a decision, not fabricated as an existing capability.

