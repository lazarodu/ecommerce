<?php

use App\Http\Controllers\API\CarrinhoController;
use App\Http\Controllers\API\CategoriaController;
use App\Http\Controllers\API\CompraController;
use App\Http\Controllers\API\ImagemController;
use App\Http\Controllers\API\ProdutoController;
use App\Http\Controllers\API\UserController;
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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:api'], function () {
  Route::get('categorias/deleted', [CategoriaController::class, 'indexDeleted']);
  Route::apiResource('categorias', CategoriaController::class);
  Route::get('produtos/deleted', [ProdutoController::class, 'indexDeleted']);
  Route::apiResource('produtos', ProdutoController::class);
  Route::apiResource('imagens', ImagemController::class);
  Route::apiResource('carrinho', CarrinhoController::class);
  Route::apiResource('compra', CompraController::class);
  Route::apiResource('user', UserController::class);
});
