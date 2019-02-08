/* tslint:disable: max-line-length */
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './layout/inicio/inicio.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { MantemClienteComponent } from './clientes/mantem-cliente/mantem-cliente.component';
/* tslint:enable: max-line-length */

const appRoutes: Routes = [
  { path: 'novo-cliente', component: MantemClienteComponent},
  { path: 'editar-cliente/:id', component: MantemClienteComponent},
  { path: 'inicio', component: InicioComponent },
  { path: '**', redirectTo: 'inicio' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
