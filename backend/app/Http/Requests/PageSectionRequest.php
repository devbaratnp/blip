<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    protected function prepareForValidation(): void
    {
        $mapping = ['schemaVersion' => 'schema_version', 'sortOrder' => 'sort_order', 'isVisible' => 'is_visible'];
        $normalized = [];
        foreach ($mapping as $from => $to) {
            if ($this->has($from)) $normalized[$to] = $this->input($from);
        }
        if ($normalized) $this->merge($normalized);
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', Rule::in(['hero', 'rich_text', 'split_media', 'icon_grid', 'product_grid', 'solution_grid', 'project_grid', 'testimonial', 'cta', 'contact_info', 'faq'])],
            'schema_version' => ['integer', 'min:1', 'max:20'],
            'data' => ['required', 'array', 'max:100'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
            'is_visible' => ['boolean'],
        ];
    }
}
