<!DOCTYPE html>
<html lang="es-MX">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puntos de inspección</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
        }

        body {
            padding: 20px 32px;
        }

        h1 {
            font-size: 24px !important;
        }

        h2 {
            font-size: 18px !important;
            margin-bottom: 4px !important;
        }

        h3 {
            font-size: 14px !important;
            margin-bottom: 2px !important;
        }

        section {
            margin-top: 20px !important;
            display: block;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        table th,
        table td {
            padding: 6px;
            text-align: left;
            vertical-align: top;
            word-break: break-word;
        }

        table thead tr {
            background: #f1f1f1;
        }

        .page-break {
            page-break-after: always;
        }

        p {
            margin-bottom: 3px !important;
        }
    </style>
</head>

<body>
    <article>
        <header>
            <h1>Inspección de unidad</h1>
            <p><strong>UUID:</strong> {{ $inspection->uuid }}</p>
        </header>

        <!-- Datos de inspección -->
        <section>
            <h2>Datos de inspección</h2>
            <p><strong>Estado:</strong> {{ $inspection->status }}</p>

            <table>
                <tr>
                    <td>
                        <h3>Tipo de inspección</h3>
                        <p>{{ $inspection->type }}</p>
                    </td>
                    <td>
                        <h3>Certificado</h3>
                        <p>{{ $inspection->certification->name }}</p>
                    </td>
                    <td>
                        <h3>Compañía transportista</h3>
                        <p>{{ $inspection->company_transport }}</p>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h3>Compañía propietaria</h3>
                        <p>{{ $inspection->company_property }}</p>
                    </td>
                    <td>
                        <h3>Creado por</h3>
                        <p>{{ $inspection->user->name }}</p>
                    </td>
                    <td>
                        <h3>Fecha de inspección</h3>
                        <p>{{ $inspection->created_at->format('d-M-Y, h:i a') }}</p>
                    </td>
                </tr>
            </table>
        </section>

        <!-- Participantes -->
        <section>
            <h2>Participantes</h2>

            <table>
                <thead>
                    <tr>
                        <th>Guardia</th>
                        <th>Cliente</th>
                        <th>Conductor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $inspection->guard_name }}</td>
                        <td>{{ $inspection->customer_name }}</td>
                        <td>{{ $inspection->driver_name }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- Transporte -->
        <section>
            <h2>Datos de transporte</h2>
            <p><strong>Placas:</strong> {{ $inspection->plate_number }} |
                <strong>Tipo de unidad:</strong> {{ $inspection->vehicleType->name }}
            </p>

            <table>
                <thead>
                    <tr>
                        <th colspan="4" style="font-size: 16px; padding-bottom: 6px;">Remolques / Cajas</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Placas</th>
                        <th>VIN / Serie</th>
                        <th>No. Sello</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($inspection->trailers as $i => $trailer)
                        <tr>
                            <td>{{ $i + 1 }}</td>
                            <td>{{ $trailer->plate }}</td>
                            <td>{{ $trailer->vin }}</td>
                            <td>{{ $trailer->seal ?? "No proporcionado" }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

        <!-- Puntos de inspección -->
        <section>
            <h2>Preguntas de inspección</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Concepto</th>
                        <th>OK</th>
                        <th>Comentarios</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($inspection->points as $point)
                        <tr>
                            <td>{{ $point->number }}</td>
                            <td>{{ $point->field->label }}</td>
                            <td>
                                @if ($point->answered && $point->result)
                                    SI
                                @elseif ($point->answered && !$point->result)
                                    NO
                                @else
                                    --
                                @endif
                            </td>
                            <td style="max-width: 250px !important;">{!! $point->comments ?? "---" !!}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

    </article>
</body>

</html>