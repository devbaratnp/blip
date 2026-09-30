<?php

namespace Tests\Feature\SettingsAndAudit;

use App\Models\AuditEvent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SystemManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_settings_upload_media_and_read_activity(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->patchJson('/api/v1/settings', [
                'phoneDisplay' => '01-5183328 | 01-5183329',
                'phoneHref' => '01-5183328',
                'email' => 'info@bli.com.np',
                'address' => 'Sanepa, Nepal',
                'officeHours' => 'Sun-Fri 10:00-17:00',
                'facebookUrl' => 'https://facebook.com/bli',
                'youtubeUrl' => 'https://youtube.com/@bli',
            ])
            ->assertOk()
            ->assertJsonPath('data.address', 'Sanepa, Nepal');

        $this->actingAs($admin)
            ->post('/api/v1/media', [
                'file' => UploadedFile::fake()->image('camera.png'),
                'altText' => 'Security camera',
            ])
            ->assertCreated()
            ->assertJsonPath('data.originalName', 'camera.png');

        $this->assertGreaterThanOrEqual(2, AuditEvent::count());
        $this->actingAs($admin)->getJson('/api/v1/activity')->assertOk()->assertJsonPath('meta.total', 2);
    }
}
