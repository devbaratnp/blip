<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PageRequest;
use App\Http\Requests\PageSectionRequest;
use App\Http\Resources\PageResource;
use App\Http\Resources\PageSectionResource;
use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PageController extends Controller
{
    public function index(): JsonResponse
    {
        $pages = Page::query()->withCount('sections')->orderBy('title')->get();
        return response()->json(['data' => PageResource::collection($pages), 'meta' => ['total' => $pages->count()]]);
    }

    public function show(Page $page): PageResource
    {
        return new PageResource($page->load('sections'));
    }

    public function update(PageRequest $request, Page $page): PageResource
    {
        $page->fill(array_merge($request->validated(), ['updated_by' => $request->user()->id]));
        if ($page->status === 'published' && !$page->published_at) $page->published_at = now();
        if ($page->status !== 'published') $page->published_at = null;
        if ($page->status !== 'archived') $page->archived_at = null;
        $page->save();
        return new PageResource($page->load('sections'));
    }

    public function storeSection(PageSectionRequest $request, Page $page): JsonResponse
    {
        $section = $page->sections()->create($request->validated());
        return response()->json(['data' => (new PageSectionResource($section))->resolve($request)], 201);
    }

    public function updateSection(PageSectionRequest $request, PageSection $pageSection): JsonResponse
    {
        $pageSection->update($request->validated());
        return response()->json(['data' => (new PageSectionResource($pageSection->refresh()))->resolve($request)]);
    }

    public function publish(Request $request, Page $page): PageResource
    {
        abort_if($page->sections()->where('is_visible', true)->doesntExist(), 422, 'Add at least one visible section before publishing this page.');
        DB::transaction(function () use ($request, $page): void {
            $page->update(['status' => 'published', 'published_at' => now(), 'archived_at' => null, 'updated_by' => $request->user()->id]);
        });
        return new PageResource($page->load('sections'));
    }

    public function archive(Request $request, Page $page): PageResource
    {
        $page->update(['status' => 'archived', 'archived_at' => now(), 'updated_by' => $request->user()->id]);
        return new PageResource($page->load('sections'));
    }
}
