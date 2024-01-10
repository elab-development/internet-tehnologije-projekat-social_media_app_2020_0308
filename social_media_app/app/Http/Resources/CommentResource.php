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
    public function toArray(Request $request): array
    {
        return [
            'ID: ' => $this->resource->id,
            'Text: ' => $this->resource->text,
            'Number of likes: ' => $this->resource->numberOfLikes,
            'Date and time: ' => $this->resource->dateAndTime,
            'User who commented: ' => new UserResource($this->resource->user),
            'Comment is on this post: ' => new PostResource($this->resource->post),
        ];
    }
}
