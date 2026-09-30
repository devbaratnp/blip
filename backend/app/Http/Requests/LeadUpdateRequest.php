<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LeadUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'status' => ['sometimes', Rule::in(['new', 'contacted', 'qualified', 'closed', 'lost'])],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
