import { UtilityService } from './../../services/utility/utility.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IPage } from '../../entities/IPage';
import { IServiceResponse } from '../../entities/IResponse';
import { SubTema } from '../../entities/SubTema';
import { ExportarPlanilhaService } from '../../services/exportar-planilha/exportar-planilha.service';
import { ApiSubtemasService } from '../api-subtemas/api-subtemas.service';
import { BreadcrumbService } from './../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-listagem-sub-tema',
  templateUrl: './listagem-subtemas.component.html',
  styleUrls: ['./listagem-subtemas.component.css']
})
export class ListagemSubTemaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private planilhaService: ExportarPlanilhaService,
    private subtemaService: ApiSubtemasService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Cadastros'},
      {label: 'Sub-Tema', routerLink: 'subtema'}
    ]);
   }

  subTema: SubTema[] = [];
  responsePage: IServiceResponse<IPage<SubTema>>;
  paginaAtual = 0;
  numeroDePaginas = 0;
  nrLinhasTabela = 20;
  totalRecords = 0;

  @ViewChild('dt') dt: Table;
  private timer;
  private delay = 500;
  filtroNomeTema = '';
  filtroNomeSubTema = '';
  filtroAtivo = true;
  nomeArquivo = 'Relatorio_Subtemas.xlsx';
  botaoExportar: boolean;

  cols: { field: string, header: string }[];

  onChangeFilter() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.dt.reset();
    }, this.delay);
  }

  getSubTema(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<SubTema>>> {
    sortField = sortField || 'nome';
    const sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsSubtema(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
    return this.subtemaService.getSubtemasPaginado(options);
  }

  carregaOptionsSubtema(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
    const options = {
      params: new HttpParams()
        .set('page', pagina)
        .set('size', nrLinhas)
        .set('sort', `${sortField},${sortOrder}`)
    };

    options.params = this.utilityService.carregaParamsString(this.filtroNomeTema, options.params, 'nomeTema');
    options.params = this.utilityService.carregaParamsString(this.filtroNomeSubTema, options.params, 'nomeSubTema');
    options.params = options.params.set('ativo', this.filtroAtivo + '');

    return options;
  }

  exportarTabela() {
    const options = this.carregaOptionsSubtema('0', this.responsePage.data.totalElements.toString(), '', 'asc');
    this.subtemaService.getSubtemasNaoPaginado(options)
      .then(response => {
        Object.assign(response.data, response.data.map(st => ({
          Tema: st.tema.nome,
          Sub_Tema: st.nome,
          Ativo: st.situacao ? 'sim' : 'não'
        })));

        this.planilhaService.exportar(response, this.nomeArquivo);

      });
  }

  editar() {


  }

  excluir(id) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.subtemaService.excluir(id)
          .then(() => this.dt.reset()
        );
      }
    });
  }

  loadLazy(event: LazyLoadEvent) {
    this.getSubTema(event.first / event.rows, event.sortField, event.sortOrder).then(responsePage => {
      this.responsePage = responsePage;
      this.botaoExportar = this.responsePage.data.content.length > 0 ? true : false;

    });
  }

  onSort(event: SortEvent) {
    console.log(event);
  }

  ngOnInit() {
    this.cols = [
      { field: 'tema.nome', header: 'Tema' },
      { field: 'nome', header: 'Sub-Tema' },
      { field: 'situacao', header: 'Situação' }
    ];
  }

}
