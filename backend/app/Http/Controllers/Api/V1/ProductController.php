<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function options(): JsonResponse
    {
        return response()->json([
            'brands' => DB::table('brands')->where('status', '!=', 'archived')->orderBy('name')->get(['id', 'name']),
            'categories' => DB::table('categories')->where('status', '!=', 'archived')->orderBy('sort_order')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $products = Product::query()
            ->with(['brand:id,name', 'category:id,name'])
            ->when($request->filled('search'), function ($query) use ($request): void {
                $search = trim((string) $request->string('search'));
                $query->where(fn ($scope) => $scope->where('name', 'like', "%{$search}%")->orWhere('model', 'like', "%{$search}%")->orWhere('slug', 'like', "%{$search}%"));
            })
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('brand_id'), fn ($query) => $query->where('brand_id', $request->integer('brand_id')))
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->integer('category_id')))
            ->orderByDesc('updated_at')
            ->orderByDesc('id')
            ->paginate(min(max($request->integer('pageSize', 25), 10), 50));

        return response()->json([
            'data' => ProductResource::collection($products->getCollection()),
            'meta' => [
                'currentPage' => $products->currentPage(),
                'lastPage' => $products->lastPage(),
                'perPage' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function store(ProductRequest $request): ProductResource
    {
        $product = DB::transaction(function () use ($request): Product {
            $product = Product::create(array_merge($request->validated(), [
                'created_by' => $request->user()->id,
                'updated_by' => $request->user()->id,
            ]));
            $this->syncPublishedTimestamp($product);
            return $product->load(['brand:id,name', 'category:id,name']);
        });

        return new ProductResource($product);
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load(['brand:id,name', 'category:id,name']));
    }

    public function update(ProductRequest $request, Product $product): ProductResource
    {
        $product->fill(array_merge($request->validated(), ['updated_by' => $request->user()->id]));
        $this->syncPublishedTimestamp($product);
        $product->save();

        return new ProductResource($product->load(['brand:id,name', 'category:id,name']));
    }

    public function publish(Request $request, Product $product): ProductResource
    {
        abort_if(!$product->name || !$product->slug || !$product->availability, 422, 'Complete the required public product fields before publishing.');
        $product->update(['status' => 'published', 'published_at' => now(), 'updated_by' => $request->user()->id]);

        return new ProductResource($product->load(['brand:id,name', 'category:id,name']));
    }

    public function archive(Request $request, Product $product): ProductResource
    {
        $product->update(['status' => 'archived', 'archived_at' => now(), 'updated_by' => $request->user()->id]);

        return new ProductResource($product->load(['brand:id,name', 'category:id,name']));
    }

    private function syncPublishedTimestamp(Product $product): void
    {
        if ($product->status === 'published' && !$product->published_at) $product->published_at = now();
        if ($product->status !== 'published') $product->published_at = null;
        if ($product->status !== 'archived') $product->archived_at = null;
    }
}
