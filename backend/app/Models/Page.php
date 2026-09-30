<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    protected $fillable = ['created_by', 'updated_by', 'slug', 'title', 'status', 'seo_title', 'seo_description', 'og_image_id', 'published_at', 'archived_at'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime', 'archived_at' => 'datetime'];
    }

    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class)->orderBy('sort_order')->orderBy('id');
    }
}
