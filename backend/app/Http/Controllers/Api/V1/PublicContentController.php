<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;

class PublicContentController extends Controller
{
    public function page(Page $page): PageResource
    {
        abort_unless($page->status === 'published', 404);
        $page->load(['sections' => fn ($query) => $query->where('is_visible', true)]);
        return new PageResource($page);
    }
}
