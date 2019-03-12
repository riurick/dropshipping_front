import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Produto } from '../entities/Produto';
import { IPage } from '../entities/IPage';

@Injectable({
  providedIn: 'root'
})
export class ApiProdutoService {

  constructor(private http: HttpClient) { }

  get(id: Number) {
    return this.http.get<IServiceResponse<Produto>>(`/api-vendas/api/v1/produto/${id}`)
      .toPromise();
  }
  salvar(produto: Produto) {
    return this.http.post<IServiceResponse<Produto>>('/api-vendas/api/v1/produto', produto)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Produto[]>>(`/api-vendas/api/v1/produto`)
      .toPromise();
  }
  alterar(produto: Produto) {
    return this.http.put<IServiceResponse<Produto>>(`/api-vendas/api/v1/produto/${produto.id}`, produto)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/api-vendas/api/v1/produto/${id}`)
      .toPromise();
  }
  filtra(options: { params: HttpParams }) {
    return this.http.get<IServiceResponse<IPage<Produto>>>(`/api-vendas/api/v1/produto/filtro`, options)
      .toPromise();
  }
  listaPorFornecedor(idFornecedor: Number) {
    return this.http.get<IServiceResponse<Produto[]>>(`/api-vendas/api/v1/produto/listaPorFornecedor/${idFornecedor}`)
    .toPromise();
  }
}
