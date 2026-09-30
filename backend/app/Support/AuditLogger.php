<?php

namespace App\Support;

use App\Models\AuditEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuditLogger
{
    public static function record(Request $request, string $action, string $resourceType, ?int $resourceId = null, array $changes = []): void
    {
        AuditEvent::create([
            'actor_id' => $request->user()?->id,
            'action' => $action,
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'outcome' => 'success',
            'correlation_id' => (string) Str::uuid(),
            'changes' => $changes ?: null,
        ]);
    }
}
