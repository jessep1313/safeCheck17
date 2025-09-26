<?php

namespace App\Http\Controllers;

use App\Models\StorageTemp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    public function store (request $request) {

        $request->validate([
            'file' => 'required|file|image|max:10240'
        ]);

        try {

            if($request->hasFile('file')) {

                $file = $request->file(('file'));
                $fileOriginalName = $file->getClientOriginalName();
                $fileMimeType = $file->getMimeType();
                $fileKey = uniqid('file_');
                $fileName = $fileKey . '.' . $file->extension();
                $fileSize = $file->getSize();
                $destroy = now()->addHour();
                $path = $file->storeAs('', $fileName, 'temp');

                $record = StorageTemp::create([
                    'key' => $fileKey,
                    'original_filename' => $fileOriginalName,
                    'filename' => $fileName,
                    'file_size' => $fileSize,
                    'mime_type' => $fileMimeType,
                    'destroy_at' => $destroy,
                    'path' => $path
                ]);

                Log::info("Se ha generado un temporal", [
                    "record" => $record
                ]);
                return $path;
            }
        } catch (\Exception $e) {
            Log::error("Error al guardar el temporal", [
                "error" => $e->getMessage()
            ]);
            abort(500);
        }
    }

    public function destroy (string $key) {
        Log::info('Se ha eliminado un temporal', [
            'key' => $key
        ]);
    }
}
