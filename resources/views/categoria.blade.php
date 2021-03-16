@extends('layouts.app')

@section('content')
<div class="container">

  @foreach($categoria[0]->produtos as $key => $produto)

  @if(($key % 4)==0)
  @if($key > 0)
</div>
@endif
<div class="d-flex">
  @endif
  <div class="card" style="width: 18rem;">
    <img src="{{Storage::url($produto->imagens[0]->url)}}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{$produto->nome}}</h5>
      <p class="card-text">R$ {{$produto->preco}}</p>
      <a href="{{url('/produto/'.$produto->slug)}}" class="btn btn-success">Ver Detahles</a>
    </div>
  </div>
  @endforeach
</div>
@endsection
