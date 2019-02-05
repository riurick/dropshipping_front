import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { TipoDeProcesso } from '../../entities/TipoDeProcesso';

@Injectable({
  providedIn: 'root'
})
export class ApiTiposDeProcessosService {

  constructor(private http: HttpClient) { }
  getTiposPaginado(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<IPage<TipoDeProcesso>>>('/juris/api/v1/tipoprocessos/filtro', options)
      .toPromise();
  }

  getTiposNaoPaginado(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<TipoDeProcesso[]>>('/juris/api/v1/tipoprocessos/filtro/todos', options)
      .toPromise();
  }

  salvarNovoTipoDeProcesso(tipoDeProcesso: TipoDeProcesso) {
    return this.http.post<IServiceResponse<any>>('/juris/api/v1/tipoprocessos', tipoDeProcesso)
      .toPromise();
  }

  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/juris/api/v1/tipoprocessos/${id}`)
      .toPromise();
  }

  alterarTipoDeProcesso(tipoDeProcesso: TipoDeProcesso) {
    return this.http.put<IServiceResponse<TipoDeProcesso>>(`/juris/api/v1/tipoprocessos/${tipoDeProcesso.id}`, tipoDeProcesso)
      .toPromise();
  }

  getTipoDeProcesso(id: string) {
    return this.http.get<IServiceResponse<TipoDeProcesso>>(`/juris/api/v1/tipoprocessos/${id}`)
      .toPromise();
  }

}
