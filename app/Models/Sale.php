<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Sale extends Authenticatable
{
    use HasFactory;
    protected $primaryKey = 'id_sale';

    protected $fillable = [
        'id_product',
        'amount',
        'unit_price',
        'total_price',
        'sale_date',
    ];

    public function product()
    {
        return $this->belongsTo(
            Product::class,
            'id_product',
            'id_product'
        );
    }
}
