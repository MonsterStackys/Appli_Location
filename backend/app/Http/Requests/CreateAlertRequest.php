<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class CreateAlertRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        return response()->json($validator->errors());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'location' => 'required|string',
            'property_type' => 'nullable|string',
            'type' => 'nullable|string',
            'max_price' => 'nullable|numeric',
            'min_area' => 'nullable|numeric'
        ];
    }

    public function messages()
    {
        return [
            'location.string' => 'La localisation doit être une chaîne de caractères',
            'location.required' => 'La localisation est obligatoire',
            'max_price.numeric' => 'Le prix maximum doit être un nombre',
            'min_area.numeric' => 'La surface minimum doit être un nombre'
        ];
    }
}
