<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function index(Request $request)
    {
        $this->validationOnQuery($request);
        $query = $this->class::query();

        foreach ($request->all() as $key => $value) {
            $query->where($key, $value);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $this->validationOnCreate($request);
        return response()->json($this->class::create($request->all()), 201);
    }

    public function show(int $id)
    {
        $resource = $this->class::find($id);
        if (is_object($resource)) {
            return response()->json($resource);
        } else {
            return response()->json($resource, 204);
        }
    }

    public function update(int $id, Request $request)
    {
        $this->validationOnUpdate($request);
        $resource = $this->class::find($id);
        if (!is_object($resource)) {
            return response()->json(['error' => 'Recurso não encontrado.'], 404);
        }
        $resource->fill($request->all());
        $resource->save();
    }

    public function destroy(int $id)
    {
        $this->validationOnDelete($id);
        $resource = $this->class::destroy($id);
        if ($resource === 0) {
            return response()->json(['error' => 'Recurso não encontrado'], 404);
        }

        return response()->json('', 204);
    }

    protected function validationOnQuery(Request $request) {}

    protected function validationOnCreate(Request $request) {}

    protected function validationOnUpdate(Request $request) {}

    protected function validationOnDelete($id) {}
}
