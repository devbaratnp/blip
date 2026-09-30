<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Download extends Model
{
    protected $fillable = ['media_id', 'title', 'description', 'category', 'status', 'published_at'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'media_id');
    }
}
