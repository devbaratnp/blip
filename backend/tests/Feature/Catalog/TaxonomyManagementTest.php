<?php

namespace Tests\Feature\Catalog;

use App\Models\User;
use Database\Seeders\CatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaxonomyManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_update_and_archive_a_category(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->seed(CatalogSeeder::class);

        $created = $this->actingAs($admin)->postJson('/api/v1/taxonomy/categories', [
            'name' => 'Test category',
            'slug' => 'test-category',
            'description' => 'Test taxonomy entry',
            'sortOrder' => 99,
            'status' => 'published',
        ])->assertCreated()->json('data.id');

        $this->actingAs($admin)->patchJson('/api/v1/taxonomy/categories/' . $created, [
            'name' => 'Updated category',
            'slug' => 'updated-category',
            'description' => 'Updated taxonomy entry',
            'sortOrder' => 99,
            'status' => 'published',
        ])->assertOk()->assertJsonPath('data.name', 'Updated category');

        $this->actingAs($admin)->postJson('/api/v1/taxonomy/categories/' . $created . '/archive', [])
            ->assertOk()
            ->assertJsonPath('data.status', 'archived');
    }
}
