<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateStore;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(request $request)
    {
        $search = $request->input('search', "");
        $perPage = $request->input('per_page', 15);
        $page = $request->input('page', 1);
        $sortBy = $request->input('sort_by', 'created_at');
        $sort = $request->input('sort', 'desc');

        $paginator = User::select(['id', 'email', 'name', 'created_at', 'updated_at', 'email_verified_at'])
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->where('id', '!=', Auth::id())
            ->paginate($perPage)
            ->through(fn($record) => [
                "id" => $record->id,
                "name" => $record->name,
                "email" => $record->email,
                "email_verified_at" => $record->email_verified_at
                    ? $record->email_verified_at->format('d/m/y, h:ia')
                    : "No verificado",
                "created_at" => $record->created_at->format('d/m/y, h:ia'),
                "updated_at" => $record->updated_at->format('d/m/y, h:ia'),
            ]);

        return Inertia::render('catalog/users/home', [
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $page,
                "sort" => $sort,
                "sort_by" => $sortBy,
                "search" => $search
            ]
        ]);
    }

    public function store(UserCreateStore $request)
    {
        $body = $request->all();
        $body["password"] = Str::random(8);
        try {
            $record = User::create($body);
            Log::info("Se ha creado un nuevo usuario", [
                "record" => $record
            ]);
        } catch (\Exception $e) {
            Log::error("Ocurrio un error al crear el usuario", [
                "error" => $e->getMessage(),
                "request" => $body
            ]);
        }
        return redirect()->back();
    }

    public function update(UserUpdateRequest $request, string $id)
    {
        $body = $request->all();
        try {
            $user = User::findOrFail($id);
            $user->update($body);
            $user->refresh();
            Log::info("Se actualizo un usuario", [
                "record" => $user,
            ]);
        } catch (\Exception $e) {
            Log::error("Ocurrio un error al actualizar el usuario", [
                "error" => $e->getMessage(),
                "request" => $body
            ]);
        }
        return redirect()->back();

    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        try {
            $user->delete();
            Log::info("Se ha eliminado un usuario", [
                "record" => $user
            ]);
        } catch (\Exception $e) {
            Log::error("Error al eliminar el usuario", [
                "error" => $e->getMessage(),
                "record" => $user
            ]);
        }
        return redirect()->back();

    }
}
