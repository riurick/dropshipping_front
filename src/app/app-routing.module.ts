/* tslint:disable: max-line-length */
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './layout/inicio/inicio.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ListagemSubTemaComponent } from './subtemas/listagem-subtemas/listagem-subtemas.component';
import { MantemSubTemasComponent } from './subtemas/mantem-subtemas/mantem-subtemas.component';
import { ListagemTemasComponent } from './temas/listagem-temas/listagem-temas.component';
import { MantemTemaComponent } from './temas/mantem-tema/mantem-tema.component';
import { ListagemTipoDeProcessoComponent } from './tipos-de-processos/listagem-tipo-de-processo/listagem-tipo-de-processo.component';
import { MantemTipoDeProcessoComponent } from './tipos-de-processos/mantem-tipo-de-processo/mantem-tipo-de-processo.component';
import { ListagemTribunaisComponent } from './tribunais/listagem-tribunais/listagem-tribunais.component';
import { MantemTribunalComponent } from './tribunais/mantem-tribunal/mantem-tribunal.component';
import { ListagemUsuariosComponent } from './usuarios/listagem-usuarios/listagem-usuarios.component';
import { MantemUsuarioComponent } from './usuarios/mantem-usuario/mantem-usuario.component';
/* tslint:enable: max-line-length */

const appRoutes: Routes = [
  { path: 'tribunais', component: ListagemTribunaisComponent, canActivate: [AuthGuardService] },
  { path: 'novotribunal', component: MantemTribunalComponent, canActivate: [AuthGuardService] },
  { path: 'editartribunal/:id', component: MantemTribunalComponent, canActivate: [AuthGuardService] },
  { path: 'editartema/:id', component: MantemTemaComponent, canActivate: [AuthGuardService] },
  { path: 'novotema', component: MantemTemaComponent, canActivate: [AuthGuardService] },
  { path: 'temas', component: ListagemTemasComponent, canActivate: [AuthGuardService] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuardService] },
  { path: 'subtema', component: ListagemSubTemaComponent, canActivate: [AuthGuardService] },
  { path: 'tipodeprocesso', component: ListagemTipoDeProcessoComponent, canActivate: [AuthGuardService] },
  { path: 'novotipodeprocesso', component: MantemTipoDeProcessoComponent, canActivate: [AuthGuardService] },
  { path: 'editartipodeprocesso/:id', component: MantemTipoDeProcessoComponent, canActivate: [AuthGuardService] },
  { path: 'novosubtema', component: MantemSubTemasComponent, canActivate: [AuthGuardService] },
  { path: 'editarsubtema/:id', component: MantemSubTemasComponent, canActivate: [AuthGuardService] },
  { path: 'usuarios', component: ListagemUsuariosComponent, canActivate: [AuthGuardService] },
  { path: 'editarusuario/:id', component: MantemUsuarioComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'inicio' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
