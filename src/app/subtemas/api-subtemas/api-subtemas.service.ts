import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { SubTema } from '../../entities/SubTema';

@Injectable({
  providedIn: 'root'
})
export class ApiSubtemasService {

  constructor(private http: HttpClient) { }

  getSubtemasPaginado(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<IPage<SubTema>>>('/juris/api/v1/subtemas/filtro', options)
    .toPromise();
  }

  getSubtemasNaoPaginado(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<Array<SubTema>>>('/juris/api/v1/subtemas/filtro/todos', options)
    .toPromise();
  }

  getSubtemasRamo(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<Array<SubTema>>>('/juris/api/v1/subtemas/filtro/ramo', options)
    .toPromise();
  }

  getSubTemasTema(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<Array<SubTema>>>('/juris/api/v1/subtemas/por-tema', options)
    .toPromise();
  }

  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/juris/api/v1/subtemas/${id}`)
      .toPromise();
  }

  salvarNovoSubTema(subTema: SubTema) {
    return this.http.post<IServiceResponse<any>>(`/juris/api/v1/subtemas?idTema=${subTema.tema.id}`, subTema)
      .toPromise();
  }

  alterarSubTema(subTema: SubTema) {
    return this.http.put<IServiceResponse<SubTema>>(`/juris/api/v1/subtemas/${subTema.id}`, subTema)
      .toPromise();
  }

  getSubTema(id: string) {
    return this.http.get<IServiceResponse<SubTema>>(`/juris/api/v1/subtemas/${id}`)
      .toPromise();
  }

}
