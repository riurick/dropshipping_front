import { UtilityService } from './../../services/utility/utility.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IPage } from '../../entities/IPage';
import { IServiceResponse } from '../../entities/IResponse';
import { Tribunal } from '../../entities/Tribunal';
import { ExportarPlanilhaService } from '../../services/exportar-planilha/exportar-planilha.service';
import { ApiTribunaisService } from '../api-tribunais/api-tribunais.service';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService} from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-listagem-tribunais',
  templateUrl: './listagem-tribunais.component.html'
})
export class ListagemTribunaisComponent implements OnInit {

  constructor(
    private planilhaService: ExportarPlanilhaService,
    private tribunalAPI: ApiTribunaisService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Tribunal', routerLink: 'tribunais'}
    ]);
  }

  responsePageTribunal: IServiceResponse<IPage<Tribunal>>;
  nrLinhasTabela = 20 ;
  private debouncer;
  private delay = 500;
  filtroNome = '';
  filtroSigla = '';
  filtroAtivo = true;
  nomeArquivo = 'Relatorio_Tribunais.xlsx';
  planilha: IServiceResponse<Array<Tribunal>>;
  @ViewChild('dt') dt: Table;
  botaoExportar: boolean;
  cols: { field: string, header: string }[];

  onChangeFilter() {
    clearTimeout(this.debouncer);
    this.debouncer = setTimeout(() => {
      this.dt.reset();
    }, this.delay);
  }

  excluirTribunal(id) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do tribunal?',
      accept: () => {
        this.tribunalAPI.excluirTribunal(id)
          .then(() => this.dt.reset());
      }
    });
  }

  getTribunais(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Tribunal>>> {
    sortField = sortField || 'nome';
    let sort: string;
    sort = sortOrder === 1 ? 'asc' : 'desc';
    const options = this.carregaOptionsTribunal(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
    return this.tribunalAPI.getTribunaisPaginado(options);
  }

  carregaOptionsTribunal(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
    const options = {
      params: new HttpParams()
        .set('page', pagina)
        .set('size', nrLinhas)
        .set('sort', `${sortField},${sortOrder}`)
    };

    options.params = this.utilityService.carregaParamsString(this.filtroNome, options.params, 'nome');
    options.params = this.utilityService.carregaParamsString(this.filtroSigla, options.params, 'sigla');
    options.params = options.params.set('ativo', this.filtroAtivo + '');
    return options;

  }

  exportarTabela() {
    const options = this.carregaOptionsTribunal('0', this.responsePageTribunal.data.totalElements.toString(), '', 'asc');
    this.tribunalAPI.getTribunaisNaoPaginado(options)
      .then(response => {
        Object.assign(response.data, response.data.map(obj => ({
          Sigla: obj.sigla,
          Nome: obj.nome,
          Ativo: obj.ativo ? 'sim' : 'não'
        })));

        this.planilhaService.exportar(response, this.nomeArquivo);
      });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getTribunais(event.first / event.rows, event.sortField, event.sortOrder).then(responsePageTribunal => {
      this.responsePageTribunal = responsePageTribunal;
      this.botaoExportar = this.responsePageTribunal.data.content.length > 0 ? true : false;

    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'sigla', header: 'Sigla' },
      { field: 'nome', header: 'Tribunal' },
      { field: 'ativo', header: 'Ativo' }
    ];
  }

}
