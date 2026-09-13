<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Product extends Authenticatable
{
    use HasFactory;
    protected $primaryKey = 'id_user';

    protected $fillable = [
        'id_user',
        'name_product',
        'category_product',
        'price_product',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class, 'id_product', 'id_product');
    }
}
