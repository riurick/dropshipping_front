import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubTema } from '../../entities/SubTema';
import { Tema } from '../../entities/Tema';
import { ApiTemasService } from '../../temas/api-temas/api-temas.service';
import { ApiSubtemasService } from '../api-subtemas/api-subtemas.service';
import { BreadcrumbService } from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-mantem-subtemas',
  templateUrl: './mantem-subtemas.component.html',
  styleUrls: ['./mantem-subtemas.component.css']
})
export class MantemSubTemasComponent implements OnInit {

  subTemas: SubTema;
  @ViewChild('subTemasForm') subTemasForm: NgForm;
  optionsDropdownTema: Tema[];

  constructor(
    private subTemasAPI: ApiSubtemasService,
    private temaAPI: ApiTemasService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {

    this.subTemas = new SubTema();

    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      { label: 'Sub-Tema', routerLink: 'temas' },
      { label: 'Cadastro de Sub-Tema', routerLink: 'novosubtema' }
    ]);

    const options = { params: new HttpParams().set('situacao', 'true') };
    this.temaAPI.getTemasNaoPaginado(options).then(response => {
      Object.assign(response.data.content, response.data.content.map(obj => ({
        id: obj.id,
        nome: obj.nome,
        descricao: obj.descricao,
        situacao: obj.situacao,
        subTemas: null
      })));
      this.optionsDropdownTema = response.data.content;
    });

  }

  isEdicao(): boolean {
    return !!this.subTemas.id;
  }

  salvar(): void {

    console.log(this.subTemas);
    if (this.subTemasForm.invalid) {
      return;
    }

    if (this.subTemas.id) {
      this.subTemasAPI.alterarSubTema(this.subTemas);
    } else {
      this.subTemasAPI.salvarNovoSubTema(this.subTemas)
        .then(() => {
          this.subTemasForm.reset();
          // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
          setTimeout(() =>
            this.inicializarSubTemas(), 0);
        });
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarsubtema') {
      this.route.params.subscribe(params => {
        this.subTemasAPI.getSubTema(params['id'])
          .then(res => {
          this.subTemas = res.data;
            console.log(this.subTemas.tema);
          });
      });
    } else {
      this.inicializarSubTemas();
    }
  }

  inicializarSubTemas() {
    this.subTemas = new SubTema();
    this.subTemas.situacao = true;
  }

}
