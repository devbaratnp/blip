<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'phoneDisplay' => ['required', 'string', 'max:80'],
            'phoneHref' => ['required', 'string', 'max:80'],
            'email' => ['required', 'email:rfc', 'max:180'],
            'address' => ['required', 'string', 'max:240'],
            'officeHours' => ['required', 'string', 'max:180'],
            'facebookUrl' => ['nullable', 'url', 'max:500'],
            'youtubeUrl' => ['nullable', 'url', 'max:500'],
        ];
    }
}
