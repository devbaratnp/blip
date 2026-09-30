<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditEventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'action' => $this->action,
            'resourceType' => $this->resource_type,
            'resourceId' => $this->resource_id,
            'outcome' => $this->outcome,
            'actor' => $this->whenLoaded('actor', fn () => $this->actor?->name),
            'changes' => $this->changes ?? [],
            'createdAt' => $this->created_at,
        ];
    }
}
