<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Alert extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'location',
        'property_type',
        'type',
        'max_price',
        'min_area',
        'is_active'
    ];

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Get the user that owns the Alert
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
