import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Produto } from '../entities/Produto';
import { IPage } from '../entities/IPage';
import { UtilityService } from '../services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProdutoService {
  token: any;
  httpHeaders: any;
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {
    http.get('token').subscribe(data => {
      this.token = data['token'];
      this.httpHeaders = {
        headers: new HttpHeaders().set('X-Auth-Token', this.token)};
    });
   }

  get(id: Number) {
    return this.http.get<IServiceResponse<Produto>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/produto/${id}`)
      .toPromise();
  }
  salvar(produto: Produto) {
    return this.http.post<IServiceResponse<Produto>>( this.utility.apiVendasUrl() + '/api-vendas/api/v1/produto', produto)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Produto[]>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/produto`)
      .toPromise();
  }
  alterar(produto: Produto) {
    return this.http.put<IServiceResponse<Produto>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/produto/${produto.id}`, produto)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(this.utility.apiVendasUrl() + `/api-vendas/api/v1/produto/${id}`)
      .toPromise();
  }
  filtra(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<IPage<Produto>>>(this.utility.apiVendasUrl() + `/api-vendas/api/v1/produto/filtro`, options)
      .toPromise();
  }
  listaPorFornecedor(idFornecedor: Number) {
    return this.http.get<IServiceResponse<Produto[]>>(this.utility.apiVendasUrl() +
    `/api-vendas/api/v1/produto/listaPorFornecedor/${idFornecedor}`)
    .toPromise();
  }
}
