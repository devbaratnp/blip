<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DownloadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'mediaId' => ['nullable', 'integer', 'exists:media_assets,id'],
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1000'],
            'category' => ['nullable', 'string', 'max:120'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('mediaId')) $this->merge(['media_id' => $this->input('mediaId')]);
    }
}
