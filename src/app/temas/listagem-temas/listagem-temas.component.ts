import { UtilityService } from './../../services/utility/utility.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { Tema } from '../../entities/Tema';
import { LazyLoadEvent, SortEvent, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ExportarPlanilhaService } from '../../services/exportar-planilha/exportar-planilha.service';
import { ApiTemasService } from '../api-temas/api-temas.service';
import { BreadcrumbService} from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-listagem-temas',
  templateUrl: './listagem-temas.component.html',
  styleUrls: ['./listagem-temas.component.css']
})
export class ListagemTemasComponent implements OnInit {

  constructor(private http: HttpClient,
              private planilhaService: ExportarPlanilhaService,
              private temaService: ApiTemasService,
              private breadcrumbService: BreadcrumbService,
              private utilityService: UtilityService,
              private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Tema', routerLink: 'temas'}
    ]);
   }

  responsePageTema: IServiceResponse<IPage<Tema>>;
  nrLinhasTabela = 10;
  private debouncer;
  private timer;
  private delay = 500;
  filtroNome = '';
  filtroDescricao = '';
  paginaAtual = 0;
  numeroDePaginas = 0;
  totalRecords = 0;
  temas: Tema[] = [];
  @ViewChild('dt') dt: Table;
  filtroSituacao = true;
  nomeArquivo = 'Relatorio_Temas.xlsx';
  botaoExportar: boolean;

  cols: { field: string, header: string }[];

  onChangeFilter() {
    clearTimeout(this.debouncer);
    this.debouncer = setTimeout(() => {
      this.dt.reset();
    }, this.delay);
  }

  getTemas(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Tema>>> {
    sortField = sortField || 'nome';
    let sort: string;
    sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsTema(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);

    return this.temaService.getTemasPaginado(options);
  }

  carregaOptionsTema(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
    const options = {
      params: new HttpParams()
        .set('page', pagina)
        .set('size', nrLinhas)
        .set('sort', `${sortField},${sortOrder}`)
    };

    options.params = this.utilityService.carregaParamsString(this.filtroNome, options.params, 'nome');
    options.params = this.utilityService.carregaParamsString(this.filtroDescricao, options.params, 'descricao');
    options.params = options.params.set('situacao', this.filtroSituacao + '');

    return options;
  }

  loadLazy(event: LazyLoadEvent) {
    this.getTemas(event.first / event.rows, event.sortField, event.sortOrder)
    .then(responsePageTema => {
      this.responsePageTema = responsePageTema;
       this.botaoExportar = this.responsePageTema.data.content.length > 0 ? true : false;
    });
  }

  onSort(event: SortEvent) {
    console.log(event);
  }

  excluir(id) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este Tema?',
      accept: () => {
        this.temaService.excluir(id)
          .then(() => this.dt.reset()
        );
      }
    });
  }

  exportarTabela() {
    const options = this.carregaOptionsTema('0', this.responsePageTema.data.totalElements.toString(), '', 'asc');

    this.temaService.getTemasNaoPaginadoExportar(options)
      .then(response => {
           Object.assign(response.data, response.data.map(obj => ({
             Tema: obj.nome,
             Descrição: obj.descricao,
             Ativo: obj.situacao ? 'sim' : 'não'
           })));

      this.planilhaService.exportar(response, this.nomeArquivo);
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Tema' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'situacao', header: 'Situação' }
    ];
  }

}
