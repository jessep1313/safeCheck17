<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserGroupUpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:125', 'min:3', 'unique:roles,name,' . $this->id],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', 'string', 'exists:permissions,name']
        ];
    }

    public function attributes() {
        return [
            'name' => 'nombre',
            'permissions' => 'permisos',
            'permissions.*' => 'permiso'
        ];
    }

    public function messages() {
        return ['permissions.required' => 'Selecciona al menos un permiso para editar el grupo'];
    }
}
