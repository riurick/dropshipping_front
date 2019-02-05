import { UtilityService } from './../../services/utility/utility.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { IPage } from '../../entities/IPage';
import { IServiceResponse } from '../../entities/IResponse';
import { TipoDeProcesso } from '../../entities/TipoDeProcesso';
import { Table } from 'primeng/table';
import { ExportarPlanilhaService } from '../../services/exportar-planilha/exportar-planilha.service';
import { ApiTiposDeProcessosService } from '../api-tipos-de-processos/api-tipos-de-processos.service';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService} from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-listagem-tipo-de-processo',
  templateUrl: './listagem-tipo-de-processo.component.html',
  styleUrls: ['./listagem-tipo-de-processo.component.css']
})
export class ListagemTipoDeProcessoComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private planilhaService: ExportarPlanilhaService,
    private tipoService: ApiTiposDeProcessosService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Tipo de Recurso', routerLink: 'tipodeprocesso'}
    ]);
   }

  tipoDeProcesso: TipoDeProcesso[] = [];
  responsePage: IServiceResponse<IPage<TipoDeProcesso>>;
  paginaAtual = 0;
  numeroDePaginas = 0;
  nrLinhasTabela = 20;
  totalRecords = 0;

  @ViewChild('dt') dt: Table;
  private timer;
  private delay = 500;
  filtroSigla = '';
  filtroDescricao = '';
  filtroSituacao = true;
  nomeArquivo = 'Relatorio_Tipos_de_Recursos.xlsx';
  botaoExportar: boolean;
  cols: { field: string, header: string }[];

  onChangeFilter() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.dt.reset();
    }, this.delay);
  }

  getTipoDeProcesso(pagina = 0, sortField = 'sigla', sortOrder = 1): Promise<IServiceResponse<IPage<TipoDeProcesso>>> {
    sortField = sortField || 'sigla';
    let sort: string;
    sort = sortOrder === 1 ? 'asc' : 'desc';
    const options = this.carregaOptionsTipoProcesso(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);

    return this.tipoService.getTiposPaginado(options);

  }

  carregaOptionsTipoProcesso(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
    const options = {
      params: new HttpParams()
        .set('page', pagina)
        .set('size', nrLinhas)
        .set('sort', `${sortField },${sortOrder}`)
    };

    options.params = this.utilityService.carregaParamsString(this.filtroSigla, options.params, 'sigla');
    options.params = this.utilityService.carregaParamsString(this.filtroDescricao, options.params, 'descricao');
    options.params = options.params.set('situacao', this.filtroSituacao + '');

    return options;
  }

  exportarTabela() {
    const options = this.carregaOptionsTipoProcesso( '0', this.responsePage.data.totalElements.toString(), '', 'asc');

    this.tipoService.getTiposNaoPaginado(options)
      .then(response => {
        Object.assign(response.data, response.data.map( obj => ({
          Sigla: obj.sigla,
          Descrição: obj.descricao,
          Ativo: obj.situacao ? 'sim' : 'não'
        })));

        this.planilhaService.exportar(response, this.nomeArquivo);

    });

  }
  excluir(id) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.tipoService.excluir(id)
          .then(() => this.dt.reset()
        );
      }
    });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getTipoDeProcesso(event.first / event.rows, event.sortField, event.sortOrder).then(responsePage => {
      this.responsePage = responsePage;
      this.botaoExportar = this.responsePage.data.content.length > 0 ? true : false;
    });
  }

  onSort(event: SortEvent) {
    console.log(event);
  }

  ngOnInit() {
    this.cols = [
      { field: 'sigla', header: 'Sigla' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'situacao', header: 'Situação' }
    ];
  }

}
