import { Component, OnInit } from '@angular/core';
import { ProdutoPedido } from '../../entities/ProdutoPedido';
import { Produto } from '../../entities/Produto';
import { Subscription } from '../../../../node_modules/rxjs';
import { ApiProdutoService } from '../../produto/api-produto.service';
import { VendasService } from '../vendas-service.service';
import { ProdutoPedidos } from '../../entities/ProdutoPedidos';
import { ApiImagemService } from '../../imagem/api-imagem.service';

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
    private imagemApi: ApiImagemService,
  ) { }

  ngOnInit() {
    this.carregaProdutos();
  }

  carregaProdutos() {
    this.apiProduto.lista().then(response => {
      this.produtos = response.data;
      for (const produto of this.produtos) {
        this.imagemApi.buscaPorProduto(produto.id).then( resProduto => {
          produto.imagens = resProduto.data;
            this.imagemApi.buscaImagemId(produto.imagens[0].id).then(response2 => {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                produto.imagens[0].url = reader.result;
              }, false);
              if (response2) {
                reader.readAsDataURL(response2);
              }
              produto.imagens[0].arquivo = new Blob([response2]);
              const url = window.URL.createObjectURL(produto.imagens[0].arquivo);
              const link = document.createElement('a');
              link.href = url;
              link.download = produto.imagens[0].nome.toString();
            });
        });
      }
      this.produtos.forEach(produto => {

        this.imagemApi.buscaPorProduto(produto.id).then( resProduto => {
          produto.imagens = resProduto.data;
          this.imagemApi.buscaImagemId(produto.imagens[0].id).then(response2 => {
            const reader = new FileReader();
              reader.addEventListener('load', () => {
                produto.imagens[0].url = reader.result;
              }, false);
              if (response2) {
                reader.readAsDataURL(response2);
              }
              produto.imagens[0].arquivo = new Blob([response2]);
              const url = window.URL.createObjectURL(produto.imagens[0].arquivo);
              const link = document.createElement('a');
              link.href = url;
              link.download = produto.imagens[0].nome.toString();
          });
        });

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
    /*this.vendasService.produtoPedidoSelecionado = produtoPedido;
    this.produtoPedidoSelecionado = this.vendasService.produtoPedidoSelecionado;
    this.produtoPedidoSelecionado = produtoPedido;
    this.produtoSelecionado = true;*/
    this.vendasService.produtosPedidos.produtoPedidos.push(produtoPedido);
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
