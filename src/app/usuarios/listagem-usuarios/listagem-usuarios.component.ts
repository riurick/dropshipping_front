import { Component, OnInit, ViewChild } from '@angular/core';
import { PendenciaUsuario } from '../../entities/PendenciaUsuario';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { HttpParams } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { ApiUsuariosService } from '../api-usuarios/api-usuarios.service';
import { KCGroupRepresentation } from '../../entities/KCGroupRepresentation';
import { Table } from 'primeng/table';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { LazyLoadEvent } from 'primeng/api';
import { Usuario } from '../../entities/Usuario';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit {
  constructor(
    private apiUsuariosService: ApiUsuariosService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  private debouncer;
  private delay = 500;
  @ViewChild('dt') dt: Table;
  nrLinhasTabela = 20;
  paginaAtual = 0;
  numeroDePaginas = 0;
  totalRecords = 0;
  username = '';
  query = '';
  filtroNome = '';
  filtroEmail = '';
  filtroUF = '';
  filtroNomeEntidade = '';
  filtroTipo = '';
  responsePage: IServiceResponse<IPage<PendenciaUsuario>>;
  users: Usuario[] = [];
  pendencias: PendenciaUsuario[] = [];
  cols: { field: string, header: string }[];
  colsPend: { field: string, header: string }[];
  pendenciaUsuarioSelecionada: PendenciaUsuario;
  usarioSelecionado: Usuario;
  grupoUsuarioAprovacao: KCGroupRepresentation;
  grupoUsuarioExclusao: KCGroupRepresentation;
  gruposDisponiveis: KCGroupRepresentation[] = [];
  desabilitaAprovacao = true;
  usersPage: IPage<Usuario>;


  ngOnInit() {
    this.pesquisarPendencias();

    this.cols = [
      { field: 'usuario', header: 'Usuário' },
      { field: 'nome', header: 'Nome' },
      { field: 'email', header: 'E-mail' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'nomeEntidade', header: 'Entidade' },
      { field: 'tipo', header: 'Tipo' },

    ];

    this.colsPend = [
      { field: 'nome', header: 'Usuário' },
      { field: 'email', header: 'E-mail' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'nomeEntidade', header: 'Entidade' },
      { field: 'sqTipo', header: 'Tipo' },
      { field: 'sqUf', header: 'UF' },
    ];

    this.updateGroups();
  }

 


  irMantemUsuario(idUsuario: string) {
    this.router.navigate(['editarusuario/' + idUsuario]);
  }

  obterUsuariosPromisse(): Promise<IServiceResponse<IPage<Usuario>>> {
    const options = {
      params: new HttpParams()
        .set('query', this.query)
        .set('page', '0')
        .set('size', '20')
    };
    return this.apiUsuariosService.obterUsuariosPaginado(options);
  }

  pesquisarPendencias() {
  }

  pesquisarUsuarios() {
    this.obterUsuariosPromisse()
      .then(users => {
        this.usersPage = users.data;

      });
  }

  paginate(event) {
    this.paginaAtual = event.page;
    this.pesquisarPendencias();
  }

  public onRowSelectPendencia($event) {
    this.irMantemUsuario(this.pendenciaUsuarioSelecionada.idUsuario);
  }

  public onRowSelectUser($event) {
    this.irMantemUsuario(this.usarioSelecionado.idUsuario);
  }

  public excluir(id: string) {
  }

  private getSubgroupsRecursively(group: KCGroupRepresentation): KCGroupRepresentation[] {
    let ret = group.subGroups;
    ret.forEach(g => ret = ret.concat(...this.getSubgroupsRecursively(g)));
    return ret;
  }

  private updateGroups(): void {
    const pGroups = this.apiUsuariosService.getGroups()
      .then(res => {
        this.gruposDisponiveis = res.data;
        this.desabilitaAprovacao = false;

        // Planifica a lista de grupos uma vez que subgrupos estão aninhados
        res.data.forEach(g => {
          this.gruposDisponiveis = this.gruposDisponiveis.concat(...this.getSubgroupsRecursively(g));
        });

        // Ordena os grupos pelo seu caminho (path)
        this.gruposDisponiveis.sort((g1, g2) => g1.path < g2.path ? -1 : 1);
      });
  }

  public aprovar(usuario: PendenciaUsuario) {
    (async () => {
      try {
        if (usuario.sqTipo === 'N') {
          this.grupoUsuarioAprovacao = this.obterGrupoPNome('JURIS_NACIONAL');
        } else if (usuario.sqTipo === 'C') {
          this.grupoUsuarioAprovacao = this.obterGrupoPNome('JURIS_COOPERATIVA');
        } else if (usuario.sqTipo === 'E') {
          this.grupoUsuarioAprovacao = this.obterGrupoPNome('JURIS_ESTADUAL');
        }
      } catch (e) {
        // Exceção intencionalmente silenciada, é tratada automaticamente pelo http interceptor
      } finally {
        this.apiUsuariosService.joinGroup(usuario.idUsuario, this.grupoUsuarioAprovacao.id)
          .then(() => this.pesquisarPendencias());
      }
    })();
  }

  public excluirGrupo(usuario: Usuario) {
    if (confirm('Tem certeza que deseja retirar o acesso deste usuário?')) {
      (async () => {
        try {
          if (usuario.sqTipo === 'N') {
            this.grupoUsuarioExclusao = this.obterGrupoPNome('JURIS_NACIONAL');
          } else if (usuario.sqTipo === 'C') {
            this.grupoUsuarioExclusao = this.obterGrupoPNome('JURIS_COOPERATIVA');
          } else if (usuario.sqTipo === 'E') {
            this.grupoUsuarioExclusao = this.obterGrupoPNome('JURIS_ESTADUAL');
          }
        } catch (e) {
          // Exceção intencionalmente silenciada, é tratada automaticamente pelo http interceptor
        } finally {
          this.apiUsuariosService.leaveGroup(usuario.idUsuario, this.grupoUsuarioExclusao.id)
            .then(() => this.pesquisarUsuarios());
        }
      })();
    }
  }
  obterGrupoPNome(nomeGrupo: string): KCGroupRepresentation {
    for (let i = 0; i < this.gruposDisponiveis.length; i++) {
      if (nomeGrupo === this.gruposDisponiveis[i].name) {
        return this.gruposDisponiveis[i];
      }
    }
  }
  onChangeFilter() {
    clearTimeout(this.debouncer);
    this.debouncer = setTimeout(() => {
      this.dt.reset();
    }, this.delay);
  }
  loadLazy(event: LazyLoadEvent) {
  }
}
