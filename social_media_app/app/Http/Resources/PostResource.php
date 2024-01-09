<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'Name: ' => $this->resource->name,
            'Image: ' => $this->resource->image,
            'Description: ' => $this->resource->description,
            'Location: ' => $this->resource->location,
            'Date and time: ' => $this->resource->dateAndTime,
            'Number of likes: ' => $this->resource->numberOfLikes,
            'Number of comments: ' => $this->resource->numberOfComments,
            'User who posted: ' => new UserResource($this->resource->user),
        ];
    }
}
