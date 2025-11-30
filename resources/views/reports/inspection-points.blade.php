<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<style>
    :root {
        font-size: 12px;
    }

    html,
    body {
        margin: 0;
        padding: 20px;
    }

    * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    table {
        display: table;
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
    }

    table tr th,
    table tr td {
        border: 1px solid black;
    }

    .head-title {
        font-weight: bold;
        text-transform: uppercase;
        background-color: #061652;
        color: white;
        font-size: 1rem;
    }

    .head-subtitle {
        font-weight: bold;
        text-transform: uppercase;
        background-color: #b3b3b3;
        color: black;
        font-size: 1rem;
    }

    .td-comments * {
        padding: 0px !important;
        margin: 0px !important;
    }
</style>

@php
    $vehiclePoints = $inspection->points()->vehiclePoints()->orderBy('number')->get();
    $trailerPoints = $inspection->points()->trailerPoints()->orderBy('number')->get();
    $trailers = [];
    $perPart = ceil($trailerPoints->count() / $inspection->trailer_quantity);
    $trailerIndex = 0;
    for ($i = 0; $i < $inspection->trailer_quantity; $i++) {
        for ($j = 0; $j < $perPart; $j++) {
            $trailers[$i][$j] = $trailerPoints[$trailerIndex];
            $trailerIndex++;
        }
    }
@endphp

<body>
    {{-- Header --}}
    <table>
        <thead>
            <tr>
                <th width="20%" rowspan="3">Logo</th>
                <th width="50%" rowspan="3" style="text-transform: uppercase; font-size: 1.1rem;">Formato de inspección
                    de compartimentos
                    ocultos
                </th>
                <th style="text-align: left; font-weight: 400;" width="30%">
                    <strong>Folio:</strong><br />{{ $inspection->uuid }}
                </th>
            </tr>
            <tr>
                <th style="text-align: left; font-weight: 400;">
                    <strong>Fecha:</strong> {{ $inspection->created_at->format('d/m/Y') }}
                </th>
            </tr>
            <tr>
                <th style="text-align: left; font-weight: 400;">
                    <strong>Hora:</strong> {{ $inspection->created_at->format('H:i:s') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3" style="color:transparent;">Espacio separador</td>
            </tr>
        </tbody>
    </table>

    {{-- Medios de transporte --}}

    <table>
        <thead>
            <tr>
                <th colspan="2" class="head-title">Datos de los medios de transporte</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width="50%"><strong>Linea de transporte:</strong> {{ $inspection->company_transport }}</td>
                <td width="50%"><strong>Placa de remolque/caja 1:</strong> {{  $inspection->trailers[0]?->plate ?? '' }}
                </td>
            </tr>
            <tr>
                <td width="50%"><strong>Propietario de carga:</strong> {{ $inspection->company_property }}</td>
                <td width="50%"><strong>Placa de remolque/caja 2:</strong> {{ $inspection->trailers[1]?->plate ?? '' }}
                </td>
            </tr>
            <tr>
                <td width="50%"><strong>Placas de unidad:</strong> {{ $inspection->plate_number }}</td>
                <td width="50%"><strong>Sello de remolque/caja 1:</strong> {{ $inspection->trailers[0]?->seal ?? '' }}
                </td>
            </tr>
            <tr>
                <td width="50%"><strong>No. De remolques/cajas:</strong> {{ $inspection->trailer_quantity }}</td>
                <td width="50%"><strong>Sello de remolque/caja 2:</strong> {{ $inspection->trailers[1]?->seal ?? '' }}
                </td>
            </tr>
            <tr>
                <td colspan="2"><strong>Cliente:</strong> {{ $inspection->customer_name }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Guardia:</strong> {{ $inspection->guard_name }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Conductor:</strong> {{ $inspection->driver_name }}</td>
            </tr>
            <tr>
                <td colspan="2" style="color:transparent;">Espacio separador</td>
            </tr>
        </tbody>
    </table>

    {{-- Puntos de inspeccion --}}

    <table>
        <thead>
            <tr>
                <th colspan="4" class="head-title">Puntos de inspección</th>
            </tr>
            <tr>
                <th colspan="4" class="head-subtitle">Tracto</th>
            </tr>
            <tr>
                <th width="30%" style="text-align: left;">Punto a Revisar</th>
                <th width="15%">Cumple</th>
                <th width="15%">No Cumple</th>
                <th width="40%" style="text-align: left;">Observaciones</th>
            </tr>
        </thead>
        {{-- Tracto --}}
        <tbody>
            @foreach ($vehiclePoints as $point)
                <tr>
                    <td>{{ $point->number }}. {{ $point->field->label }}</td>
                    <td align="center">{{ $point->result ? 'x' : '' }}</td>
                    <td align="center">{{ !$point->result && $point->answered ? 'x' : '' }}</td>
                    <td class="td-comments">{!! $point->comments !!}</td>
                </tr>
            @endforeach

        </tbody>
        {{-- Remolques --}}
        @foreach ($trailers as $trailer)
            <thead>
                <tr>
                    <th colspan="4" class="head-subtitle">Remolque/Caja {{ $loop->iteration }}</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($trailer as $point)
                    <tr>
                        <td>{{ $point->number }}. {{ $point->field->label }}</td>
                        <td align="center">{{ $point->result ? 'x' : '' }}</td>
                        <td align="center">{{ !$point->result && $point->answered ? 'x' : '' }}</td>
                        <td class="td-comments">{!! $point->comments !!}</td>
                    </tr>
                @endforeach
            </tbody>
        @endforeach
        <tbody>
            <tr>
                <td colspan="4" style="color:transparent;">Espacio separador</td>
            </tr>
            <tr>
                <td colspan="4">Certifico haber llevado a cabo la inspección de seguridad del tracto camión y remolque,
                    y en lo que
                    a mi concierne
                    considero que el mismo se encuentra libre de mercancía no documentada, ya que no fueron encontradas
                    evidencias de modificaciones en estructuras, señales de reparaciones dudosas y/o de apertura del
                    remolque.
                    Si la caja/contenedor ingrese vacía, indique el No. de sello colocado al final de la inspección:
                </td>
            </tr>
        </tbody>
    </table>

</body>

</html>