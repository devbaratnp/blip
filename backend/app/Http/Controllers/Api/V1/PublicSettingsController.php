<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class PublicSettingsController extends Controller
{
    public function show(): JsonResponse
    {
        return app(SettingsController::class)->show();
    }
}
