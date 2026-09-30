<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaAssetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'originalName' => $this->original_name,
            'mimeType' => $this->mime_type,
            'sizeBytes' => $this->size_bytes,
            'altText' => $this->alt_text,
            'status' => $this->status,
            'url' => $this->disk === 'public' ? Storage::disk($this->disk)->url($this->path) : null,
            'createdAt' => $this->created_at,
        ];
    }
}
