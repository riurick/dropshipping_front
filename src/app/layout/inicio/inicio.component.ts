import { AppComponent } from 'src/app/app.component';
import { HttpParams } from '@angular/common/http';
import { Ramo } from './../../entities/Ramo';
import {Component, OnInit} from '@angular/core';
import { BreadcrumbService} from '../../services/breadcrumb/breadcrumb.service';
import { Router, NavigationExtras } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  optionsDropdownRamo: Ramo[];
  descricaoJuris: string;
  ramoSelecionado: Ramo;
  descricaoPesquisaPronta: string;
  temPermissao: boolean;

  constructor(private breadcrumbService: BreadcrumbService,
    private router: Router,
    private app: AppComponent) {
    this.breadcrumbService.setItems([
      {label: 'inicio', routerLink: ''}
    ]);
   }

  ngOnInit() {
  }

  filtrar() {
    const ramo = this.ramoSelecionado ? this.ramoSelecionado.id : '' ;
    const desc = this.descricaoJuris ? this.descricaoJuris : '';

    this.router.navigate(['jurisprudencias/externoFiltroInicial',
     {ramo: ramo,
      descricao: desc,
      filtroPaginaInicial: true}]);
  }

  filtrarPesquisaPronta() {
    const desc = this.descricaoPesquisaPronta ? this.descricaoPesquisaPronta : '';

    this.router.navigate(['compendiosFiltroInicial',
     {descricao: desc,
      filtroPaginaInicial: true}]);
  }
}
