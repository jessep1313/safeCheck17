<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAccessToolRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'type' => ['required','string', 'max:50'],
            'brand' => ['required','string', 'max:50'],
            'model' => ['required','string', 'max:50'],
            'quantity' => ['required','numeric', 'min:1'],
        ];
    }

    public function attributes () {
        return [
            'type' => 'tipo',
            'brand' => 'marca',
            'model' => 'modelo',
            'quantity' => 'cantidad',
        ];
    }
}
