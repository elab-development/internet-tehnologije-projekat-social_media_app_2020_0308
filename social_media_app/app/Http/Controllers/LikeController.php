<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Http\Resources\CommentResource;

use App\Models\Post;
use App\Http\Resources\PostResource;

class LikeController extends Controller
{
    public function likeComment($id)
    {
        $comment= Comment::findOrFail($id);
        $coomment->numberOfLikes++;
        $comment->save();
        return new CommentResource($comment);
    }

    public function likePost($id)
    {
        $post= Post::findOrFail($id);
        $post->numberOfLikes++;
        $post->save();
        return new PostResource($post);
    }
}
