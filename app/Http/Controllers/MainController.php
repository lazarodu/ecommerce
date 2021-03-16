<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class MainController extends Controller
{
  public function index()
  {
    $produtos = Produto::inRandomOrder()->paginate(8);
    return view('main', compact('produtos'));
  }
}
