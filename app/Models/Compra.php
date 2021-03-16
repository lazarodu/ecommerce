<?php

namespace App\Models;

use App\Events\ProdutoVendido;
use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
  use HasFactory, ModelValidation;
  public function user()
  {
    return $this->belongsTo("App\Models\User");
  }
  public function carrinhos()
  {
    return $this->hasMany("App\Models\Carrinho");
  }
  protected static $rules = [
    'total' => 'required|numeric',
  ];
  protected $dispatchesEvents = [
    'created' => ProdutoVendido::class
  ];
}
