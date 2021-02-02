<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $categorias = Categoria::all();
    return new DataResource($categorias);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $categoria = new Categoria();
    if ($categoria->validate($request->all())) {
      $categoria->nome = $request->get('nome');
      $categoria->slug = Str::slug($request->get('nome'));
      $categoria->save();
      return new DataResource($categoria);
    } else {
      return response($categoria->getErrors(), 400);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Categoria $categoria)
  {
    return new DataResource($categoria);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Categoria $categoria)
  {
    $categoria->nome = $request->get('nome');
    $categoria->slug = Str::slug($request->get('nome'));
    $categoria->save();
    return new DataResource($categoria);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Categoria $categoria)
  {
    $categoria->delete();
    return new DataResource($categoria);
  }
}
