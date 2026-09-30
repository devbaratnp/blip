<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeadNoteRequest;
use App\Http\Requests\LeadUpdateRequest;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use App\Support\AuditLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $leads = Lead::query()
            ->with('assignee:id,name')
            ->when($request->filled('type'), fn ($query) => $query->where('type', $request->string('type')))
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('search'), function ($query) use ($request): void {
                $search = trim((string) $request->string('search'));
                $query->where(fn ($scope) => $scope->where('name', 'like', "%{$search}%")->orWhere('company', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
            })
            ->latest()
            ->paginate(min(max($request->integer('pageSize', 25), 10), 50));

        return response()->json(['data' => LeadResource::collection($leads->getCollection()), 'meta' => ['currentPage' => $leads->currentPage(), 'lastPage' => $leads->lastPage(), 'total' => $leads->total()]]);
    }

    public function show(Lead $lead): LeadResource
    {
        return new LeadResource($lead->load(['assignee:id,name', 'notes.author:id,name', 'events.actor:id,name']));
    }

    public function update(LeadUpdateRequest $request, Lead $lead): LeadResource
    {
        $changes = $request->validated();
        $lead->update($changes);
        if (array_key_exists('status', $changes)) $lead->events()->create(['actor_id' => $request->user()->id, 'event' => 'status_changed', 'meta' => ['status' => $changes['status']]]);
        if (array_key_exists('assigned_to', $changes)) $lead->events()->create(['actor_id' => $request->user()->id, 'event' => 'assigned', 'meta' => ['assignedTo' => $changes['assigned_to']]]);
        AuditLogger::record($request, 'lead.updated', 'leads', $lead->id, array_keys($changes));
        return new LeadResource($lead->load(['assignee:id,name', 'notes.author:id,name', 'events.actor:id,name']));
    }

    public function note(LeadNoteRequest $request, Lead $lead): LeadResource
    {
        $lead->notes()->create(['created_by' => $request->user()->id, 'body' => $request->string('body')]);
        $lead->events()->create(['actor_id' => $request->user()->id, 'event' => 'note_added']);
        AuditLogger::record($request, 'lead.note_added', 'leads', $lead->id);
        return new LeadResource($lead->load(['assignee:id,name', 'notes.author:id,name', 'events.actor:id,name']));
    }
}
