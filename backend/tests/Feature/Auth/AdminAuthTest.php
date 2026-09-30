<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_admin_request_is_rejected(): void
    {
        $this->getJson('/api/v1/auth/me')->assertUnauthorized();
    }

    public function test_admin_can_login_and_read_their_session(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => 'secret-password',
            'is_admin' => true,
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@example.com',
            'password' => 'secret-password',
        ])->assertOk()->assertJsonPath('user.role', 'Admin')->assertJsonStructure(['token']);

        $this->actingAs($admin)->getJson('/api/v1/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'admin@example.com')
            ->assertJsonPath('user.role', 'Admin');
    }

    public function test_non_admin_account_cannot_login(): void
    {
        User::factory()->create([
            'email' => 'staff@example.com',
            'password' => 'secret-password',
            'is_admin' => false,
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'staff@example.com',
            'password' => 'secret-password',
        ])->assertUnprocessable()->assertJsonValidationErrors('email');
    }
}
