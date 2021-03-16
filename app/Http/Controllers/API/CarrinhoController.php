<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Carrinho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarrinhoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $carrinho = Carrinho::with(["produto.imagens"])
      ->where('user_id', Auth::user()->id)
      ->where('compra_id', NULL)
      ->get();
    return new DataResource($carrinho);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Carrinho  $carrinho
   * @return \Illuminate\Http\Response
   */
  public function show(Carrinho $carrinho)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Carrinho  $carrinho
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Carrinho $carrinho)
  {
    if ($carrinho->validate($request->all())) {
      $carrinho->produto_id = $request->get('produto_id');
      $carrinho->quantidade = $request->get('quantidade');
      $carrinho->save();
      return new DataResource($carrinho);
    } else {
      return response($carrinho->getErrors(), 400);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Carrinho  $carrinho
   * @return \Illuminate\Http\Response
   */
  public function destroy(Carrinho $carrinho)
  {
    $carrinho->delete();
    return new DataResource($carrinho);
  }
}
