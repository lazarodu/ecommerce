<?php

namespace App\Models;

use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produto extends Model
{
  use HasFactory, SoftDeletes, ModelValidation;

  public function categoria()
  {
    return $this->belongsTo("App\Models\Categoria");
  }

  public function imagens()
  {
    return $this->hasMany("App\Models\Imagem");
  }

  public function carrinhos()
  {
    return $this->hasMany("App\Models\Carrinho");
  }

  protected static $rules = [
    'categoria_id' => 'required|numeric',
    'nome' => 'required',
    'quantidade' => 'required|numeric',
    'preco' => 'required|numeric',
  ];
}
