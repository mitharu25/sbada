<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InfoCompany extends Model
{
    /** @use HasFactory<\Database\Factories\InfoCompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'account_id',
        'name_company',
        'slug_name',
        'address'
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }
}
