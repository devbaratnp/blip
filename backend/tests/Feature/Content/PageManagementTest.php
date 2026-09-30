<?php

namespace Tests\Feature\Content;

use App\Models\Page;
use App\Models\User;
use Database\Seeders\CmsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_and_publish_structured_page_content(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->seed(CmsSeeder::class);
        $page = Page::where('slug', 'about')->firstOrFail();

        $this->actingAs($admin)
            ->getJson('/api/v1/pages')
            ->assertOk()
            ->assertJsonPath('meta.total', 8);

        $this->actingAs($admin)
            ->patchJson("/api/v1/pages/{$page->id}", [
                'slug' => 'about',
                'title' => 'About BLI updated',
                'seoTitle' => 'About BLI updated',
                'seoDescription' => 'Updated page summary.',
                'status' => 'draft',
            ])
            ->assertOk()
            ->assertJsonPath('data.title', 'About BLI updated');

        $this->actingAs($admin)
            ->postJson("/api/v1/pages/{$page->id}/sections", [
                'type' => 'faq',
                'data' => ['items' => [['question' => 'What does BLI provide?', 'answer' => 'Integrated security solutions.']]],
                'sortOrder' => 10,
                'isVisible' => true,
            ])
            ->assertCreated()
            ->assertJsonPath('data.type', 'faq');

        $this->actingAs($admin)
            ->postJson("/api/v1/pages/{$page->id}/publish")
            ->assertOk()
            ->assertJsonPath('data.status', 'published');

        $this->getJson('/api/v1/public/pages/about')
            ->assertOk()
            ->assertJsonPath('data.status', 'published')
            ->assertJsonPath('data.title', 'About BLI updated');
    }

    public function test_public_page_does_not_leak_a_draft(): void
    {
        $this->seed(CmsSeeder::class);
        $page = Page::where('slug', 'about')->firstOrFail();
        $page->update(['status' => 'draft']);

        $this->getJson('/api/v1/public/pages/about')->assertNotFound();
    }
}
