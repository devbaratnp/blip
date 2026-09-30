<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    protected function prepareForValidation(): void
    {
        $mapping = [
            'brandId' => 'brand_id',
            'categoryId' => 'category_id',
            'priceNpr' => 'price_npr',
            'quoteOnly' => 'quote_only',
            'shortSpecs' => 'short_specs',
            'imageAlt' => 'image_alt',
            'sortOrder' => 'sort_order',
        ];

        $normalized = [];
        foreach ($mapping as $from => $to) {
            if ($this->has($from)) $normalized[$to] = $this->input($from);
        }

        if ($normalized) $this->merge($normalized);
    }

    public function rules(): array
    {
        $product = $this->route('product');

        return [
            'name' => ['required', 'string', 'max:180'],
            'slug' => ['required', 'alpha_dash', 'max:180', Rule::unique('products', 'slug')->ignore($product)],
            'brand_id' => ['nullable', 'integer', 'exists:brands,id'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'model' => ['nullable', 'string', 'max:120'],
            'price_npr' => ['nullable', 'numeric', 'min:0'],
            'quote_only' => ['boolean'],
            'short_specs' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string', 'max:5000'],
            'features' => ['array', 'max:20'],
            'features.*' => ['string', 'max:180'],
            'image_alt' => ['nullable', 'string', 'max:180'],
            'badge' => ['nullable', 'string', 'max:80'],
            'availability' => ['required', 'string', 'max:80'],
            'featured' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
        ];
    }
}
