import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IServiceResponse } from '../../entities/IResponse';
import { IPage } from '../../entities/IPage';
import { Tema } from '../../entities/Tema';

@Injectable({
  providedIn: 'root'
})
export class ApiTemasService {

  constructor(private http: HttpClient) { }

  getTema(id: string) {
    return this.http.get<IServiceResponse<Tema>>(`/juris/api/v1/temas/${id}`)
      .toPromise();
  }

  getTemaPorRamo(options: {params: HttpParams}) {
    return this.http.get<IServiceResponse<Tema[]>>(`/juris/api/v1/temas/filtro/ramo`, options)
      .toPromise();
  }

  getTemasPaginado(options: {params: HttpParams}) {
    return this.http.get<IServiceResponse<IPage<Tema>>>('/juris/api/v1/temas/filtro', options)
      .toPromise();
  }

  getTemasNaoPaginado(options: {params: HttpParams}) {
    return this.http.get<IServiceResponse<IPage<Tema>>>('/juris/api/v1/temas/filtro', options)
      .toPromise();
  }

  getTemasAtivo(options: {params: HttpParams}) {
    return this.http.get<IServiceResponse<Tema[]>>('/juris/api/v1/temas/ativo', options)
      .toPromise();
  }

  getTemasNaoPaginadoExportar(options: {params: HttpParams}) {
    return this.http.get<IServiceResponse<Array<Tema>>>('/juris/api/v1/temas/filtro/todos', options)
      .toPromise();
  }

  salvarNovoTema(tema: Tema) {
    return this.http.post<IServiceResponse<Tema>>('/juris/api/v1/temas', tema)
      .toPromise();
  }

  alterarTema(tema: Tema) {
    return this.http.put<IServiceResponse<Tema>>(`/juris/api/v1/temas/${tema.id}`, tema)
      .toPromise();
  }

  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/juris/api/v1/temas/${id}`)
      .toPromise();
  }
}
