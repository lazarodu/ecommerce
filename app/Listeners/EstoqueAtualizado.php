<?php

namespace App\Listeners;

use App\Events\ProdutoVendido;
use App\Models\Carrinho;
use App\Models\Produto;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class EstoqueAtualizado
{

  /**
   * Handle the event.
   *
   * @param  ProdutoVendido  $event
   * @return void
   */
  public function handle(ProdutoVendido $event)
  {
    $carrinhos = Carrinho::where('user_id', Auth::user()->id)
      ->where(['compra_id' => $event->getCompra()->id])->get();
    if (count($carrinhos) > 0) {
      foreach ($carrinhos as $carrinho) {
        $produto = Produto::find($carrinho->produto_id);
        $produto->quantidade = $produto->quantidade - $carrinho->quantidade;
        $produto->save();
      }
    }
  }
}
