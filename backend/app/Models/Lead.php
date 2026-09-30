<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    protected $fillable = ['type', 'status', 'name', 'company', 'email', 'phone', 'source', 'payload', 'message', 'idempotency_key', 'assigned_to'];

    protected function casts(): array
    {
        return ['payload' => 'array'];
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(LeadNote::class)->latest();
    }

    public function events(): HasMany
    {
        return $this->hasMany(LeadEvent::class)->latest();
    }
}
