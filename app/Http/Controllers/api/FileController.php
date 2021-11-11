<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index()
    {
        return response()->json(File::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:6'
        ]);

        $nameFile = null;

        if ($request->hasFile('document') && $request->file('document')->isValid()) {
            $name = date('YmdHis') . '_' . $request->name;
            $extension = $request->document->extension();
            $nameFile = "{$name}.{$extension}";

            $path = $request->document->storeAs('documents', $nameFile);

            if (!$path) {
                return response()->json(['error' => 'Falha ao fazer o upload do arquivo.'], 404);
            }

            $file = new File();
            $file->name = $name;
            $file->path = $path;
            $file->description = $request->description;
            $file->save();

            return response()->json($file, 201);
        } else {
            return response()->json(['error' => 'Arquivo não encontrado'], 404);
        }
    }

    public function show(int $id)
    {
        $file = File::find($id);
        if (is_object($file)) {
            return response()->json($file, 201);
        } else {
            return response()->json(['error' => 'Arquivo não encontrado.'], 404);
        }
    }

    public function destroy(int $id)
    {
        $file = File::find($id);

        if (is_object($file)) {
            if (!Storage::exists($file->path)) {
                return response()->json(['error' => 'Arquivo não existe.'], 404);
            }

            if (!Storage::delete($file->path)) {
                return response()->json(['error' => 'Não foi possívle excluir o arquivo.'], 404);
            }

            if (!$file->delete()) {
                return response()->json(['error' => 'Não foi possívle excluir o arquivo.'], 404);
            }

            return response()->json([], 204);
        } else {
            return response()->json(['error' => 'Arquivo não encontrado.'], 404);
        }
    }

    public function download($id) {
        $file = File::find($id);
        if (is_object($file)) {
            return Storage::download($file->path);
        } else {
            return response()->json(['error' => 'Arquivo não encontrado.'], 404);
        }
    }
}
