import { AppComponent } from 'src/app/app.component';
import { HttpParams } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { BreadcrumbService} from '../../services/breadcrumb/breadcrumb.service';
import { Router, NavigationExtras } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  descricaoJuris: string;
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
      this.temPermissao = true;
  }
  comprar() {
    this.router.navigateByUrl('/login-cliente');
  }
  vender() {
    this.router.navigateByUrl('/login-fornecedor');
  }
}
