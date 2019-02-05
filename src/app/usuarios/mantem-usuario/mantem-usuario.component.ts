import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KCUserRepresentation } from 'src/app/entities/KCUserRepresentation';
import { KCGroupRepresentation } from 'src/app/entities/KCGroupRepresentation';
import { ApiUsuariosService } from '../api-usuarios/api-usuarios.service';

@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent implements OnInit {

  user: KCUserRepresentation = new KCUserRepresentation();
  gruposDisponiveis: KCGroupRepresentation[] = [];
  gruposAtribuidos: KCGroupRepresentation[] = [];

  private userId: string;

  constructor(private apiUsuariosService: ApiUsuariosService, private route: ActivatedRoute) { }

  private getSubgroupsRecursively(group: KCGroupRepresentation): KCGroupRepresentation[] {
    let ret = group.subGroups;
    ret.forEach(g => ret = ret.concat(...this.getSubgroupsRecursively(g)));
    return ret;
  }

  private updateGroups(): void {
    const pGroups = this.apiUsuariosService.getGroups()
      .then(res => {
        this.gruposDisponiveis = res.data;

        // Planifica a lista de grupos uma vez que subgrupos estão aninhados
        res.data.forEach(g =>
          this.gruposDisponiveis = this.gruposDisponiveis.concat(...this.getSubgroupsRecursively(g)));

        // Ordena os grupos pelo seu caminho (path)
        this.gruposDisponiveis.sort((g1, g2) => g1.path < g2.path ? -1 : 1);

        /*         console.log('disponíveis');
                console.table(this.gruposDisponiveis); */
      });

    const pUserGroups = this.apiUsuariosService.getGroupsByUser(this.userId)
      .then(res => {
        this.gruposAtribuidos = res.data;

        /*  console.log('atribuídos');
         console.table(this.gruposAtribuidos); */
      });

    Promise.all([pGroups, pUserGroups])
      .then(() => this.gruposDisponiveis = this.gruposDisponiveis.filter(gd => !this.gruposAtribuidos.find(ga => ga.name === gd.name)));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];

      this.apiUsuariosService.getUser(this.userId)
        .then(res => {
          this.user = res.data;
        });

      this.updateGroups();
    });
  }

  onMoveToTarget(event: { items: KCGroupRepresentation[] }) {
    (async () => {
      try {
        for (let i = 0; i < event.items.length; i++) {
          await this.apiUsuariosService.joinGroup(this.userId, event.items[i].id);
        }
      } catch (e) {
        // Exceção intencionalmente silenciada, é tratada automaticamente pelo http interceptor
      } finally {
        this.updateGroups();
      }
    })();
  }

  onMoveToSource(event: { items: KCGroupRepresentation[] }) {
    (async () => {
      try {
        for (let i = 0; i < event.items.length; i++) {
          const g = event.items[i];
          await this.apiUsuariosService.leaveGroup(this.userId, g.id);
        }
      } catch (e) {
        // Exceção intencionalmente silenciada, é tratada automaticamente pelo http interceptor
      } finally {
        this.updateGroups();
      }
    })();
  }
}
