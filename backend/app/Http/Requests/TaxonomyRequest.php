<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaxonomyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        $type = $this->route('type');
        $id = $this->route('id');
        $table = $type === 'brands' ? 'brands' : 'categories';
        return [
            'name' => ['required', 'string', 'max:120', Rule::unique($table, 'name')->ignore($id)],
            'slug' => ['required', 'alpha_dash', 'max:140', Rule::unique($table, 'slug')->ignore($id)],
            'description' => ['nullable', 'string', 'max:500'],
            'sortOrder' => ['integer', 'min:0', 'max:9999'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('sortOrder')) $this->merge(['sort_order' => $this->input('sortOrder')]);
    }
}
