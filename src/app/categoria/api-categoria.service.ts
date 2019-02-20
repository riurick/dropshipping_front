import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Categoria } from '../entities/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriaService {

  constructor(private http: HttpClient) { }

  get(id: Number) {
    return this.http.get<IServiceResponse<Categoria>>(`/api-vendas/api/v1/categoria/${id}`)
      .toPromise();
  }
  salvar(categoria: Categoria) {
    return this.http.post<IServiceResponse<Categoria>>('/api-vendas/api/v1/categoria', categoria)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Categoria[]>>(`/api-vendas/api/v1/categoria`)
      .toPromise();
  }
  alterar(categoria: Categoria) {
    return this.http.put<IServiceResponse<Categoria>>(`/api-vendas/api/v1/categoria/${categoria.id}`, categoria)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/api-vendas/api/v1/categoria/${id}`)
      .toPromise();
  }
}
