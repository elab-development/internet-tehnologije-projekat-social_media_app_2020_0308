<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Http\Resources\CommentResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return CommentResource::collection($comments);
    }

    //vrati komentar po idu
    public function show($id)
    {
        $comments = Comment::findOrFail($id);
        return new CommentResource($comments);
    }

     //ostavi komentar
     public function store(Request $request)
     {


     $validator = Validator::make($request->all(), [
         'text' => 'required',
         'post_id' => 'required',
     ]);
 
     if ($validator->fails()) {
         return response()->json($validator->errors());
     }

     $user_id = Auth::user()->id;
 
     $comment = new Comment();
     $comment->text = $request->text;
     $comment->datum = Carbon::now()->format('Y-m-d H:i:s'); //trenutni datum i vreme
     $comment->numberOfLikes = 0;
     $comment->user_id = $user_id;
     $comment->post_id = $request->post_id;
 
     $comment->save();

     $post = Post::findOrFail( $comment->post_id);
     $post->numberOfComments++;
     $post->save();
 
     return response()->json(['You have successfuly commented on the post '.$post->name.'!',
          new CommentResource($comment)]);
     }


       //azuriranje komentara
    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'text' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $comment = Comment::find($id);
        if(!$comment){
          return response()->json([
            'message'=>'The comment you are trying to alter doesent exist.'
          ],404);
        }

        $comment_user_id = Comment::where('id', $id)->value('user_id');

        if($user_id != $comment_user_id){
            return response()->json(['error' => 'You are not the one who created this comment!'], 403);
        }

        $comment = Comment::findOrFail($id);

        $comment->text = $request->text;
        $comment->datum = Carbon::now()->format('Y-m-d H:i:s'); //trenutni datum i vreme


        
        $comment->save();
    
        return response()->json(['You have successfuly altered your comment!',
            new CommentResource($comment)]);
        }

    //brisanje komentara
    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        $comment = Comment::find($id);
        if(!$comment){
          return response()->json([
            'message'=>'The comment you are trying to alter doesent exist.'
          ],404);
        }

        $comment_user_id = Comment::where('id', $id)->value('user_id');

        if($user_id != $comment_user_id){
            return response()->json(['error' => 'You are not the one who created this comment!'], 403);
        }

        $comment = Comment::findOrFail($id);
        $post = Post::findOrFail( $comment->post_id);
        $post->numberOfComments--;
        $post->save();
        $comment->delete();


        return response()->json('You have successfuly altered your comment!');
    }
}
