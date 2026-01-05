<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::create([
            'name' => 'Super administrador',
            'email' => 'superadmin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678')
        ]);
        
        $superAdmin->assignRole('Super Admin');
    }
}
