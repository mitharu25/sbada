<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Account extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'name_company',
        'email',
        'password'
    ];

    protected $hidden = ['password'];

    public function infoCompany(): HasOne
    {
        return $this->hasOne(InfoCompany::class, 'account_id');
    }
}
