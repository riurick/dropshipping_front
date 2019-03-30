import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
import { ProdutoPedido } from '../entities/ProdutoPedido';
import { ProdutoPedidos } from '../entities/ProdutoPedidos';
import { Pedido } from '../entities/Pedido';
import { IServiceResponse } from '../entities/IResponse';
import { UtilityService } from '../services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
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

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  salvarPedido(pedido: Pedido) {
    return this.http.post<IServiceResponse<Pedido>>(this.utility.apiControleUrl() + 'api/v1/pedidos', pedido).toPromise();
  }
  salvarProdutoPedido(produtoPedido: ProdutoPedido) {
    return this.http.post<IServiceResponse<ProdutoPedido>>(
      this.utility.apiControleUrl() + 'api/v1/produtoPedido', produtoPedido
    ).toPromise();
  }
}
