<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Control de Acceso - SafeCheck</title>
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
        background-color: black;
        color: white;
        font-size: 1rem;
    }

    .head-subtitle {
        font-weight: bold;
        text-transform: uppercase;
        background-color: gray;
        color: black;
        font-size: 1rem;
    }

    .td-comments * {
        padding: 0px !important;
        margin: 0px !important;
    }
</style>

<body>

    <table align="middle">
        <tr>
            <td rowspan="3" style="text-align: center; width: 15%;">
                <img src="{{ public_path('assets/images/logoipsum-388.png') }}" alt="Logo" width="100" class="">
            </td>
            <td style="text-transform: uppercase; font-weight: bold; text-align: center; width: 36%; font-size: 14px;"
                rowspan="3">
                Formato de control de acceso</td>
            <td style="width: 29%"><strong>UUID:</strong> {{ $access->uuid }}</td>
        </tr>
        <tr>
            <td><strong>Autorizado por:</strong> {{ $access->userBy->name }}</td>
        </tr>
        <tr>
            <td><strong>Fecha de emisión: </strong>{{ now()->format('d/m/Y H:i:s') }}</td>
        </tr>
        <tr>
            <td colspan="3" height="12"></td>
        </tr>
    </table>

    {{-- Datos de visita --}}
    <table>
        <thead>
            <tr>
                <th colspan="2" class="head-title">Datos de visita</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="8" style="text-align: center;">
                    <img src="{{ public_path('storage/' . $access->identification) }}" alt="Logo"
                        style="max-width: 250px; max-height: 150px; width: 100%; height: 100%;">
                </td>
                <td style="width: 60%;"><strong>Contratista: </strong>{{ $access->contractor }}</td>
            </tr>
            <tr>
                <td style="width: 60%"><strong>Asunto: </strong>{{ $access->motive }}</td>
            </tr>
            <tr>
                <td style="width: 60%;"><strong>Visitante: </strong>{{ $access->name }}</td>
            </tr>
            <tr>
                <td style="width: 60%;"><strong>A quien visita: </strong>{{ $access->who_visits }}</td>
            </tr>
            <tr>
                <td style="width: 60%;"><strong>Edificio: </strong>{{ $access->building->name }}</td>
            </tr>
            <tr>
                <td style="width: 60%;"><strong>Caseta: </strong>{{ $access->booth->name }}</td>
            </tr>
            <tr>
                <td><strong>Fecha/Ingreso:</strong> {{ $access->created_at->format('d/m/Y H:i:s') }}</td>
            </tr>
            <tr>
                <td><strong>Fecha/Salida:</strong>
                    {{ $access->check_out?->format('d/m/Y H:i:s') ?? "--/--/---- --:--:--" }}
                </td>
            </tr>
            <tr>
                <td colspan="2" height="12"></td>
            </tr>
        </tbody>
    </table>

    {{-- Transportes --}}
    @if ($access->vehicles->count() > 0)
        <table>
            <thead>
                <tr>
                    <th colspan="3" class="head-title">Datos del transporte</th>
                </tr>
                <tr>
                    <th style="text-align: left;">Placa</th>
                    <th style="text-align: left;">Modelo</th>
                    <th style="text-align: left;">Color</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($access->vehicles as $row)
                    <tr>
                        <td>{{ $row->plate }}</td>
                        <td>{{ $row->model }}</td>
                        <td>{{ $row->color }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="3" height="12"></td>
                </tr>
            </tbody>
        </table>
    @endif

    @if($access->devices)
        <table>
            <thead>
                <tr>
                    <th colspan="4" class="head-title">Dispositivos ingresados</th>
                </tr>
                <tr>
                    <th style="text-align: left;">Tipo</th>
                    <th style="text-align: left;">Marca</th>
                    <th style="text-align: left;">Modelo</th>
                    <th style="text-align: right;">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($access->devices as $row)
                    <tr>
                        <td>{{ $row->type }}</td>
                        <td>{{ $row->brand }}</td>
                        <td>{{ $row->model }}</td>
                        <td style="text-align: right;">{{ $row->quantity }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="4" height="12"></td>
                </tr>
            </tbody>
        </table>
    @endif

    {{-- Herramientas --}}
    @if ($access->tools->count() > 0)
        <table>
            <thead>
                <tr>
                    <th colspan="4" class="head-title">Herramientas ingresadas</th>
                </tr>
                <tr>
                    <th style="text-align: left;">Tipo</th>
                    <th style="text-align: left;">Marca</th>
                    <th style="text-align: left;">Modelo</th>
                    <th style="text-align: right;">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($access->tools as $row)
                    <tr>
                        <td>{{ $row->type }}</td>
                        <td>{{ $row->brand }}</td>
                        <td>{{ $row->model }}</td>
                        <td style="text-align: right;">{{ $row->quantity }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="4" height="12"></td>
                </tr>
            </tbody>
        </table>
    @endif

    {{-- Observaciones --}}
    <table>
        <tr>
            <th class="head-title">Observaciones</th>
        </tr>
        <tr>
            <td style="min-height: 100px;" height="60">{{ $access->observations }}</td>
        </tr>
    </table>

</body>

</html>