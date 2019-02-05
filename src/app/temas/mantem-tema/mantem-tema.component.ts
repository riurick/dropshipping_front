import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tema } from '../../entities/Tema';
import { ApiTemasService } from '../api-temas/api-temas.service';
import { BreadcrumbService } from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-mantem-tema',
  templateUrl: './mantem-tema.component.html',
  styleUrls: ['./mantem-tema.component.css']
})
export class MantemTemaComponent implements OnInit {

  tema: Tema;
  @ViewChild('temaForm') temaForm: NgForm;

  constructor(private temaAPI: ApiTemasService, private route: ActivatedRoute,  private breadcrumbService: BreadcrumbService) {
    this.tema = new Tema();
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Tema', routerLink: 'temas'},
      {label: 'Cadastro de Tema', routerLink: 'novotema'}
    ]);
  }

  salvar(): void {

    console.log(this.tema);
    if (this.temaForm.invalid) {
      return;
    }

    if (this.tema.id) {
      this.temaAPI.alterarTema(this.tema);
    } else {
      this.temaAPI.salvarNovoTema(this.tema)
        .then(() => {
          this.temaForm.reset();
          // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
          setTimeout(() =>
            this.inicializarTema(), 0);
        });
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editartema') {
      this.route.params.subscribe(params => {
        this.temaAPI.getTema(params['id'])
          .then(res => this.tema = res.data);
      });
    } else {
      this.inicializarTema();
    }
  }

  inicializarTema() {
    this.tema = new Tema();
    this.tema.situacao = true;
  }

}
