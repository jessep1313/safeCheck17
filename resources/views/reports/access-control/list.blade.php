<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Control de entrada y salida de personas</title>
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

        /* Header que se repite en cada página */
        thead {
            display: table-header-group;
        }

        /* Footer que se repite en cada página */
        tfoot {
            display: table-footer-group;
        }

        tbody {
            display: table-row-group;
        }

        .table-data {
            border-collapse: collapse;
            width: 100%;
            font-size: 12px !important;
        }

        .table-data th {
            background: black;
            color: white;
            padding: 4px;
        }

        .table-data th,
        .table-data td {
            border: 1px solid black;
            text-align: left;
        }

        table th,
        table td {
            padding: 4px;
        }

        /* Evitar que las filas se corten entre páginas */
        tr {
            page-break-inside: avoid;
        }

        /* Encabezado de página */
        .page-header {
            margin-bottom: 20px;
        }

        /* Pie de página */
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

        /* Contador de páginas */
        .page-footer:after {
            counter-increment: page;
            content: "Página " counter(page);
            margin-left: auto !important;
        }

        /* Espacio para el footer fijo */
        body {
            margin-bottom: 50px;
        }
    </style>
</head>

<body>
    {{-- Encabezado --}}
    <div class="page-header">
        <h1
            style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase;">
            Control de entrada y salida de personas
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
                        Recursos Humanos, Organización y Sistemas
                    </td>
                    <td style="text-align: right;">Desde:</td>
                    <td style="border-bottom: 1px solid black; min-width: 80px;"></td>
                    <td style="text-align: right; padding-left: 10px;">Hasta:</td>
                    <td style="border-bottom: 1px solid black; min-width: 80px;"></td>
                </tr>
            </tbody>
        </table>
    </div>

    {{-- Tabla de datos --}}
    <table style="text-transform: uppercase; width: 100%;" class="table-data">
        <thead>
            <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Ingreso el</th>
                <th>Asunto</th>
                <th>Autorizo ingreso</th>
                <th>Salio el</th>
                <th>Vehículo</th>
            </tr>
        </thead>
        <tbody style="text-transform: none;">
            @foreach ($accesses as $access)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $access['name'] }}</td>
                    <td>{{ $access['checkIn'] }}</td>
                    <td>{{ $access['motive'] }}</td>
                    <td>{{ $access['authorizedBy'] }}</td>
                    <td>{{ $access['checkOut'] }}</td>
                    <td>{{ $access['vehicle'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Pie de página --}}
    <div class="page-footer">
        Fecha de impresión: {{ date('d/m/Y, h:i a') }} |
    </div>
</body>

</html>