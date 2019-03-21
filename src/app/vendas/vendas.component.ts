import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutosVendasComponent } from './produtos-vendas/produtos-vendas.component';
import { CarrinhoComprasComponent } from './carrinho-compras/carrinho-compras.component';
import { PedidosComponent } from './pedidos/pedidos.component';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  private collapsed = true;
  finalizado = false;

  @ViewChild('produtosC')
  produtosC: ProdutosVendasComponent;

  @ViewChild('carrinhoC')
  carrinhoC: CarrinhoComprasComponent;

  @ViewChild('pedidosC')
  pedidosC: PedidosComponent;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
  }

  finishOrder(finalizado: boolean) {
      this.finalizado = finalizado;
  }

  reset() {
      this.finalizado = false;
      this.produtosC.reset();
      this.carrinhoC.reset();
      this.pedidosC.pago = false;
  }

}
