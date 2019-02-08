import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiClienteService } from '../api-cliente.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { Cliente } from 'src/app/entities/CLiente';
import { NgForm } from '@angular/forms';
import { Endereco } from 'src/app/entities/Endereco';
import { SelectItem } from 'primeng/api';
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
    private breadcrumbService: BreadcrumbService
  ) {
    this.cliente = new Cliente();
    this.cliente.endereco = new Endereco();
    this.confirmaSenha = null;
    this.breadcrumbService.setItems([
      {label: 'Cadastro de Cliente', routerLink: 'novo-cliente'}
    ]);

    this.inicializarUF();
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
  inicializarUF() {
    this.ufs = [
      {label: 'UF', value: null},
      {label: 'Acre', value: {id: 1, name: 'Acre', code: 'AC'}},
      {label: 'Alagoas', value: {id: 2, name: 'Alagoas', code: 'AL'}},
      {label: 'Amapá', value: {id: 3, name: 'Amapá', code: 'AP'}},
      {label: 'Amazonas', value: {id: 4, name: 'Amazonas', code: 'AM'}},
      {label: 'Bahia', value: {id: 5, name: 'Bahia', code: 'BA'}},
      {label: 'Ceará', value: {id: 6, name: 'Ceará', code: 'CE'}},
      {label: 'Distrito Federal', value: {id: 7, name: 'Distrito Federal', code: 'DF'}},
      {label: 'Espírito Santo', value: {id: 8, name: 'Espírito Santo', code: 'ES'}},
      {label: 'Goiás', value: {id: 9, name: 'Goiás', code: 'GO'}},
      {label: 'Maranhão', value: {id: 10, name: 'Maranhão', code: 'MA'}},
      {label: 'Mato Grosso', value: {id: 11, name: 'Mato Grosso', code: '  MY'}},
      {label: 'Mato Grosso do SuL', value: {id: 12, name: 'Mato Grosso do SuL', code: 'MS'}},
      {label: 'Minas Gerais', value: {id: 13, name: 'Minas Gerais', code: 'MG'}},
      {label: 'Pará', value: {id: 14, name: 'Pará', code: 'PA'}},
      {label: 'Paraíba', value: {id: 15, name: 'Paraíba', code: 'PB'}},
      {label: 'Paraná', value: {id: 16, name: 'Paraná', code: 'PR'}},
      {label: 'Pernambuco', value: {id: 17, name: 'Pernambuco', code: 'PE'}},
      {label: 'Piauí', value: {id: 18, name: 'Piauí', code: 'PI'}},
      {label: 'Rio de Janeiro', value: {id: 19, name: 'Rio de Janeiro', code: 'RJ'}},
      {label: 'Rio Grande do Norte', value: {id: 20, name: 'Rio Grande do Norte', code: 'RN'}},
      {label: 'Rio Grande do Sul', value: {id: 21, name: 'Rio Grande do Sul', code: 'RS'}},
      {label: 'Rondônia', value: {id: 22, name: 'Rondônia', code: 'RO'}},
      {label: 'Roraima', value: {id: 23, name: 'Roraima', code: 'RR'}},
      {label: 'Santa Catarina', value: {id: 24, name: 'Santa Catarina', code: 'SC'}},
      {label: 'São Paulo', value: {id: 25, name: 'São Paulo', code: 'SP'}},
      {label: 'Sergipe', value: {id: 26, name: 'Sergipe', code: 'SE'}},
      {label: 'Tocantins', value: {id: 27, name: 'Tocantins', code: 'TO'}}
  ];
  }


}
