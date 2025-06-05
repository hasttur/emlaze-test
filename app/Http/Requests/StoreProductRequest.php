<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sku' =>        ['required', 'integer', 'unique:products,sku'],
            'name' =>       ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quantity' =>   ['required', 'numeric', 'min:1'],
            'price' =>      ['required', 'numeric', 'min:1'],
            'total' =>      ['required', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'sku.required' =>   'El código SKU es obligatorio.',
            'sku.integer' =>    'El código SKU debe ser un número entero.',
            'sku.unique' =>     'Ya existe un producto con este código SKU.',
            'name.required' =>  'El nombre del producto es obligatorio.',
            'quantity.required' => 'La cantidad es obligatoria.',
            'quantity.min' =>   'La cantidad debe ser al menos 1.',
            'price.required' => 'El precio es obligatorio.',
            'price.min' =>      'El precio debe ser al menos 1.',
            'total.required' => 'El total es obligatorio.',
        ];
    }
}
