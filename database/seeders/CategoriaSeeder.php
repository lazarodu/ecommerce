<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoriaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Categoria::create(["nome" => "Frutas", "slug" => Str::slug("Frutas")]);
    Categoria::create(["nome" => "Verduras", "slug" => Str::slug("Verduras")]);
    Categoria::create(["nome" => "Legumes", "slug" => Str::slug("Legumes")]);
  }
}
