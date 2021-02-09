<?php

namespace App\Models;

use App\Features\ModelValidation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagem extends Model
{
  use HasFactory, ModelValidation;

  public function produto()
  {
    return $this->belongsTo("App\Models\Produto");
  }

  protected static $rules = [
    'produto_id' => 'required',
    'nome' => 'required',
    'url' => 'required',
    'files' => 'required',
    'files.*' => 'mimes:jpg,jpeg,png,gif|max:2048'
  ];
}
