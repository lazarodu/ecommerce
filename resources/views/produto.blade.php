@extends('layouts.app')

@section('content')
<div class="container d-flex">
  <div class="card" style="width: 60%;">
    <img src="{{Storage::url($produto[0]->imagens[0]->url)}}" class="card-img-top">
  </div>

  <div class="card" style="width: 40%;">
    <form method="POST" action="{{url('carrinho')}}">
      @csrf
      @method('POST')
      <input type="hidden" name="produto_id" value="{{$produto[0]->id}}">
      <h2 class="card-title">{{$produto[0]->nome}}</h2>
      <div class="card-body">
        <p class="card-text">R$ {{$produto[0]->preco}}</p>
        <p class="card-text">Estoque {{$produto[0]->quantidade}}</p>
        <input type="number" name="quantidade" id="qtd" min="1" max="{{$produto[0]->quantidade}}" required>
        <button type="submit" class="btn btn-primary">Adicionar no carrinho</button>
      </div>
    </form>
  </div>

</div>
@endsection
