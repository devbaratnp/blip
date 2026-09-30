<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_assets', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('disk')->default('public');
            $table->string('path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size_bytes');
            $table->string('alt_text')->nullable();
            $table->string('status')->default('active')->index();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
            $table->index(['mime_type', 'status']);
        });

        Schema::create('brands', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('logo_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('status')->default('published')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->foreignId('image_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('status')->default('published')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('primary_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('model')->nullable();
            $table->decimal('price_npr', 12, 2)->nullable();
            $table->boolean('quote_only')->default(false);
            $table->text('short_specs')->nullable();
            $table->text('description')->nullable();
            $table->json('features')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('badge')->nullable();
            $table->string('availability')->default('In stock');
            $table->string('status')->default('draft')->index();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
            $table->index(['category_id', 'brand_id', 'status']);
        });

        Schema::create('pages', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('status')->default('draft')->index();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->foreignId('og_image_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
        });

        Schema::create('page_sections', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->unsignedInteger('schema_version')->default(1);
            $table->json('data');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
            $table->index(['page_id', 'sort_order']);
        });

        Schema::create('navigation_items', function (Blueprint $table): void {
            $table->id();
            $table->string('label');
            $table->string('path');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->json('value');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('solutions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('image_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('draft')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('image_media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('title');
            $table->string('note')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('draft')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('client_logos', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('name');
            $table->string('alt_text');
            $table->string('status')->default('draft')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table): void {
            $table->id();
            $table->text('quote');
            $table->string('author_label')->nullable();
            $table->string('status')->default('draft')->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('downloads', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('media_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('status')->default('draft')->index();
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('leads', function (Blueprint $table): void {
            $table->id();
            $table->string('type')->index();
            $table->string('status')->default('new')->index();
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('source')->nullable();
            $table->json('payload')->nullable();
            $table->text('message')->nullable();
            $table->string('idempotency_key')->unique();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index(['type', 'status', 'created_at']);
        });

        Schema::create('lead_notes', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->text('body');
            $table->timestamps();
        });

        Schema::create('lead_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('event');
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('audit_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action');
            $table->string('resource_type');
            $table->unsignedBigInteger('resource_id')->nullable();
            $table->string('outcome')->default('success');
            $table->uuid('correlation_id')->nullable()->index();
            $table->json('changes')->nullable();
            $table->timestamps();
            $table->index(['resource_type', 'resource_id']);
        });
    }

    public function down(): void
    {
        foreach (['audit_events', 'lead_events', 'lead_notes', 'leads', 'downloads', 'testimonials', 'client_logos', 'projects', 'solutions', 'site_settings', 'navigation_items', 'page_sections', 'pages', 'products', 'categories', 'brands', 'media_assets'] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
