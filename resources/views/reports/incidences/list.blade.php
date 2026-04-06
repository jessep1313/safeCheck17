<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Control de Incidencias</title>
    <style>
        @page {
            margin: 20mm 15mm 25mm 15mm;
        }

        html,
        body {
            margin: 0 !important;
            padding: 20px 30px;
        }

        h1,
        p,
        div,
        span,
        table,
        tr,
        td,
        th {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
        }

        thead {
            display: table-header-group;
        }

        tfoot {
            display: table-footer-group;
        }

        tbody {
            display: table-row-group;
        }

        .table-data {
            border-collapse: collapse;
            width: 100%;
            font-size: 11px !important;
        }

        .table-data th {
            background: black;
            color: white;
            padding: 5px;
        }

        .table-data th,
        .table-data td {
            border: 1px solid black;
            text-align: left;
        }

        table th,
        table td {
            padding: 5px;
            vertical-align: top;
        }

        tr {
            page-break-inside: avoid;
        }

        .page-header {
            margin-bottom: 20px;
        }

        .page-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            padding: 10px 0;
            border-top: 1px solid #ccc;
        }

        .page-footer:after {
            counter-increment: page;
            content: "Página " counter(page);
            margin-left: auto !important;
        }

        .td-comments * {
            padding: 0px !important;
            margin: 0px !important;
        }

        body {
            margin-bottom: 50px;
        }
    </style>
</head>

<body>
    <div class="page-header">
        <h1
            style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase;">
            Control de Incidencias
        </h1>

        <table style="width: 100%; text-transform: uppercase;">
            <tbody>
                <tr align="end">
                    <td colspan="4">
                        <img src="{{ public_path('assets/images/logoipsum-388.png') }}" alt="Logotipo de la empresa"
                            style="height: 30px;">
                    </td>
                    <td style="text-align: right;"><span style="margin-top: 10px; display: block;">Planta:</span></td>
                    <td colspan="3" style="border-bottom: 1px solid black; min-width: 150px;"></td>
                </tr>
                <tr>
                    <td colspan="4" style="font-weight: bold;">
                        SafeCheck - Reporte de Incidencias
                    </td>
                    <td style="text-align: right;">Fecha:</td>
                    <td style="border-bottom: 1px solid black; min-width: 80px;"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <table style="text-transform: uppercase; width: 100%;" class="table-data">
        <thead>
            <tr>
                <th>No.</th>
                <th>Tipo</th>
                <th>Fecha de Creación</th>
                <th>Comentarios</th>
                <th>Evidencias</th>
                <th>Estado Plan</th>
                <th>Plan Finalizado</th>
            </tr>
        </thead>
        <tbody style="text-transform: none;">
            @foreach ($incidences as $incidence)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $incidence['type'] }}</td>
                    <td>{{ $incidence['created_at'] }}</td>
                    <td class="td-comments">{!! $incidence['comments'] ?? 'Sin comentarios' !!}</td>
                    <td>{{ $incidence['evidences'] ?? 'Sin evidencias' }}</td>
                    <td>{{ $incidence['plan_status'] ?? 'Sin plan' }}</td>
                    <td>{{ $incidence['plan_finished_at'] ?? 'N/A' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="page-footer">
        Fecha de impresión: {{ date('d/m/Y, h:i a') }} |
    </div>
</body>

</html>