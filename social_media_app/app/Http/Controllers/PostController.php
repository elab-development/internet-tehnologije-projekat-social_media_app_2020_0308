<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Http\Resources\PostResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return PostResource::collection($posts);
    }

    //vrati post po idu
    public function show($id)
    {
        $posts = Post::findOrFail($id);
        return new PostResource($posts);
    }

//objavljivanje novog posta
public function store(Request $request)
{
    //validacija koja sve polja moraju da se unesu
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'description' => 'required',
        //dozvoljeni formati za sliku
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    //generisanje imena slike
    $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();

    $user_id = Auth::user()->id;

    $post = new Post();
    $post->name = $request->name;
    $post->dateAndTime = Carbon::now()->format('Y-m-d H:i:s'); //trenutni dateAndTime
    $post->description = $request->description;
    $post->location = 'Belgrade, FON';
    $post->image = url('storage/' . $imageName); // Store the full URL
    $post->numberOfLikes = 0;
    $post->numberOfComments = 0;
    $post->user_id = $user_id;

    //cuva se taj novi post
    $post->save();

    //cuvanje slike u folderu storage
    Storage::disk('public')->put($imageName, file_get_contents($request->image));

    // Return the post with the full image URL
    return response()->json(['User has successfully created a new post.',
        'post' => new PostResource($post->load('user')),
    ]);
}


    //azuriranje posta
    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            //dozvoljeni formati za sliku
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'The post you are trying to alter does not exist.'
            ], 404);
        }

        $post_user_id = Post::where('id', $id)->value('user_id');

        if ($user_id != $post_user_id) {
            return response()->json(['error' => 'You are not the one who created this post!'], 403);
        }

        //menjanje unesenih vrednosti
        $post->name = $request->name;
        $post->description = $request->description;

        if ($request->image) {
            // Public storage
            $storage = Storage::disk('public');

            // Brisanje stare slike
            if ($storage->exists($post->image)) {
                $storage->delete($post->image);
            }

            //generisanje imena slike 
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            //cuva se nova image
            $post->image = $imageName;

            // Image save in public folder
            $storage->put($imageName, file_get_contents($request->image));
        }

        // Update posta
        $post->save();

        return response()->json(['Post successfully altered.',
            'post' => new PostResource($post->load('user')),
            'image_url' => url('storage/' . $post->image)
        ]);
    }

    public function updateLocation(Request $request, $id)
    {
        $user_id = Auth::user()->id;

        $request->validate([
            'location' => 'required'
        ]);

        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Post that you want to delete does not exist.'
            ], 404);
        }

        $post_user_id = Post::where('id', $id)->value('user_id');

        if ($user_id != $post_user_id) {
            return response()->json(['error' => 'You are not the one who created this post!'], 403);
        }

        $post = Post::findOrFail($id);

        $post->update(['location' => $request->input('location')]);

        return response()->json(['message' => 'Location successfully altered.', new PostResource($post)]);
    }

    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        DB::beginTransaction();

        try {
            $post = Post::find($id);
            if (!$post) {
                return response()->json([
                    'message' => 'Post that you want to delete does not exist.'
                ], 404);
            }

            $post_user_id = Post::where('id', $id)->value('user_id');

            if ($user_id != $post_user_id) {
                return response()->json(['error' => 'You are not the one who created this post!'], 403);
            }

            // Public storage
            $storage = Storage::disk('public');

            // Brisanje slike iz foldera storage
            if ($storage->exists($post->image)) {
                $storage->delete($post->image);
            }

            // Brisanje komentara povezanih sa postom
            Comment::where('post_id', $id)->delete();

            // Brisanje posta
            $post->delete();

            DB::commit();

            // Return Json Response
            return response()->json([
                'message' => "Post has successfully been deleted along with its comments."
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error occurred while deleting the post.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
