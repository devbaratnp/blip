<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadEventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'event' => $this->event, 'meta' => $this->meta ?? [], 'actor' => $this->whenLoaded('actor', fn () => $this->actor?->name), 'createdAt' => $this->created_at];
    }
}
