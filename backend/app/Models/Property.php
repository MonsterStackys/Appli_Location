<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Property extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id', 'title', 'description', 'price', 'location',
        'type', 'property_type', 'bedrooms', 'bathrooms', 'area', 'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    protected $appends = ['liked_by_current_user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getLikedByCurrentUserAttribute()
    {
        $userId = Auth::id();
        if (!$userId) {
            return false;
        }
        return $this->favorites()->where('user_id', $userId)->exists();
    }

    // Scope pour les filtres
    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        
        if (!empty($filters['property_type'])) {
            $query->where('property_type', $filters['property_type']);
        }
        
        if (!empty($filters['location'])) {
            $query->where('location', 'like', '%' . $filters['location'] . '%');
        }
        
        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }
        
        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }
        
        if (!empty($filters['min_bedrooms'])) {
            $query->where('bedrooms', '>=', $filters['min_bedrooms']);
        }
        
        if (!empty($filters['min_area'])) {
            $query->where('area', '>=', $filters['min_area']);
        }
        
        return $query;
    }

    // Scope pour les propriétés actives
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope pour les recherches par titre
    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
    }
}