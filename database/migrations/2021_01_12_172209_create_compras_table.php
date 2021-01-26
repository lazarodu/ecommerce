<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('compras', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()
        ->onDelete('cascade')->onUpdate('cascade');
      $table->decimal('total', 10, 2);
      $table->enum('status', ['confirmado', 'pago', 'enviado', 'entregue'])->default('confirmado');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('compras');
  }
}
