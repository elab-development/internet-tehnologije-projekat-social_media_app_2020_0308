<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('users', [UserController::class, 'index']);

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']); 

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{id}', [PostController::class, 'update']); 
    Route::patch('posts/updateLocation/{id}', [PostController::class, 'updateLocation']);
    Route::delete('posts/{id}', [PostController::class, 'destroy']); 

    Route::resource('comments', CommentController::class);

    Route::get('friendships/myFriends', [FriendshipController::class, 'index']);
    Route::post('friendships/makeAFriend', [FriendshipController::class, 'store']);
    Route::delete('friendships/removeAFriend/{id}', [FriendshipController::class, 'destroy']); 

    Route::post('comments/likeAComment/{id}', [LikeController::class, 'likeComment']); 
    Route::post('posts/likeAPost/{id}', [LikeController::class, 'likePost']); 

    Route::post('logout', [AuthController::class, 'logout']);
});