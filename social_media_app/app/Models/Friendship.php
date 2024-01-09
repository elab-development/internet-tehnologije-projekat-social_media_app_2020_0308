<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_one_id',
        'user_two_id',
    ];

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id', 'id');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id', 'id');
    }
}
