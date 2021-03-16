<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index($slug)
  {
    $categoria = Categoria::where("slug", $slug)->get();
    return view('categoria', compact('categoria'));
  }
}
