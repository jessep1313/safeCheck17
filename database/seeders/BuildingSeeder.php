<?php

namespace Database\Seeders;

use App\Models\Building;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $buildings = ["Edificio 1", "Edificio 2", "Edificio 3"];

        foreach($buildings as $building) {
            Building::createOrFirst(["name" => $building], ["name" => $building]);
        }
    }
}
