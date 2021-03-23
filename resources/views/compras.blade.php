@extends('layouts.app')

@section('content')
<div class="container">
  @foreach($compras as $compra)
  <h5>Compra realizada em {{$compra->created_at->format('d/m/Y H:i')}}</h5>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Produto</th>
        <th>Preço</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
      @foreach($compra->carrinhos as $carrinho)
      <tr>
        <td>{{$carrinho->produto->nome}}</td>
        <td>R$ {{$carrinho->produto->preco}}</td>
        <td>{{$carrinho->quantidade}}</td>
      </tr>
      @endforeach
    </tbody>
    <tfoot>
      <tr>
        <th colspan="2">Total</th>
        <th>R$ {{$compra->total}}</th>
      </tr>
    </tfoot>
  </table>
  <h4>Status: {{$compra->status}}</h4>
  <hr>
  @endforeach
</div>
@endsection
