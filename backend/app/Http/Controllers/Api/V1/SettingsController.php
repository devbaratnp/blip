<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingsRequest;
use App\Models\SiteSetting;
use App\Support\AuditLogger;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    public function show(): JsonResponse
    {
        $defaults = [
            'phoneDisplay' => '01-5183328 | 01-5183329',
            'phoneHref' => '01-5183328',
            'email' => 'info@bli.com.np',
            'address' => 'Indrayani Marga, Sanepa-02',
            'officeHours' => 'Sun-Fri 10:00-17:00 & Saturday- Closed',
            'facebookUrl' => 'https://facebook.com',
            'youtubeUrl' => 'https://youtube.com',
        ];
        $saved = SiteSetting::query()->get()->mapWithKeys(fn (SiteSetting $setting) => [$setting->key => $setting->value])->all();
        return response()->json(['data' => array_merge($defaults, $saved)]);
    }

    public function update(SettingsRequest $request): JsonResponse
    {
        foreach ($request->validated() as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value, 'updated_by' => $request->user()->id]);
        }
        AuditLogger::record($request, 'settings.updated', 'site_settings', null, ['keys' => array_keys($request->validated())]);
        return $this->show();
    }
}
