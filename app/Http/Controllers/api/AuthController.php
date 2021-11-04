<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponser;

    public function register(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'email' => $attr['email'],
            'password' => bcrypt($attr['password'])
        ]);

        return $this->success([
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('E-mail ou Senha inválidos', 401);
        }

        /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();

        return $this->success([
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout()
    {
        /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();
        $user->tokens()->delete();

        return [
            'message' => 'Tokens Revogados'
        ];
    }
}
