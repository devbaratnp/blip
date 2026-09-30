<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'brand_id', 'category_id', 'primary_media_id', 'created_by', 'updated_by', 'slug', 'name', 'model',
        'price_npr', 'quote_only', 'short_specs', 'description', 'features', 'image_alt', 'badge', 'availability',
        'status', 'featured', 'sort_order', 'published_at', 'archived_at',
    ];

    protected function casts(): array
    {
        return [
            'price_npr' => 'decimal:2',
            'quote_only' => 'boolean',
            'features' => 'array',
            'featured' => 'boolean',
            'published_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
