<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function __construct()
    {
        $this->class = User::class;
    }

    protected function validationOnQuery(Request $request) {
        $this->validate($request, [
            'id'        => 'int',
            'name'      => 'string|min:3|max:255',
            'email'     => 'string|email',
            'password'  => 'string|min:7|max:255'
        ]);
    }

    protected function validationOnCreate(Request $request) {
        $this->validate($request, [
            'name'      => 'required|min:3',
            'email'     => 'required|email',
            'password'  => 'required|min:7|max:255'
        ]);
    }

    protected function validationOnUpdate(Request $request) {
        $this->validate($request, [
            'name'      => 'min:3',
            'email'     => 'email',
            'password'  => 'min:7|max:255',
        ]);
    }

    protected function validationOnDelete($id) {
        $user = User::find($id);
    }
}
