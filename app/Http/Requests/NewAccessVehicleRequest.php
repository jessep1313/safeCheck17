<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class NewAccessVehicleRequest extends FormRequest
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
            'plate' => 'required|string|max:20',
            'model' => 'required|string|max:70',
            'color' => 'required|string|max:45',
        ];
    }

    public function attributes() {
        return [
            'plate' => 'placa',
            'model' => 'modelo',
            'color' => 'color',
        ];
    }
}
