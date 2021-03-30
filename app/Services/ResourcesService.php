<?php

namespace App\Services;

use App\Models\Carrinho;
use App\Models\Categoria;
use Illuminate\Support\Facades\Auth;

class ResourcesService
{
  public function categorias()
  {
    return Categoria::all();
  }

  public function carrinho()
  {
    if (Auth::user()) {
      return Carrinho::where('user_id', Auth::user()->id)
        ->where('compra_id', null)
        ->count();
    }
  }
}
