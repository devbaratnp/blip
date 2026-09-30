# BLI admin data boundary

## Status

This document records the v1 boundary for the approved single-Admin CMS implementation. Production hosting capability (PHP version, MySQL, SMTP, writable storage and the final API origin) still needs to be confirmed before deployment. Local development uses Laravel with SQLite and a separate Vite frontend.

## Ownership and authorization

- There is one authenticated role: Admin.
- The Admin has global BLI scope for catalog, content, media, downloads, leads, settings and audit records.
- There is no user invitation, role management, branch scope or customer account area in v1.
- Authorization is enforced by the API middleware; hiding a button in React is not a permission boundary.

## API boundary

The API is versioned under /api/v1:

- POST /auth/login, POST /auth/logout, GET /auth/me
- GET|POST /products, GET|PATCH /products/{id}
- POST /products/{id}/publish, POST /products/{id}/archive
- GET /catalog/options
- Planned public read endpoints: /public/home, /public/pages/{slug}, /public/products/{slug}, /public/navigation
- Planned lead endpoints: POST /leads, GET|PATCH /admin/leads/{id}, notes and filtered list
- Planned CMS endpoints: pages, sections, media, downloads, settings and activity

Admin list endpoints use allowlisted filters, bounded pagination and stable ordering. Public endpoints must return published records only.

## Core records

The Laravel schema contains users, brands, categories, products, pages, page sections, media, solutions, projects, client logos, testimonials, downloads, leads, lead notes/events and audit events. Published content uses published status; records are archived rather than hard-deleted when references may exist.

Products use a normalized API contract with camelCase response fields (priceNpr, brandId, categoryId) and request normalization at the Laravel boundary. Product publishing requires the public name, slug and availability fields.

## Local commands

    # Frontend
    npm install
    npm run dev
    npm test -- --run
    npm run build

    # Backend
    cd backend
    composer install
    C:\php\php.exe artisan migrate:fresh --seed
    C:\php\php.exe artisan serve --host=127.0.0.1 --port=8001
    C:\php\php.exe artisan test

Set VITE_API_BASE_URL to the backend origin when running the frontend against Laravel. Set ADMIN_EMAIL and ADMIN_PASSWORD locally before seeding; never commit real credentials.
