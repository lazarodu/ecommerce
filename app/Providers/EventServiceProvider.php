<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\ProdutoVendido;
use App\Listeners\EstoqueAtualizado;
use App\Listeners\FinalizarCarrinho;

class EventServiceProvider extends ServiceProvider
{
  /**
   * The event listener mappings for the application.
   *
   * @var array
   */
  protected $listen = [
    Registered::class => [
      SendEmailVerificationNotification::class,
    ],
    ProdutoVendido::class => [
      FinalizarCarrinho::class,
      EstoqueAtualizado::class
    ]
  ];

  /**
   * Register any events for your application.
   *
   * @return void
   */
  public function boot()
  {
    User::observe(UserObserver::class);
  }
}
