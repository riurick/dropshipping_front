import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tribunal } from '../../entities/Tribunal';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ApiTribunaisService } from '../api-tribunais/api-tribunais.service';

@Component({
  selector: 'app-mantem-tribunal',
  templateUrl: './mantem-tribunal.component.html',
  styleUrls: ['./mantem-tribunal.component.css']
})
export class MantemTribunalComponent implements OnInit {

  tribunal: Tribunal;
  @ViewChild('tribunalForm') tribunalForm: NgForm;

  constructor(private tribunalAPI: ApiTribunaisService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.tribunal = new Tribunal();
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Tribunal', routerLink: 'tribunais'},
      {label: 'Cadastro de Tribunal', routerLink: 'novotribunal'}
    ]);
  }

  salvar(): void {
    if (this.tribunalForm.invalid) {
      return;
    }

    if (this.tribunal.id) {
      this.tribunalAPI.alterarTribunal(this.tribunal);
    } else {
      this.tribunalAPI.salvarNovoTribunal(this.tribunal)
        .then(() => {
          this.tribunalForm.reset();
          // Ajuste para que o checkbox reflita corretamente o estado atual da propriedade ATIVO
          setTimeout(() =>
            this.inicializarTribunal(), 0);
        });
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editartribunal') {
      this.route.params.subscribe(params => {
        this.tribunalAPI.getTribunal(params['id'])
          .then(res => this.tribunal = res.data);
      });
    } else {
      this.inicializarTribunal();
    }
  }

  inicializarTribunal() {
    this.tribunal = new Tribunal();
    this.tribunal.ativo = true;
  }

}
