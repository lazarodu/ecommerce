<?php

namespace App\Models;

use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrinho extends Model
{
  use HasFactory, ModelValidation;

  public function user()
  {
    return $this->belongsTo("App\Models\User");
  }

  public function produto()
  {
    return $this->belongsTo("App\Models\Produto");
  }

  public function compra()
  {
    return $this->belongsTo("App\Models\Compra");
  }

  protected static $rules = [
    "produto_id" => 'required|numeric',
    "quantidade" => 'required|numeric'
  ];
}
