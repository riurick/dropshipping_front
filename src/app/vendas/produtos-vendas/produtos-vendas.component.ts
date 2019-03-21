import { Component, OnInit } from '@angular/core';
import { ProdutoPedido } from '../../entities/ProdutoPedido';
import { Produto } from '../../entities/Produto';
import { Subscription } from '../../../../node_modules/rxjs';
import { ApiProdutoService } from '../../produto/api-produto.service';
import { VendasService } from '../vendas-service.service';
import { ProdutoPedidos } from '../../entities/ProdutoPedidos';

@Component({
  selector: 'app-produtos-vendas',
  templateUrl: './produtos-vendas.component.html',
  styleUrls: ['./produtos-vendas.component.css']
})
export class ProdutosVendasComponent implements OnInit {
  produtoPedidos: ProdutoPedido[] = [];
  produtos: Produto[] = [];
  produtoPedidoSelecionado: ProdutoPedido;
  produtoSelecionado = false;

  private carrinhoPedidos: ProdutoPedidos;

  sub: Subscription;
  constructor(
    private apiProduto: ApiProdutoService,
    private vendasService: VendasService,
  ) { }

  ngOnInit() {
  }

  carregaProdutos() {
    this.apiProduto.lista().then(response => {
      this.produtos = response.data;
      this.produtos.forEach(produto => {
        const p = new ProdutoPedido();
        p.produto = produto;
        p.quantidade = 0;
        this.produtoPedidos.push(p);
      }, (error) => console.log(error));
    });
  }

  carregaPedidos() {
    this.sub = this.vendasService.PedidosChanged.subscribe(() => {
      this.carrinhoPedidos = this.vendasService.produtosPedidos;
    });
  }

  adicionar(produtoPedido: ProdutoPedido) {
    this.vendasService.produtoPedidoSelecionado = produtoPedido;
    this.produtoPedidoSelecionado = this.vendasService.produtoPedidoSelecionado;
    this.produtoPedidoSelecionado = produtoPedido;
    this.produtoSelecionado = true;
  }

  remover(produtoPedido: ProdutoPedido) {
    const index = this.getProdutoIndex(produtoPedido.produto);
    if (index > -1) {
      this.carrinhoPedidos.produtoPedidos.splice(index, 1);
    }
    this.vendasService.produtosPedidos = this.carrinhoPedidos;
    this.carrinhoPedidos = this.vendasService.produtosPedidos;
    this.produtoSelecionado = false;
  }

  reset() {
    this.produtoPedidos = [];
    this.carregaProdutos();
    this.vendasService.produtosPedidos.produtoPedidos = [];
    this.carregaPedidos();
    this.produtoSelecionado = false;
  }

  getProdutoIndex(produto: Produto) {
    for (let i = 0; i < this.carrinhoPedidos.produtoPedidos.length; i++) {
      if (produto.id === this.carrinhoPedidos.produtoPedidos[i].produto.id) {
        return i + 1;
      }
    }
  }

}
