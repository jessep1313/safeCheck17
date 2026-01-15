<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AccessCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "building_id" => ['required', 'numeric', 'exists:buildings,id'],
            "booth_id" => ['required', 'numeric', 'exists:booths,id'],
            "name" => ['required', 'string', 'max:125'],
            "contractor" => ['nullable','string', 'max:125'],
            "motive" => ['required', 'string', 'max:100'],
            'expires' => ['required', 'date'],
        ];
    }

    public function attributes() {
        return [
            "building_id" => "planta/edificio",
            "booth_id" => "caseta de vigilancia",
            "name" => "nombre de la persona",
            "contractor" => "contratista",
            "motive" => "motivo de visita",
            "expires" => "fecha/hora de salida"
        ];
    }
}
