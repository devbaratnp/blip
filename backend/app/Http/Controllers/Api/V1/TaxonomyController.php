<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaxonomyRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Support\AuditLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaxonomyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'brands' => Brand::query()->orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'slug', 'status', 'sort_order as sortOrder']),
            'categories' => Category::query()->orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'slug', 'description', 'status', 'sort_order as sortOrder']),
        ]);
    }

    public function store(TaxonomyRequest $request, string $type): JsonResponse
    {
        $model = $type === 'brands' ? Brand::create($this->attributes($request)) : Category::create($this->attributes($request));
        AuditLogger::record($request, $type . '.created', $type, $model->id);
        return response()->json(['data' => $model], 201);
    }

    public function update(TaxonomyRequest $request, string $type, int $id): JsonResponse
    {
        $model = $this->resolve($type, $id);
        $model->update($this->attributes($request));
        AuditLogger::record($request, $type . '.updated', $type, $model->id);
        return response()->json(['data' => $model->refresh()]);
    }

    public function archive(Request $request, string $type, int $id): JsonResponse
    {
        $model = $this->resolve($type, $id);
        $model->update(['status' => 'archived', 'archived_at' => now()]);
        AuditLogger::record($request, $type . '.archived', $type, $model->id);
        return response()->json(['data' => $model->refresh()]);
    }

    private function attributes(TaxonomyRequest $request): array
    {
        $data = $request->validated();
        if (array_key_exists('sortOrder', $data)) {
            $data['sort_order'] = $data['sortOrder'];
            unset($data['sortOrder']);
        }
        return $data;
    }

    private function resolve(string $type, int $id): Brand|Category
    {
        return ($type === 'brands' ? Brand::query() : Category::query())->findOrFail($id);
    }
}
