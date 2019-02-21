import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../../entities/Fornecedor';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ApiProdutoService } from '../api-produto.service';
import { ApiFornecedorService } from '../../fornecedor/api-fornecedor.service';
import { UtilityService } from '../../services/utility/utility.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MessageService } from '../../../../node_modules/primeng/api';
import { Produto } from '../../entities/Produto';
import { Categoria } from '../../entities/Categoria';
import { ApiCategoriaService } from '../../categoria/api-categoria.service';

@Component({
  selector: 'app-mantem-produto',
  templateUrl: './mantem-produto.component.html',
  styleUrls: ['./mantem-produto.component.css']
})
export class MantemProdutoComponent implements OnInit {

  produto: Produto;
  categorias: Categoria[];
  files: any[] = [];
  @ViewChild('produtoForm') produtoForm: NgForm;
  constructor(
    private fornecedorApi: ApiFornecedorService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private produtoApi: ApiProdutoService,
    private categoriaApi: ApiCategoriaService
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
          });
      });
    } else {
      this.inicializar();
      this.route.params.subscribe(params => {
        this.fornecedorApi.get(params['idFornecedor']).then(response => {
          this.produto.fornecedor = response.data;
        });
      });
    }
  }

  onUpload(event) {
    for (const file of event.files) {
        this.files.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  inicializar(): void {
    this.produto = new Produto();
    this.produto.categoria = new Categoria();
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
    } else {
      this.produtoApi.salvar(this.produto).then(() => {
        this.produtoForm.reset();
        setTimeout(() => this.inicializar(), 0);
      });
    }
  }

}
