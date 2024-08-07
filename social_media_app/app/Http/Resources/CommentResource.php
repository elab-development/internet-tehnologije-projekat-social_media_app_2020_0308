<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'text' => $this->resource->text,
            'numberOfLikes' => $this->resource->numberOfLikes,
            'gif_url' => $this->resource->gif_url,

            'dateAndTime' => $this->resource->dateAndTime,
            'user' => new UserResource($this->resource->user),
            'post' => new PostResource($this->resource->post),
        ];
    }
}
