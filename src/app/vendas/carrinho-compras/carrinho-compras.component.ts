import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProdutoPedido } from '../../entities/ProdutoPedido';
import { Subscription } from '../../../../node_modules/rxjs';
import { VendasService } from '../vendas-service.service';
import { ProdutoPedidos } from '../../entities/ProdutoPedidos';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css']
})
export class CarrinhoComprasComponent implements OnInit, OnDestroy {
  finalizado: boolean;
  produtoPedidos: ProdutoPedidos;
  total: number;
  sub: Subscription;

  @Output() nFinalizado: EventEmitter<boolean>;

  constructor(
    private vendasService: VendasService,
  ) {
    this.total = 0;
    this.finalizado = false;
    this.nFinalizado = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.produtoPedidos = new ProdutoPedidos();
    this.carregaCarrinho();
    this.carregaTotal();
  }

  carregaTotal() {
    this.sub = this.vendasService.PedidosChanged.subscribe(() => {
      this.calculaTotal();
    });
  }

  carregaCarrinho() {
    this.sub = this.vendasService.ProdutoPedidoChanged.subscribe(() => {
      /*if (p) {
        const prodPedido = new ProdutoPedido();
        prodPedido.produto = p.produto;
        prodPedido.quantidade = p.quantidade;
        this.produtoPedidos.produtoPedidos.push(prodPedido);
      }*/
      // this.vendasService.produtosPedidos = this.produtoPedidos;
      this.produtoPedidos = this.vendasService.produtosPedidos;
        this.calculaTotal();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  finalizar() {
    this.finalizado = true;
    this.vendasService.total = this.total;
    this.nFinalizado.emit(this.finalizado);
  }

  reset() {
    this.finalizado = false;
    this.produtoPedidos = new ProdutoPedidos();
    this.carregaTotal();
    this.total = 0;
  }

  calculaTotal() {
    this.total = 0;
    for (const p of this.produtoPedidos.produtoPedidos) {
      this.total += p.produto.preco * p.quantidade;
    }
  }

}
