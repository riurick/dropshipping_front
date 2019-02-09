import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiVendedorService } from '../api-vendedor.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { Vendedor } from 'src/app/entities/Vendedor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mantem-vendedor',
  templateUrl: './mantem-vendedor.component.html',
  styleUrls: ['./mantem-vendedor.component.css']
})
export class MantemVendedorComponent implements OnInit {
  confirmaSenha: String;
  vendedor: Vendedor;
  notMatchSenha = false;
  @ViewChild('vendedorForm') vendedorForm: NgForm;

  constructor(
    private vendedorApi: ApiVendedorService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.vendedor = new Vendedor();
    this.confirmaSenha = null;
    this.breadcrumbService.setItems([
      {label: 'Cadastro de Vendedor', routerLink: 'novo-vendedor'}
    ]);

   }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editar-vendedor') {
      this.route.params.subscribe(params => {
        this.vendedorApi.get(params['id'])
          .then(response => {
            this.vendedor = response.data;
          });
      });
    } else {
      this.inicializar();
    }
  }

  salvar(): void {

    if (this.vendedorForm.invalid) {
      return;
    }
    this.vendedor.cpf = this.utilService.retirarFormatacao(this.vendedor.cpf);
    this.vendedor.telefone = this.utilService.retirarFormatacao(this.vendedor.telefone);
    if (this.vendedor.id) {
      this.vendedorApi.alterar(this.vendedor);
    } else {
      this.vendedorApi.salvar(this.vendedor)
        .then(() => {
          this.vendedorForm.reset();
          setTimeout(() =>
            this.inicializar(), 0);
        });
    }
  }

  validade() {
    const pass = this.vendedor.senha;
    const repPass = this.confirmaSenha;
    if (repPass !== pass) {
      return {
        notMatchSenha: true
      };
    }
    return null;
  }

  inicializar(): void {
    this.vendedor = new Vendedor();
  }

}
