import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from 'src/app/entities/Fornecedor';
import { NgForm } from '@angular/forms';
import { ApiFornecedorService } from '../api-fornecedor.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { Endereco } from 'src/app/entities/Endereco';

@Component({
  selector: 'app-mantem-fornecedor',
  templateUrl: './mantem-fornecedor.component.html',
  styleUrls: ['./mantem-fornecedor.component.css']
})
export class MantemFornecedorComponent implements OnInit {
  confirmaSenha: String;
  fornecedor: Fornecedor;
  notMatchSenha = false;
  @ViewChild('fornecedorForm') fornecedorForm: NgForm;
  constructor(
    private fornecedorApi: ApiFornecedorService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
  ) {
    this.fornecedor = new Fornecedor();
    this.fornecedor.endereco = new Endereco();
    this.confirmaSenha = null;
    this.breadcrumbService.setItems([
      {label: 'Cadastro de Fornecedor', routerLink: 'novo-fornecedor'}
    ]);

  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editar-fornecedor') {
      this.route.params.subscribe(params => {
        this.fornecedorApi.get(params['id'])
          .then(response => {
            this.fornecedor = response.data;
          });
      });
    } else {
      this.inicializar();
    }
  }

  salvar(): void {

    if (this.fornecedorForm.invalid) {
      return;
    }
    if (this.fornecedor.senha !== this.confirmaSenha) {
      this.messageService.add({severity: 'error', summary: '', detail: 'É necessário confirmar a senha.'});
      return;
    }
    this.fornecedor.cnpj = this.utilService.retirarFormatacao(this.fornecedor.cnpj);
    this.fornecedor.telefone = this.utilService.retirarFormatacao(this.fornecedor.telefone);
    if (this.fornecedor.id) {
      this.fornecedorApi.alterar(this.fornecedor);
    } else {
      this.fornecedorApi.salvar(this.fornecedor)
        .then(() => {
          this.fornecedorForm.reset();
          setTimeout(() =>
            this.inicializar(), 0);
        });
    }
  }

  inicializar(): void {
    this.fornecedor = new Fornecedor();
    this.fornecedor.endereco = new Endereco();
  }

}
