<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Friendship;
use App\Http\Resources\FriendshipResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class FriendshipController extends Controller
{
    //prikazi sva prijateljstva ulogovanog korisnika
    public function index()
    {
        $user_id = Auth::user()->id;
        $friendships = Friendship::where('user_one_id', $user_id)->get();
        return FriendshipResource::collection($friendships);
    }

     //napravi novo prijateljstvo
     public function store(Request $request)
     {
     $validator = Validator::make($request->all(), [
         'user_two_id' => 'required',
     ]);
 
     if ($validator->fails()) {
         return response()->json($validator->errors());
     }

     $user_id = Auth::user()->id;
 
     $friendship = new Friendship();
     $friendship->user_one_id = $user_id;
     $friendship->user_two_id = $request->user_two_id;

     $userTwo = User::findOrFail($friendship->user_two_id);
 
     $friendship->save();
 
     return response()->json(['You successfuly aded '.$userTwo->name.' as friend!',
          new FriendshipResource($friendship)]);
     }


    //obrisi prijateljstvo sa odredjenim korisnikom
    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        $friendship = Friendship::find($id);
        if(!$friendship){
          return response()->json([
            'message'=>'The friendship you are trying to delete doesent exist.'
          ],404);
        }
    
        // Delete friendships where the authenticated user is either user_one or user_two
        Friendship::where(function ($query) use ($user_id, $id) {
            $query->where('user_one_id', $user_id)
                  ->where('user_two_id', $id);
        })->orWhere(function ($query) use ($user_id, $id) {
            $query->where('user_one_id', $id)
                  ->where('user_two_id', $user_id);
        })->delete();
    
        return response()->json('Successfuly deleted a friendship with the certain user!');
    }
}
