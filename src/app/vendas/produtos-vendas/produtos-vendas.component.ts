import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProdutoPedido } from '../../entities/ProdutoPedido';
import { Produto } from '../../entities/Produto';
import { Subscription } from '../../../../node_modules/rxjs';
import { ApiProdutoService } from '../../produto/api-produto.service';
import { VendasService } from '../vendas-service.service';
import { ProdutoPedidos } from '../../entities/ProdutoPedidos';
import { ApiImagemService } from '../../imagem/api-imagem.service';
import { Pedido } from '../../entities/Pedido';
import { ApiClienteService } from '../../clientes/api-cliente.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

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
  pedido: Pedido;

  // Carrinho
  finalizado: boolean;
  total: number;
  @Output() nFinalizado: EventEmitter<boolean>;


  private carrinhoPedidos: ProdutoPedidos;

  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private apiProduto: ApiProdutoService,
    private vendasService: VendasService,
    private imagemApi: ApiImagemService,
    private apiCliente: ApiClienteService,
  ) {
    this.total = 0;
    this.finalizado = false;
    this.nFinalizado = new EventEmitter<boolean>();
   }

  ngOnInit() {

    this.carrinhoPedidos = new ProdutoPedidos();
    this.pedido = new Pedido();
    this.carregaProdutos();
    this.calculaTotal();
    // this.carregaCarrinho();
    // this.carregaTotal();
    this.pedido.pagementoEfetuado = false;
    this.route.params.subscribe(params => {
      this.apiCliente.getCliente(params['idCliente']).then( response => {
        this.pedido.cliente = response.data;
      });
    });
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
    let existe = false;
    for (const p of this.carrinhoPedidos.produtoPedidos) {
      if (p.produto.id === produtoPedido.produto.id) {
        existe  = true;
      }
    }
    if (!existe) {
      this.carrinhoPedidos.produtoPedidos.push(produtoPedido);
    }
    this.calculaTotal();
  }

  remover(produtoPedido: ProdutoPedido) {
    const index = this.getProdutoIndex(produtoPedido.produto);
    if (index > -1) {
      this.carrinhoPedidos.produtoPedidos.splice(index, 1);
    }
    this.calculaTotal();
  }

  reset() {
    this.produtoPedidos = [];
    this.carregaProdutos();
    this.vendasService.produtosPedidos.produtoPedidos = [];
    this.carregaPedidos();
    this.produtoSelecionado = false;

    this.finalizado = false;
    this.carregaTotal();
    this.total = 0;
  }

  getProdutoIndex(produto: Produto) {
    for (let i = 0; i < this.carrinhoPedidos.produtoPedidos.length; i++) {
      if (produto.id === this.carrinhoPedidos.produtoPedidos[i].produto.id) {
        return i;
      }
    }
  }

  carregaTotal() {
    this.sub = this.vendasService.PedidosChanged.subscribe(() => {
      this.calculaTotal();
    });
  }

  carregaCarrinho() {
    this.sub = this.vendasService.ProdutoPedidoChanged.subscribe(() => {
        this.calculaTotal();
    });
  }

  calculaTotal() {
    this.total = 0;
    for (const p of this.carrinhoPedidos.produtoPedidos) {
      p.valor =  p.produto.preco * p.quantidade;
      this.total += p.produto.preco * p.quantidade;
    }
  }

  finalizar() {
    this.finalizado = true;
  }

  pagar() {
    this.pedido.pagementoEfetuado = true;
    this.vendasService.salvarPedido(this.pedido).then(response => {
      this.pedido = response.data;
      for (let produtoPedido of this.carrinhoPedidos.produtoPedidos) {
        produtoPedido.pedido = this.pedido;
        this.vendasService.salvarProdutoPedido(produtoPedido).then(response2 => {
          produtoPedido = response2.data;
        });
      }
    });
  }

}
