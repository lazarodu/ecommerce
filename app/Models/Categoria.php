<?php

namespace App\Models;

use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model
{
  use HasFactory, ModelValidation, SoftDeletes;

  protected static $rules = [
    'nome' => 'required|min:3|unique:categorias',
  ];

  public function produtos()
  {
    return $this->hasMany("App\Models\Produto");
  }
}
