<?php

namespace App\Http\Controllers;

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
    return view('carrinho');
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $carrinho = new Carrinho();
    if ($carrinho->validate($request->all())) {
      $carrinho->user_id = Auth::user()->id;
      $carrinho->produto_id = $request->get('produto_id');
      $carrinho->quantidade = $request->get('quantidade');
      $carrinho->save();
      return redirect('carrinho');
    } else {
      return response($carrinho->getErrors(), 400);
    }
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
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Carrinho  $carrinho
   * @return \Illuminate\Http\Response
   */
  public function edit(Carrinho $carrinho)
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
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Carrinho  $carrinho
   * @return \Illuminate\Http\Response
   */
  public function destroy(Carrinho $carrinho)
  {
    //
  }
}
