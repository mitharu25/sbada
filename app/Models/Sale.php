<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';
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
