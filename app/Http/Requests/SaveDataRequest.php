<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SaveDataRequest extends FormRequest
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
            'company_transport' => ['required', 'string', 'min:4', 'max:100'],
            'company_property' => ['required', 'string', 'min:4', 'max:100'],
            'plate_number' => ['required', 'string', 'max:20'],
            'customer_name' => ['required', 'string', 'max:125', 'min:8'],
            'driver_name' => ['required', 'string', 'min:8', 'max:125'],
            'guard_name' => ['required', 'string', 'min:8', 'max:125'],
            'trailers' => ['bail', 'required', 'array', 'min:1'],
            'trailers.*.id' => ['nullable', 'integer', 'exists:inspection_trailers,id'],
            'trailers.*.plate' => ['bail', 'required', 'string', 'max:20'],
            'trailers.*.vin' => ['bail', 'required', 'string', 'max:20'],
            'trailers.*.seil' => ['bail', 'required', 'string', 'max:40'],
        ];
    }

    public function attributes()
    {
        return [
            'company_transport' => 'compañia transportadora',
            'company_property' => 'compañia propietaria',
            'plate_number' => 'número de placa',
            'customer_name' => 'nombre de cliente',
            'driver_name' => 'nombre de conductor',
            'guard_name' => 'nombre de guardia',
            'trailers' => 'remolques/cajas',
            'trailers.*.id' => 'ID del remolque',
            'trailers.*.plate' => 'placas del remolque/caja',
            'trailers.*.vin' => 'VIN del remolque/caja',
            'trailers.*.seil' => 'sello del remolque/caja',
        ];
    }

    public function messages(): array
    {
        return [
            'trailers.required' => 'Debes enviar al menos un remolque/caja.',
            'trailers.array' => 'El campo remolques/cajas tiene un formato inválido.',
            'trailers.min' => 'Debes enviar al menos un remolque/caja.',
        ];
    }
}
