<?php

namespace App\Services;

use App\Models\Categoria;

class ResourcesService
{
  public function categorias()
  {
    return Categoria::all();
  }
}
