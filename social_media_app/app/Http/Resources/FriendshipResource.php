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
            'ID: ' => $this->resource->id,
            'This friendship consists of: ' =>[
            'Friend one: ' => new UserResource($this->resource->userOne),
            'Friend two: ' => new UserResource($this->resource->userTwo),
            ],

        ];
    }
}
