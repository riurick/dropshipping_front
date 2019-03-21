import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { ProdutoPedido } from '../entities/ProdutoPedido';
import { ProdutoPedidos } from '../entities/ProdutoPedidos';

@Injectable()
export class VendasService {
  private produtoPedido: ProdutoPedido;
  produtosPedidos: ProdutoPedidos = new ProdutoPedidos();
  private produtoPedidoSubject = new Subject();
  private pedidosSubject = new Subject();
  private totalSubject = new Subject();
  total: number;

  ProdutoPedidoChanged = this.produtoPedidoSubject.asObservable();
  PedidosChanged = this.pedidosSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();
  produtoPedidoSelecionado: ProdutoPedido;

  constructor(private http: HttpClient) { }

  salvarPedido(pedido: ProdutoPedidos) {
    return this.http.post('Url', pedido);
}
}
