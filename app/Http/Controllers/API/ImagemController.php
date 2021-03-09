<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Imagem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagemController extends Controller
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
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Imagem  $imagem
   * @return \Illuminate\Http\Response
   */
  public function show(Imagem $imagem)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Imagem  $imagem
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Imagem $imagem)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Imagem  $imagem
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try {
      $imagem = Imagem::findOrFail($id);
      if (Storage::delete($imagem->url)) {
        if ($imagem->delete()) {
          return new DataResource($imagem);
        }
      }
    } catch (\Throwable $th) {
      throw $th;
    }
  }
}
