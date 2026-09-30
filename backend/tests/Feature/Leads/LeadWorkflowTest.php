<?php

namespace Tests\Feature\Leads;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_lead_submission_is_idempotent_and_admin_can_triage_it(): void
    {
        $payload = [
            'type' => 'quote',
            'name' => 'Test Customer',
            'company' => 'Test Company',
            'email' => 'customer@example.com',
            'phone' => '9800000000',
            'source' => 'quote-modal',
            'payload' => ['requirement' => 'CCTV'],
            'message' => 'Please advise on a small office.',
            'idempotency_key' => 'lead-test-001',
        ];

        $this->postJson('/api/v1/leads', $payload)->assertCreated()->assertJsonPath('data.name', 'Test Customer');
        $this->postJson('/api/v1/leads', $payload)->assertOk()->assertJsonPath('duplicate', true);

        $admin = User::factory()->create(['is_admin' => true]);
        $lead = Lead::firstOrFail();

        $this->actingAs($admin)
            ->getJson('/api/v1/leads?status=new')
            ->assertOk()
            ->assertJsonPath('meta.total', 1);

        $this->actingAs($admin)
            ->patchJson("/api/v1/leads/{$lead->id}", ['status' => 'contacted', 'assigned_to' => $admin->id])
            ->assertOk()
            ->assertJsonPath('data.status', 'contacted');

        $this->actingAs($admin)
            ->postJson("/api/v1/leads/{$lead->id}/notes", ['body' => 'Called customer and shared initial options.'])
            ->assertOk()
            ->assertJsonPath('data.notes.0.body', 'Called customer and shared initial options.');
    }
}
