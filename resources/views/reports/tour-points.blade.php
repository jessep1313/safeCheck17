<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formato de recorridos</title>
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


<body>
    {{-- Header --}}
    <table>
        <thead>
            <tr>
                <th width="20%" rowspan="3">Logo</th>
                <th width="50%" rowspan="3" style="text-transform: uppercase; font-size: 1.1rem;">Formato de recorridos
                    de planta
                </th>
                <th style="text-align: left; font-weight: 400;" width="30%">
                    <strong>Folio:</strong><br />{{ $tour->uuid }}
                </th>
            </tr>
            <tr>
                <th style="text-align: left; font-weight: 400;">
                    <strong>Fecha:</strong> {{ $tour->created_at->format('d \d\e F \d\e Y') }}
                </th>
            </tr>
            <tr>
                <th style="text-align: left; font-weight: 400;">
                    <strong>Hora:</strong> {{ $tour->created_at->format('H:i:s') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3" style="color:transparent;">Espacio separador</td>
            </tr>
        </tbody>
    </table>

    {{-- Detalles --}}

    <table>
        <thead>
            <tr>
                <td>
                    <strong>Responsable:</strong> {{ $tour->responsed->name }}
                </td>
                <td>
                    <strong>Estado:</strong> {{ $tour->status }}
                </td>
                <td>
                    <strong>Tiempo:</strong> {{ $tour->duration }}
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3" style="color:transparent;">Espacio separador</td>
            </tr>
        </tbody>
    </table>

    {{-- Preguntas --}}

    <table>
        <thead>
            <tr class="head-title">
                <th colspan="4">Preguntas de inspección</th>
            </tr>
            <tr>
                <th style="width: 30%;text-align: left;">Pregunta</th>
                <th style="width: 15%;text-align: center;">Cumple</th>
                <th style="width: 15%;text-align: center;">No Cumple</th>
                <th style="width: 40%;text-align: left;">Observaciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($tour->points as $point)
                <tr>
                    <td style="width: 30%;text-align: left;">{{ $point->question }}</td>
                    <td style="width: 15%;text-align: center;">{{ $point->result ? "X" : "" }}</td>
                    <td style="width: 15%;text-align: center;">{{ !$point->result && $point->answered ? "X" : "" }}</td>
                    <td style="width: 40%;text-align: left;" class="td-comments">
                        {!! $point->answered && !$point->result ? $tour->comments : "" !!}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Más informacion --}}

    <table>
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