<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeadNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return ['body' => ['required', 'string', 'max:3000']];
    }
}
