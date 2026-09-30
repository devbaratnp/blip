<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaAsset extends Model
{
    protected $fillable = ['uploaded_by', 'disk', 'path', 'original_name', 'mime_type', 'size_bytes', 'alt_text', 'status', 'archived_at'];

    protected function casts(): array
    {
        return ['archived_at' => 'datetime'];
    }
}
