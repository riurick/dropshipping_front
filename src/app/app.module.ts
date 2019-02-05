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
   PickListModule, ProgressSpinnerModule, ChipsModule, TabViewModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import {TreeModule} from 'primeng/tree';
import { AppRoutingModule } from './app-routing.module';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

// App Imports
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InicioComponent } from './layout/inicio/inicio.component';
import { AppMenuComponent, AppSubMenuComponent } from './layout/menu/app.menu.component';
import { AppRodapeComponent } from './layout/rodape/app.rodape.component';
import { AppBreadcrumbComponent } from './layout/topbar/app.breadcrumb.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { CacheService } from './services/cache/cache.service';
import { ExportarPlanilhaService } from './services/exportar-planilha/exportar-planilha.service';
import { HTTPListener } from './services/RxJS/HTTPListener.service';
import { HTTPStatus } from './services/RxJS/HTTPStatus.service';
import { ListagemSubTemaComponent } from './subtemas/listagem-subtemas/listagem-subtemas.component';
import { MantemSubTemasComponent } from './subtemas/mantem-subtemas/mantem-subtemas.component';
import { ListagemTemasComponent } from './temas/listagem-temas/listagem-temas.component';
import { MantemTemaComponent } from './temas/mantem-tema/mantem-tema.component';
import { ListagemTipoDeProcessoComponent } from './tipos-de-processos/listagem-tipo-de-processo/listagem-tipo-de-processo.component';
import { MantemTipoDeProcessoComponent } from './tipos-de-processos/mantem-tipo-de-processo/mantem-tipo-de-processo.component';
import { ListagemTribunaisComponent } from './tribunais/listagem-tribunais/listagem-tribunais.component';
import { MantemTribunalComponent } from './tribunais/mantem-tribunal/mantem-tribunal.component';
import { UtilityService} from './services/utility/utility.service';
import { ListagemUsuariosComponent } from './usuarios/listagem-usuarios/listagem-usuarios.component';
import { MantemUsuarioComponent } from './usuarios/mantem-usuario/mantem-usuario.component';
import { ErroAcessoComponent } from './erro-acesso/erro-acesso.component';
/* tslint:enable: max-line-length */

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListagemTribunaisComponent,
    ListagemTemasComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppRodapeComponent,
    ListagemTipoDeProcessoComponent,
    ListagemSubTemaComponent,
    MantemTribunalComponent,
    AppBreadcrumbComponent,
    MantemTemaComponent,
    MantemTipoDeProcessoComponent,
    MantemSubTemasComponent,
    FileUploadComponent,
    ListagemUsuariosComponent,
    MantemUsuarioComponent,
    ErroAcessoComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

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

    // Outros imports
    LoadingModule,

    // Upload
    FileUploadModule
  ],
  providers: [
    ...RxJS_Services,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    },
    ConfirmationService,
    MessageService,
    ExportarPlanilhaService,
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

declare var keycloak: any;

export function onAppInit() {
  
}
