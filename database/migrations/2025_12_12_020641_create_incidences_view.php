<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            "CREATE VIEW incidences_view AS
            (SELECT i.id, 'Inspeccion' type, i.uuid, p.comments, i.created_at, JSON_ARRAYAGG(e.path) as evidences
            FROM inspections i INNER JOIN inspection_points p ON p.inspection_id = i.id
            LEFT JOIN inspection_evidence e ON e.inspection_id = i.id
            WHERE p.result = false AND p.answered = true AND i.status = 'Rechazado'
            GROUP BY i.id, i.uuid, p.comments, i.created_at)
            UNION ALL
            (SELECT t.id, 'Recorrido' type, t.uuid, t.comments, t.created_at, JSON_ARRAYAGG(e.path) as evidences
            FROM tours t LEFT JOIN tour_evidences e ON e.tour_id = t.id
            WHERE t.status = 'Rechazado'
            GROUP BY t.id, t.uuid, t.comments, t.created_at)"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW incidences_view");
    }
};
