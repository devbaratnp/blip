<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'status' => $this->status,
            'name' => $this->name,
            'company' => $this->company,
            'email' => $this->email,
            'phone' => $this->phone,
            'source' => $this->source,
            'payload' => $this->payload ?? [],
            'message' => $this->message,
            'assignedTo' => $this->assigned_to,
            'assignee' => $this->whenLoaded('assignee', fn () => $this->assignee?->name),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'notes' => LeadNoteResource::collection($this->whenLoaded('notes')),
            'events' => LeadEventResource::collection($this->whenLoaded('events')),
        ];
    }
}
