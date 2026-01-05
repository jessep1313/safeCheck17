<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserGroupStoreRequest;
use App\Http\Requests\UserGroupUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserGroupController extends Controller
{
    public function index (Request $request) {

        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search', '');
        $sortBy = $request->input('sort_by', 'created_at');
        $sort = $request->input('sort', 'desc');

        $roles = Role::orderBy($sortBy, $sort)
        ->where('name', 'like', "%$search%")
        ->whereNot('id', 1)
        ->paginate(page: $page, perPage: $perPage)
        ->through(fn($role) => [
            "id" => $role->id,
            "name" => $role->name,
            "permissions" => $role->permissions()->count(),
            "users" => $role->users()->count(),
            "created_at" => $role->created_at->format('d/m/Y, h:i a'),
            "updated_at" => $role->updated_at->format('d/m/Y, h:i a'),
        ]);
        return Inertia::render('groups/home', [
            'paginator' => $roles,
            'filter' => [
                'per_page' => $perPage,
                'page' => $page,
                'sort_by' => $sortBy,
                'sort' => $sort,
                'search' => $search
            ]
        ]);
    }

    public function create () {
        $permissions = Permission::select(['id', 'name'])->get();
        return Inertia::render('groups/create',[
            'permissions' => $permissions
        ]);
    }


    public function store (UserGroupStoreRequest $request) {
        $role = Role::create([
            'name' => $request->name
        ]);
        $role->givePermissionTo($request->permissions);
        return redirect()->route('groups.home');
    }

    
    public function edit (string $id) {
        $role = Role::findOrFail($id);
        $rolePermissions = $role->permissions->pluck('name');
        $permissions = Permission::select(['id', 'name'])->get();
        return Inertia::render('groups/edit', [
            'role' => [
                "id" => $role->id,
                "name" => $role->name,
                "permissions" => $rolePermissions
            ],
            'permissions' => $permissions
        ]);
    }

    public function update(UserGroupUpdateRequest $request, string $id) {
        $role = Role::findOrFail($id);
        $role->update([
            'name' => $request->name
        ]);
        $role->syncPermissions($request->permissions);
        return redirect()->route('groups.home');
    }


    public function delete(string $id) {
        if($id === "1" || $id === 1) {
            return abort(401, "No puedes eliminar el usuario Root");
        }
        Role::destroy($id);
        return redirect()->route('groups.home');
    }
}
