/* tslint:disable: max-line-length */
// Angular Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// Outros imports
import { LoadingModule } from 'ngx-loading';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { AutoCompleteModule, DialogModule, FieldsetModule,
  MultiSelectModule, PickListModule, ProgressSpinnerModule, ChipsModule, TabViewModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import {TreeModule} from 'primeng/tree';
import { AppRoutingModule } from './app-routing.module';
import {MenubarModule} from 'primeng/menubar';
import {SpinnerModule} from 'primeng/spinner';

// App Imports
import { AppComponent, XhrInterceptor } from './app.component';
import { DisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';
import { HideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { InicioComponent } from './layout/inicio/inicio.component';
import { AppMenuComponent, AppSubMenuComponent } from './layout/menu/app.menu.component';
import { AppRodapeComponent } from './layout/rodape/app.rodape.component';
import { AppBreadcrumbComponent } from './layout/topbar/app.breadcrumb.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { CacheService } from './services/cache/cache.service';
import { HTTPListener } from './services/RxJS/HTTPListener.service';
import { HTTPStatus } from './services/RxJS/HTTPStatus.service';
import { UtilityService} from './services/utility/utility.service';
import { ErroAcessoComponent } from './erro-acesso/erro-acesso.component';
import { HideIfNacionalDirective } from './directives/hide-if-nacional.directive';
import { MantemClienteComponent } from './clientes/mantem-cliente/mantem-cliente.component';
import { MantemVendedorComponent } from './vendedor/mantem-vendedor/mantem-vendedor.component';
import { MantemFornecedorComponent } from './fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { LoginComponent } from './login/login/login.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto/lista-produto.component';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosVendasComponent } from './vendas/produtos-vendas/produtos-vendas.component';
import { PedidosComponent } from './vendas/pedidos/pedidos.component';
import { CarrinhoComprasComponent } from './vendas/carrinho-compras/carrinho-compras.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';
import { CustExtBrowserXhr } from './services/utility/CustExtBrowserXhr';
import { ExtBrowser } from './services/utility/ExtBrowser';
import { BrowserXhr, HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '../../node_modules/@angular/common';
/* tslint:enable: max-line-length */

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppRodapeComponent,
    AppBreadcrumbComponent,
    DisableIfUnauthorizedDirective,
    HideIfUnauthorizedDirective,
    HideIfNacionalDirective,
    ErroAcessoComponent,

    MantemClienteComponent,
    MantemVendedorComponent,
    MantemFornecedorComponent,
    MantemProdutoComponent,
    LoginComponent,
    ListaProdutoComponent,
    VendasComponent,
    ProdutosVendasComponent,
    PedidosComponent,
    CarrinhoComprasComponent,
    LoginClienteComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    HttpModule,

    // PrimeNG Modules
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    CardModule,
    ScrollPanelModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RadioButtonModule,
    FieldsetModule,
    MultiSelectModule,
    GrowlModule,
    PanelModule,
    CalendarModule,
    InputMaskModule,
    DialogModule,
    AutoCompleteModule,
    PickListModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    OverlayPanelModule,
    TreeModule,
    ChipsModule,
    MenubarModule,
    SpinnerModule,


    // Outros imports
    LoadingModule,

    // Upload
    FileUploadModule
  ],
  providers: [
    ...RxJS_Services,
    {
      provide: BrowserXhr,
      useClass: ExtBrowser
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    },
    ConfirmationService,
    MessageService,
    BreadcrumbService,
    CacheService,
    AuthGuardService,
    UtilityService,
    AppMenuComponent,
    AppSubMenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


