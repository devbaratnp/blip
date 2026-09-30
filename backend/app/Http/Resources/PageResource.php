<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'status' => $this->status,
            'seoTitle' => $this->seo_title,
            'seoDescription' => $this->seo_description,
            'publishedAt' => $this->published_at,
            'updatedAt' => $this->updated_at,
            'sectionsCount' => $this->when(isset($this->sections_count), $this->sections_count),
            'sections' => PageSectionResource::collection($this->whenLoaded('sections')),
        ];
    }
}
