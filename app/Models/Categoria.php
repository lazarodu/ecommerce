<?php

namespace App\Models;

use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
  use HasFactory, ModelValidation;

  protected static $rules = [
    'nome' => 'required|min:3|unique:categorias',
  ];
}
