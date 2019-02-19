import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiClienteService } from '../api-cliente.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { Cliente } from 'src/app/entities/CLiente';
import { NgForm } from '@angular/forms';
import { Endereco } from 'src/app/entities/Endereco';
import { SelectItem, MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-mantem-cliente',
  templateUrl: './mantem-cliente.component.html',
  styleUrls: ['./mantem-cliente.component.css']
})
export class MantemClienteComponent implements OnInit {
  ufs: SelectItem[];
  confirmaSenha: String;
  cliente: Cliente;
  notMatchSenha = false;
  @ViewChild('clienteForm') clienteForm: NgForm;

  constructor(
    private clienteAPI: ApiClienteService,
    private utilService: UtilityService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
  ) {
    this.cliente = new Cliente();
    this.cliente.endereco = new Endereco();
    this.confirmaSenha = null;
    this.breadcrumbService.setItems([
      {label: 'Cadastro de Cliente', routerLink: 'novo-cliente'}
    ]);

    this.ufs = utilService.inicializarUF();
  }

  validade() {
    const pass = this.cliente.senha;
    const repPass = this.confirmaSenha;
    if (repPass !== pass) {
      return {
        notMatchSenha: true
      };
    }
    return null;
  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editar-cliente') {
      this.route.params.subscribe(params => {
        this.clienteAPI.getCliente(params['id'])
          .then(response => {
            this.cliente = response.data;
          });
      });
    } else {
      this.inicializarCliente();
    }
  }

  salvar(): void {

    if (this.clienteForm.invalid) {
      return;
    }
    if (this.cliente.senha !== this.confirmaSenha) {
      this.messageService.add({severity: 'error', summary: '', detail: 'É necessário confirmar a senha.'});
      return;
    }
    this.cliente.cpf = this.utilService.retirarFormatacao(this.cliente.cpf);
    this.cliente.telefone = this.utilService.retirarFormatacao(this.cliente.telefone);
    this.cliente.endereco.cep = this.utilService.retirarFormatacao(this.cliente.endereco.cep);
    if (this.cliente.id) {
      this.clienteAPI.alterar(this.cliente);
    } else {
      this.clienteAPI.salvarCliente(this.cliente)
        .then(() => {
          this.clienteForm.reset();
          // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
          setTimeout(() =>
            this.inicializarCliente(), 0);
        });
    }
  }
  inicializarCliente(): void {
    this.cliente = new Cliente();
    this.cliente.endereco = new Endereco();
  }
}
