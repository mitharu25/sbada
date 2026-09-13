<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;
    protected $primaryKey = 'id_user';

    protected $fillable = [
        'nickname',
        'business_company',
        'photo',
        'email',
        'password',
    ];

    protected $hidden = ['password'];

    public function products()
    {
        return $this->hasMany(Product::class, 'id_user', 'id_user');
    }
}
