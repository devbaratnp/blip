<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DownloadRequest;
use App\Http\Resources\DownloadResource;
use App\Models\Download;
use App\Support\AuditLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function index(): JsonResponse
    {
        $downloads = Download::with('media')->latest()->get();
        return response()->json(['data' => DownloadResource::collection($downloads), 'meta' => ['total' => $downloads->count()]]);
    }

    public function publicIndex(): JsonResponse
    {
        $downloads = Download::with('media')->where('status', 'published')->latest('published_at')->get();
        return response()->json(['data' => DownloadResource::collection($downloads)]);
    }

    public function store(DownloadRequest $request): JsonResponse
    {
        $download = Download::create($this->attributes($request));
        AuditLogger::record($request, 'download.created', 'downloads', $download->id);
        return response()->json(['data' => (new DownloadResource($download->load('media')))->resolve($request)], 201);
    }

    public function update(DownloadRequest $request, Download $download): JsonResponse
    {
        $download->update($this->attributes($request));
        AuditLogger::record($request, 'download.updated', 'downloads', $download->id);
        return response()->json(['data' => (new DownloadResource($download->refresh()->load('media')))->resolve($request)]);
    }

    public function publish(Request $request, Download $download): JsonResponse
    {
        abort_if(!$download->media_id, 422, 'Attach a media asset before publishing this download.');
        $download->update(['status' => 'published', 'published_at' => now()]);
        AuditLogger::record($request, 'download.published', 'downloads', $download->id);
        return response()->json(['data' => (new DownloadResource($download->refresh()->load('media')))->resolve($request)]);
    }

    public function archive(Request $request, Download $download): JsonResponse
    {
        $download->update(['status' => 'archived']);
        AuditLogger::record($request, 'download.archived', 'downloads', $download->id);
        return response()->json(['data' => (new DownloadResource($download->refresh()->load('media')))->resolve($request)]);
    }

    private function attributes(DownloadRequest $request): array
    {
        $data = $request->validated();
        if (array_key_exists('mediaId', $data)) {
            $data['media_id'] = $data['mediaId'];
            unset($data['mediaId']);
        }
        return $data;
    }
}
