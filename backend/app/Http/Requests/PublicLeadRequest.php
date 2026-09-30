<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PublicLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('idempotencyKey')) $this->merge(['idempotency_key' => $this->input('idempotencyKey')]);
    }

    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(['quote', 'contact', 'dealer'])],
            'name' => ['required', 'string', 'max:180'],
            'company' => ['nullable', 'string', 'max:180'],
            'email' => ['nullable', 'email:rfc', 'max:180'],
            'phone' => ['nullable', 'string', 'max:50'],
            'source' => ['nullable', 'string', 'max:120'],
            'payload' => ['nullable', 'array', 'max:50'],
            'message' => ['nullable', 'string', 'max:5000'],
            'idempotency_key' => ['required', 'string', 'max:100'],
        ];
    }
}
