<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FriendshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'friendship' =>[
            'userOne' => new UserResource($this->resource->userOne),
            'userTwo' => new UserResource($this->resource->userTwo),
            ],

        ];
    }
}
