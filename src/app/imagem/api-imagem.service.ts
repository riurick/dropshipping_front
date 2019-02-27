import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Imagem } from '../entities/Imagem';

@Injectable({
  providedIn: 'root'
})
export class ApiImagemService {
  buscaImagemId(id: Number) {
    return this.http.get(`/api-vendas/api/v1/imagem/arquivo/` + id, { responseType: 'blob' }).toPromise();
  }

  constructor(private http: HttpClient) { }

  get(id: Number) {
    return this.http.get<IServiceResponse<Imagem>>(`/api-vendas/api/v1/imagem/${id}`)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Imagem[]>>(`/api-vendas/api/v1/imagem`)
      .toPromise();
  }
  alterar(imagem: Imagem) {
    return this.http.put<IServiceResponse<Imagem>>(`/api-vendas/api/v1/imagem/${imagem.id}`, imagem)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/api-vendas/api/v1/imagem/${id}`)
      .toPromise();
  }
  buscaPorProduto(id: Number) {
    return this.http.get<IServiceResponse<Imagem[]>>(`/api-vendas/api/v1/imagem/buscarPorProduto/${id}`)
    .toPromise();
  }
}
