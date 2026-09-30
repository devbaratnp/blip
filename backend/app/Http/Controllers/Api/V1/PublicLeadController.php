<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PublicLeadRequest;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;

class PublicLeadController extends Controller
{
    public function store(PublicLeadRequest $request): JsonResponse
    {
        $existing = Lead::where('idempotency_key', $request->string('idempotency_key'))->first();
        if ($existing) return response()->json(['data' => (new LeadResource($existing))->resolve($request), 'duplicate' => true]);

        $lead = Lead::create($request->validated());
        $lead->events()->create(['event' => 'created', 'meta' => ['source' => $lead->source]]);

        return response()->json(['data' => (new LeadResource($lead))->resolve($request)], 201);
    }
}
