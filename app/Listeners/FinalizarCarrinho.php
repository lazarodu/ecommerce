<?php

namespace App\Listeners;

use App\Events\ProdutoVendido;
use App\Models\Carrinho;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class FinalizarCarrinho
{
  /**
   * Create the event listener.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Handle the event.
   *
   * @param  ProdutoVendido  $event
   * @return void
   */
  public function handle(ProdutoVendido $event)
  {
    Carrinho::where('user_id', Auth::user()->id)
      ->where('compra_id', null)
      ->update(['compra_id' => $event->getCompra()->id]);
  }
}
