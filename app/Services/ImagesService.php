<?php

namespace App\Services;

use App\Models\Imagem;

class ImagesService
{
  private $files = [];

  public function __construct($files)
  {
    $this->files = $files;
  }

  public function upload($produto_id)
  {
    foreach ($this->files as $file) {
      $imagem  = new Imagem();
      $valida['produto_id'] = $produto_id;
      $valida['nome'] = $file->getClientOriginalName();
      $valida['url'] = $file->store('public/images');
      $valida['files'] = $file;
      if ($imagem->validate($valida)) {
        $imagem->produto_id = $produto_id;
        $imagem->nome = $valida['nome'];
        $imagem->url = $valida['url'];
        $imagem->save();
      } else {
        return response($imagem->getErrors(), 400);
      }
    }
  }
}
