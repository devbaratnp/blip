<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadNoteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'body' => $this->body, 'author' => $this->whenLoaded('author', fn () => $this->author?->name), 'createdAt' => $this->created_at];
    }
}
