<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrinhosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('carrinhos', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()
        ->onDelete('cascade')->onUpdate('cascade');
      $table->foreignId('produto_id')->constrained()
        ->onDelete('cascade')->onUpdate('cascade');
      $table->integer('quantidade');
      $table->foreignId('compra_id')->nullable()->default(null)->constrained()
        ->onDelete('cascade')->onUpdate('cascade');
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
    Schema::dropIfExists('carrinhos');
  }
}
