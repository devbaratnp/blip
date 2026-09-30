# BLI commerce redesign

React/Vite public site plus an isolated Laravel API boundary for the approved BLI Admin/CMS work.

## Public app

    npm install
    npm run dev
    npm test -- --run
    npm run build

## Admin foundation

The admin workspace is available at /admin. It currently includes the single-Admin authentication boundary, responsive shell, dashboard, and the first connected catalog module for products.

Run the local API in a second terminal:

    cd backend
    composer install
    $env:ADMIN_EMAIL='admin@example.com'
    $env:ADMIN_PASSWORD='change-this-locally'
    C:\php\php.exe artisan migrate:fresh --seed
    C:\php\php.exe artisan serve --host=127.0.0.1 --port=8001

Then run the frontend with:

    $env:VITE_API_BASE_URL='http://127.0.0.1:8001'
    npm run dev -- --host 127.0.0.1 --port 5174

The detailed API boundary and deployment assumptions are in docs/architecture/bli-data-boundary.md.
