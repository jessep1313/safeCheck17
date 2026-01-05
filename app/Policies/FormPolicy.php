<?php

namespace App\Policies;

use App\Models\InspectForm;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FormPolicy
{
    public function before(User $user, string $ability)
    {
        if ($user->hasRole('Super Admin')) {
            return true;
        }
    }

    public function view(User $user, InspectForm $form): bool
    {
        return $user->can('ver formularios');
    }

    public function create(User $user): bool
    {
        return $user->can('crear formulario');
    }

    public function update(User $user, InspectForm $form): bool
    {
        return $user->can('editar formulario');
    }

    public function delete(User $user, InspectForm $form): bool
    {
        return $user->can('eliminar formulario');
    }

}
