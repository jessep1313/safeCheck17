<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listPermissions = [
            // Formulario dinamico
            ["name" => "ver formularios"],
            ["name" => "crear formulario"],
            ["name" => "editar formulario"],
            ["name" => "eliminar formulario"],
            // Inspección digital
            ["name" => "ver inspecciones digitales"],
            ["name" => "crear inspeccion digital"],
            // Bitacora de recorridos
            ["name" => "ver bitacoras de recorrido"],
            ["name" => "crear bitacora de recorrido"],
            ["name" => "modificar checklist de recorrido"],
            // Auditoria
            ["name" => "crear auditoria de inspeccion digital"],
            ["name" => "crear auditoria de bitacora de recorrido"],
            ["name" => "auditar inspeccion digital"],
            ["name" => "auditar de bitacora de recorrido"],
            // Control de acceso
            ["name" => "ver control de acceso"],
            ["name" => "administrar control de acceso"],
            // Control de incidencias
            ["name" => "ver control de incidencias"],
            ["name" => "crear plan de accion"],
            // Catalogos (camiones)
            ["name" => "ver tipo de camiones"],
            ["name" => "crear tipo de camiones"],
            ["name" => "editar tipo de camiones"],
            ["name" => "eliminar tipo de camiones"],
            // Catalogos (certificados)
            ["name" => "ver certificados"],
            ["name" => "crear certificado"],
            ["name" => "editar certificados"],
            ["name" => "eliminar certificados"],
            // Catalogos (usuarios)
            ["name" => "ver usuarios"],
            ["name" => "crear usuarios"],
            ["name" => "editar usuarios"],
            ["name" => "eliminar usuario"],
            ["name" => "restablecer clave de usuario"],
            // Grupos
            ["name" => "ver grupos"],
            ["name" => "crear grupos"],
            ["name" => "editar grupos"],
            ["name" => "eliminar grupos"]
        ];

        foreach($listPermissions as $permission) {
            Permission::firstOrCreate($permission, $permission);
        }

        $superAdminRol = Role::create([
            'name' => 'Super Admin'
        ]);

        $permissions = Permission::get();
        $superAdminRol->syncPermissions($permissions);

    }
}
