import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TipoDeProcesso } from '../../entities/TipoDeProcesso';
import { ApiTiposDeProcessosService } from '../api-tipos-de-processos/api-tipos-de-processos.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-mantem-tipo-de-processo',
  templateUrl: './mantem-tipo-de-processo.component.html',
  styleUrls: ['./mantem-tipo-de-processo.component.css']
})
export class MantemTipoDeProcessoComponent implements OnInit {

  tipoDeProcesso: TipoDeProcesso;
  @ViewChild('tipoDeProcessoForm') tipoDeProcessoForm: NgForm;

  constructor(
    private tipoDeProcessoAPI: ApiTiposDeProcessosService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {

    this.tipoDeProcesso = new TipoDeProcesso();
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      { label: 'Tipo de Recurso', routerLink: 'tipodeprocesso' },
      { label: 'Cadastro de Tipo de Recurso', routerLink: 'novotipodeprocesso' }
    ]);
  }

  isEdicao(): boolean {
    return !!this.tipoDeProcesso.id;
  }

  salvar(): void {

    console.log(this.tipoDeProcesso);
    if (this.tipoDeProcessoForm.invalid) {
      return;
    }

    if (this.tipoDeProcesso.id) {
      this.tipoDeProcessoAPI.alterarTipoDeProcesso(this.tipoDeProcesso);
    } else {
      this.tipoDeProcessoAPI.salvarNovoTipoDeProcesso(this.tipoDeProcesso)
        .then(() => {
          this.tipoDeProcessoForm.reset();
          // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
          setTimeout(() =>
            this.inicializarTipoDeProcesso(), 0);
        });
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editartipodeprocesso') {
      this.route.params.subscribe(params => {
        this.tipoDeProcessoAPI.getTipoDeProcesso(params['id'])
          .then(res => this.tipoDeProcesso = res.data);
      });
    } else {
      this.inicializarTipoDeProcesso();
    }
  }

  inicializarTipoDeProcesso() {
    this.tipoDeProcesso = new TipoDeProcesso();
    this.tipoDeProcesso.situacao = true;
  }

}
