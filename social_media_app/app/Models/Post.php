<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image', 
        'description',
        'location',
        'dateAndTime',
        'numberOfLikes',
        'numberOfComments',
        'user_id',
    ];
}
