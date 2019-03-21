import { Component, OnInit } from '@angular/core';
import { ProdutoPedido } from '../../entities/ProdutoPedido';
import { Subscription } from '../../../../node_modules/rxjs';
import { VendasService } from '../vendas-service.service';
import { ProdutoPedidos } from '../../entities/ProdutoPedidos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  produtoPedidos: ProdutoPedidos;
  total: number;
  pago: boolean;
  sub: Subscription;

  constructor(
    private vendasService: VendasService,
  ) {
    this.produtoPedidos = this.vendasService.produtosPedidos;
  }

  ngOnInit() {
    this.pago = false;
    this.sub = this.vendasService.ProdutoPedidoChanged.subscribe(() => {
      this.produtoPedidos = this.vendasService.produtosPedidos;
    });
    this.carregaTotal();
  }

  pagar() {
    this.pago = true;
    this.vendasService.salvarPedido(this.produtoPedidos).subscribe();
  }

  carregaTotal() {
    this.total = 0;
    for (const p of this.produtoPedidos.produtoPedidos) {
      this.total += p.produto.preco * p.quantidade;
    }
  }
}
