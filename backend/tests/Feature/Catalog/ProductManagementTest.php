<?php

namespace Tests\Feature\Catalog;

use App\Models\Brand;
use App\Models\Category;
use App\Models\User;
use Database\Seeders\CatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_seeded_products_and_create_a_product_from_admin_payload(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->seed(CatalogSeeder::class);

        $this->actingAs($admin)
            ->getJson('/api/v1/products')
            ->assertOk()
            ->assertJsonPath('meta.total', 5);

        $response = $this->actingAs($admin)->postJson('/api/v1/products', [
            'name' => 'BLI Test NVR',
            'slug' => 'bli-test-nvr',
            'brandId' => Brand::query()->first()->id,
            'categoryId' => Category::query()->where('slug', 'networking')->first()->id,
            'priceNpr' => 18000,
            'quoteOnly' => false,
            'shortSpecs' => '8 channel | 4K support',
            'description' => 'A test record for the admin catalog flow.',
            'features' => ['8 channel recording', '4K support'],
            'imageAlt' => 'BLI test network video recorder',
            'availability' => 'In stock',
            'featured' => true,
            'sortOrder' => 10,
            'status' => 'published',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.slug', 'bli-test-nvr')
            ->assertJsonPath('data.category', 'Networking')
            ->assertJsonPath('data.priceNpr', '18000.00');
    }
}
