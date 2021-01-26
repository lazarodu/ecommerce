<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('produtos', function (Blueprint $table) {
      $table->id();
      $table->foreignId('categoria_id')->constrained()
        ->onDelete('cascade')->onUpdate('cascade');
      $table->string('nome')->unique();
      $table->string('slug')->unique();
      $table->integer('quantidade');
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
    Schema::dropIfExists('produtos');
  }
}
