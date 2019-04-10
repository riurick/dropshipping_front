import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../../entities/Fornecedor';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ApiProdutoService } from '../api-produto.service';
import { ApiFornecedorService } from '../../fornecedor/api-fornecedor.service';
import { UtilityService } from '../../services/utility/utility.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MessageService } from '../../../../node_modules/primeng/api';
import { Produto } from '../../entities/Produto';
import { Categoria } from '../../entities/Categoria';
import { ApiCategoriaService } from '../../categoria/api-categoria.service';
import { Imagem } from '../../entities/Imagem';
import { ApiImagemService } from '../../imagem/api-imagem.service';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';

@Component({
  selector: 'app-mantem-produto',
  templateUrl: './mantem-produto.component.html',
  styleUrls: ['./mantem-produto.component.css']
})
export class MantemProdutoComponent implements OnInit {

  produto: Produto;
  categorias: Categoria[];
  files: any[] = [];
  imagens: Imagem[];
  idFornecedor: number;
  uploadUrl = this.utilService.apiVendasUrl() + '/api-vendas/api/v1/imagem';
  valido = false;
  @ViewChild('produtoForm') produtoForm: NgForm;
  constructor(
    private fornecedorApi: ApiFornecedorService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private produtoApi: ApiProdutoService,
    private categoriaApi: ApiCategoriaService,
    private imagemApi: ApiImagemService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthGuardService,
  ) {
    this.produto = new Produto();
    this.produto.fornecedor = new Fornecedor();
    this.produto.categoria = new Categoria();
    this.breadcrumbService.setItems([
      {label: 'Cadastro de Produto', routerLink: 'novo-produto'}
    ]);
   }

  ngOnInit() {
    this.inicializarCategorias();
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editar-produto') {
      this.route.params.subscribe(params => {
        this.produtoApi.get(params['id'])
          .then(response => {
            this.produto = response.data;
            this.buscaProduto();
          });
      });
    } else {
      this.inicializar();
      this.route.params.subscribe(params => {
        this.idFornecedor = params['idFornecedor'];
        this.produto.fornecedor.id = this.idFornecedor;
        this.fornecedorApi.get(params['idFornecedor']).then(response => {
          // this.produto.fornecedor = response.data;
        });
      });
    }
  }
  buscaProduto() {
    this.imagemApi.buscaPorProduto(this.produto.id).then(response2 => {
      this.imagens = response2.data;
      this.files = this.imagens;
      this.buscaArquivos();
    });
  }
  buscaArquivos() {
    for ( let i = 0; i < this.imagens.length; i++) {
      this.imagemApi.buscaImagemId(this.imagens[i].id).then(response => {

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.files[i].url = reader.result;
        }, false);
        if (response) {
          reader.readAsDataURL(response);
        }

        this.files[i].arquivo = new Blob([response]);
        const url = window.URL.createObjectURL(this.files[i].arquivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.files[i].nome;
      });
    }
  }
  download(file: Imagem) {
    this.imagemApi.buscaImagemId(file.id).then(response => {
        file.arquivo = new Blob([response]);
        const url = window.URL.createObjectURL(file.arquivo);
        file.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file.arquivo)).toString();
        const link = document.createElement('a');
        link.href = url;
        link.download = file.nome.toString();
        link.dispatchEvent(new MouseEvent('click'));
    });
  }
  onUpload(event) {
    for (const file of event.files) {
        this.files.push(file);
    }
    const response = JSON.parse(event.xhr.response);
    this.imagens = response.data;
    this.messageService.add({severity: 'info', summary: 'Imagens carregadas!', detail: 'Imagens carregadas!'});
    this.valido = true;
  }

  inicializar(): void {
    this.produto = new Produto();
    this.produto.categoria = new Categoria();
    this.produto.fornecedor = new Fornecedor();

  }

  inicializarCategorias() {
    this.categoriaApi.lista().then(response => {
      this.categorias = response.data;
    });
  }

  salvar(): void {
    if (this.produtoForm.invalid) {
      return;
    }

    if (this.produto.id) {
      this.produtoApi.alterar(this.produto);
      for (const imagem of this.imagens) {
        imagem.produto = this.produto;
        this.imagemApi.alterar(imagem).then(() => {
          this.router.navigateByUrl('lista-produto/' + this.idFornecedor);
        });
      }
    } else {
      this.produtoApi.salvar(this.produto).then(response => {
        this.produto = response.data;
        for (const imagem of this.imagens) {
          imagem.produto = this.produto;
          this.imagemApi.alterar(imagem).then(() => {
            this.router.navigateByUrl('lista-produto/' + this.idFornecedor);
          });
        }
      });
    }
  }
}
