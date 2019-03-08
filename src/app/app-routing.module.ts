/* tslint:disable: max-line-length */
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './layout/inicio/inicio.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { MantemClienteComponent } from './clientes/mantem-cliente/mantem-cliente.component';
import { MantemVendedorComponent } from './vendedor/mantem-vendedor/mantem-vendedor.component';
import { MantemFornecedorComponent } from './fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto/lista-produto.component';
/* tslint:enable: max-line-length */

const appRoutes: Routes = [
  { path: 'app', component: AppComponent},
  { path: 'login-fornecedor', component: LoginComponent},
  { path: 'novo-cliente', component: MantemClienteComponent},
  { path: 'editar-cliente/:id', component: MantemClienteComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'novo-vendedor', component: MantemVendedorComponent},
  { path: 'editar-vendedor/:id', component: MantemVendedorComponent},
  { path: 'novo-fornecedor', component: MantemFornecedorComponent},
  { path: 'editar-fornecedor/:id', component: MantemFornecedorComponent},
  { path: 'novo-produto/:idFornecedor', component: MantemProdutoComponent},
  { path: 'editar-produto/:id', component: MantemProdutoComponent},
  { path: 'lista-produto/:idFornecedor', component: ListaProdutoComponent},
  { path: '**', redirectTo: 'inicio' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
