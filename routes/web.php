<?php

use App\Http\Controllers\CarrinhoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainController::class, 'index']);
Route::get('/produto/{slug}', [ProdutoController::class, 'index']);
Route::get('/categoria/{slig}', [CategoriaController::class, 'index']);

Auth::routes();

Route::group(["middleware" => "auth"], function () {
  Route::get('/home/{path?}', [HomeController::class, 'index'])->where('path', '.*');
  Route::get('/carrinho/{path?}', [CarrinhoController::class, 'index'])->where('path', '.*');
  Route::post('/carrinho', [CarrinhoController::class, 'store']);
});
