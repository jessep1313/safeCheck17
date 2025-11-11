<?php

namespace App\Http\Requests;

use App\Enums\InspectionType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SavePrepareRequest extends FormRequest
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
            'type' => ['required', Rule::enum(InspectionType::class)],
            'certification_id' => ['required', 'exists:certifications,id'],
            'vehicle_type_id' => ['required', 'exists:vehicle_types,id'],
            'trailer_quantity' => ['required', 'numeric', 'min:1', 'max:3']
        ];
    }

    public function attributes()
    {
        return [
            'inspection_type' => 'tipo de inspección',
            'certification_id' => 'certificado',
            'vehicle_type_id' => 'tipo de unidad',
            'trailer_quantity' => 'cantidad de remolques/cajas'
        ];
    }
}