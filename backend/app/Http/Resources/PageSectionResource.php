<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'schemaVersion' => $this->schema_version,
            'data' => $this->data ?? [],
            'sortOrder' => $this->sort_order,
            'isVisible' => $this->is_visible,
        ];
    }
}
