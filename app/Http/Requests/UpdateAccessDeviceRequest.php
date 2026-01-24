<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAccessDeviceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'max:100'],
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'quantity' => ['required', 'integer', 'min:1'],
            
        ];
    }

    public function attributes() {
        return [
            'type' => 'tipo de dispositivo',
            'brand' => 'marca',
            'model' => 'modelo',
            'quantity' => 'cantidad'
        ];
    }
}
