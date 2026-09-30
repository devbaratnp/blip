<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            'home' => ['title' => 'BLI home', 'status' => 'published', 'seo_title' => 'Security systems for places that matter | BLI', 'seo_description' => 'Trusted security and communication solutions for homes, businesses and critical infrastructure.'],
            'about' => ['title' => 'About BLI', 'status' => 'published', 'seo_title' => 'About Bhagya Laxmi International', 'seo_description' => 'Learn how BLI delivers authentic, affordable security and communication solutions.'],
            'company' => ['title' => 'Company', 'status' => 'published'],
            'contact' => ['title' => 'Contact us', 'status' => 'published'],
            'careers' => ['title' => 'Careers', 'status' => 'published'],
            'services' => ['title' => 'Services', 'status' => 'published'],
            'download' => ['title' => 'Downloads', 'status' => 'published'],
            'become-a-dealer' => ['title' => 'Become a dealer', 'status' => 'published'],
        ];

        foreach ($pages as $slug => $attributes) {
            $page = Page::updateOrCreate(['slug' => $slug], $attributes);
            if ($page->sections()->doesntExist()) {
                $page->sections()->createMany($this->sectionsFor($slug));
            }
        }
    }

    private function sectionsFor(string $slug): array
    {
        return match ($slug) {
            'home' => [
                ['type' => 'hero', 'data' => ['eyebrow' => 'Security systems for a safer tomorrow', 'title' => 'Security systems for places that matter', 'description' => 'CCTV, fire alarm, access control, attendance, PABX, networking and more — trusted technology, professionally installed for homes, businesses and critical infrastructure.'], 'sort_order' => 0],
                ['type' => 'icon_grid', 'data' => ['title' => 'Why BLI', 'items' => [['title' => 'Authentic Products', 'description' => 'Sourced from reputed brands with assured quality.'], ['title' => 'Expert Installation', 'description' => 'Trained professionals for seamless deployment and support.'], ['title' => 'End-to-End Solutions', 'description' => 'From consultation to installation and maintenance.']]], 'sort_order' => 1],
                ['type' => 'cta', 'data' => ['eyebrow' => 'Need guidance?', 'title' => 'Talk to our security experts', 'description' => 'Get the right solution for your space.'], 'sort_order' => 2],
            ],
            'about' => [
                ['type' => 'rich_text', 'data' => ['eyebrow' => 'About BLI', 'title' => 'Advance. Authentic. Affordable.', 'body' => 'Bhagya Laxmi International Pvt. Ltd. delivers reliable security and communication solutions with genuine products, expert guidance and professional installation.'], 'sort_order' => 0],
            ],
            default => [
                ['type' => 'rich_text', 'data' => ['title' => $pages[$slug]['title'] ?? ucfirst($slug), 'body' => 'Update this page copy from the BLI Admin workspace.'], 'sort_order' => 0],
            ],
        };
    }
}
