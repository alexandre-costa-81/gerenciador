<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['prefix' => 'v1', 'middleware' => ['auth:sanctum']], function () {
    Route::get('me', function(Request $request) {
        return auth()->user();
    });

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('users', function (Request $request) {
        // return $request->user();
        return response()->json(['name' => 'Alexandre']);
    });
});
