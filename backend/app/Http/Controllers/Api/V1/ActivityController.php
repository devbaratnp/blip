<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuditEventResource;
use App\Models\AuditEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $events = AuditEvent::query()->with('actor:id,name')->latest()->paginate(min(max($request->integer('pageSize', 30), 10), 50));
        return response()->json(['data' => AuditEventResource::collection($events->getCollection()), 'meta' => ['currentPage' => $events->currentPage(), 'lastPage' => $events->lastPage(), 'total' => $events->total()]]);
    }
}
