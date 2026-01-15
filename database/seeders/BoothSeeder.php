<?php

namespace Database\Seeders;

use App\Models\Booth;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BoothSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $booths = ["Norte",  "Sur", "Este", "Oeste"];
        foreach($booths as $booth) {
            Booth::createOrFirst(["name" => $booth],["name" => $booth]);
        }
    }
}
