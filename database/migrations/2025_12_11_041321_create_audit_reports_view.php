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
        DB::statement("
        CREATE VIEW audit_reports_view AS
        SELECT ai.id, ai.audit_id, ai.uuid, a.type, ai.status, a.created_by_id, u.name user_audit, ai.created_at, ai.updated_at FROM audits a INNER JOIN audit_inspections ai ON ai.audit_id = a.id INNER JOIN users u ON u.id = a.created_by_id
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW audit_reports_view");
    }
};
