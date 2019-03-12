import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../entities/Produto';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';
import { MessageService } from '../../../../../node_modules/primeng/primeng';
import { ApiProdutoService } from '../../api-produto.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ApiImagemService } from '../../../imagem/api-imagem.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {
  produtos: Produto[];
  idFornecedor: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private produtoApi: ApiProdutoService,
    private imagemApi: ApiImagemService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idFornecedor = params['idFornecedor'];
      this.produtoApi.listaPorFornecedor(params['idFornecedor'])
      .then(response => {
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
      });
    });
  }

  editarProduto(id) {
    this.router.navigateByUrl('editar-produto/' + id);
  }

}
