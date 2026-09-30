<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DownloadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'status' => $this->status,
            'publishedAt' => $this->published_at,
            'mediaId' => $this->media_id,
            'mediaName' => $this->whenLoaded('media', fn () => $this->media?->original_name),
            'url' => $this->whenLoaded('media', fn () => $this->media ? Storage::disk($this->media->disk)->url($this->media->path) : null),
        ];
    }
}
