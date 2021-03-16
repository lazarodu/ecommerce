<?php

namespace App\Events;

use App\Models\Compra;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProdutoVendido
{
  use Dispatchable, InteractsWithSockets, SerializesModels;
  private $compra;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct(Compra $compra)
  {
    $this->compra = $compra;
  }

  public function getCompra()
  {
    return $this->compra;
  }
}
