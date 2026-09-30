<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    protected function prepareForValidation(): void
    {
        $mapping = ['seoTitle' => 'seo_title', 'seoDescription' => 'seo_description'];
        $normalized = [];
        foreach ($mapping as $from => $to) {
            if ($this->has($from)) $normalized[$to] = $this->input($from);
        }
        if ($normalized) $this->merge($normalized);
    }

    public function rules(): array
    {
        $page = $this->route('page');
        return [
            'slug' => ['required', 'alpha_dash', 'max:180', Rule::unique('pages', 'slug')->ignore($page)],
            'title' => ['required', 'string', 'max:180'],
            'seo_title' => ['nullable', 'string', 'max:180'],
            'seo_description' => ['nullable', 'string', 'max:320'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
        ];
    }
}
