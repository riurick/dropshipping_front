import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { Tribunal } from '../../entities/Tribunal';

@Injectable({
  providedIn: 'root'
})
export class ApiTribunaisService {

  constructor(private http: HttpClient) { }

  getTribunal(id: string) {
    return this.http.get<IServiceResponse<Tribunal>>(`/juris/api/v1/tribunais/${id}`)
      .toPromise();
  }

  getTribunaisPaginado(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<IPage<Tribunal>>>('/juris/api/v1/tribunais/filtro', options)
      .toPromise();
  }

  getTribunaisNaoPaginado(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<Tribunal[]>>('/juris/api/v1/tribunais/filtro/todos', options)
      .toPromise();
  }

  excluirTribunal(id) {
    return this.http.delete<IServiceResponse<any>>(`/juris/api/v1/tribunais/${id}`)
      .toPromise();

  }

  salvarNovoTribunal(tribunal: Tribunal) {
    return this.http.post<IServiceResponse<Tribunal>>('/juris/api/v1/tribunais', tribunal)
      .toPromise();
  }

  alterarTribunal(tribunal: Tribunal) {
    return this.http.put<IServiceResponse<Tribunal>>(`/juris/api/v1/tribunais/${tribunal.id}`, tribunal)
      .toPromise();
  }

}
