<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Compra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompraController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
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
    $compra = new Compra();
    if ($compra->validate($request->all())) {
      $compra->total = $request->get('total');
      $compra->user_id = Auth::user()->id;
      $compra->save();
      return new DataResource($compra);
    } else {
      return response($compra->getErrors(), 400);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Compra  $compra
   * @return \Illuminate\Http\Response
   */
  public function show(Compra $compra)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Compra  $compra
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Compra $compra)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Compra  $compra
   * @return \Illuminate\Http\Response
   */
  public function destroy(Compra $compra)
  {
    //
  }
}
