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
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'image' => $this->resource->image,
            'description' => $this->resource->description,
            'location' => $this->resource->location,
            'dateAndTime' => $this->resource->dateAndTime,
            'numberOfLikes' => $this->resource->numberOfLikes,
            'numberOfComments' => $this->resource->numberOfComments,
            'user' => new UserResource($this->resource->user),
        ];
    }
}
