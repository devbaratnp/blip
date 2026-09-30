<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'model' => $this->model,
            'brand' => $this->whenLoaded('brand', fn () => $this->brand?->name),
            'brandId' => $this->brand_id,
            'category' => $this->whenLoaded('category', fn () => $this->category?->name),
            'categoryId' => $this->category_id,
            'priceNpr' => $this->price_npr,
            'quoteOnly' => $this->quote_only,
            'shortSpecs' => $this->short_specs,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'imageAlt' => $this->image_alt,
            'badge' => $this->badge,
            'availability' => $this->availability,
            'status' => $this->status,
            'featured' => $this->featured,
            'sortOrder' => $this->sort_order,
            'publishedAt' => $this->published_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
