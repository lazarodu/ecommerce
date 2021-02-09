<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Produto;
use App\Services\ImagesService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProdutoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $produtos = Produto::with(['categoria', 'imagens'])->get();
    return new DataResource($produtos);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $produto = new Produto();
    if ($produto->validate($request->all())) {
      $produto->categoria_id = $request->get('categoria_id');
      $produto->nome = $request->get('nome');
      $produto->slug = Str::slug($request->get('nome'));
      $produto->quantidade = $request->get('quantidade');
      $produto->save();
      if ($request->hasfile('files')) {
        $imagem = new ImagesService($request->file('files'));
        $imagem->upload($produto->id);
      }
      return new DataResource($produto);
    } else {
      return response($produto->getErrors(), 400);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Produto  $produto
   * @return \Illuminate\Http\Response
   */
  public function show(Produto $produto)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Produto  $produto
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Produto $produto)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Produto  $produto
   * @return \Illuminate\Http\Response
   */
  public function destroy(Produto $produto)
  {
    //
  }
}
