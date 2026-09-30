<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaUploadRequest;
use App\Http\Resources\MediaAssetResource;
use App\Models\MediaAsset;
use App\Support\AuditLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $assets = MediaAsset::query()
            ->where('status', '!=', 'archived')
            ->when($request->filled('search'), fn ($query) => $query->where('original_name', 'like', '%' . trim((string) $request->string('search')) . '%'))
            ->latest()
            ->paginate(min(max($request->integer('pageSize', 24), 10), 50));
        return response()->json(['data' => MediaAssetResource::collection($assets->getCollection()), 'meta' => ['currentPage' => $assets->currentPage(), 'lastPage' => $assets->lastPage(), 'total' => $assets->total()]]);
    }

    public function store(MediaUploadRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $path = $file->store('media', 'public');
        $asset = MediaAsset::create(['uploaded_by' => $request->user()->id, 'disk' => 'public', 'path' => $path, 'original_name' => $file->getClientOriginalName(), 'mime_type' => $file->getMimeType(), 'size_bytes' => $file->getSize(), 'alt_text' => $request->input('altText'), 'status' => 'active']);
        AuditLogger::record($request, 'media.uploaded', 'media_assets', $asset->id, ['mimeType' => $asset->mime_type]);
        return response()->json(['data' => (new MediaAssetResource($asset))->resolve($request)], 201);
    }

    public function archive(Request $request, MediaAsset $mediaAsset): JsonResponse
    {
        abort_if($mediaAsset->status === 'archived', 422, 'This media asset is already archived.');
        $mediaAsset->update(['status' => 'archived', 'archived_at' => now()]);
        AuditLogger::record($request, 'media.archived', 'media_assets', $mediaAsset->id);
        return response()->json(['data' => (new MediaAssetResource($mediaAsset->refresh()))->resolve($request)]);
    }
}
