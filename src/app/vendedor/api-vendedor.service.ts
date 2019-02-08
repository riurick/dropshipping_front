import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Vendedor } from '../entities/Vendedor';

@Injectable({
  providedIn: 'root'
})
export class ApiVendedorService {

  constructor(private http: HttpClient) { }
  get(id: Number) {
    return this.http.get<IServiceResponse<Vendedor>>(`/api-vendas/api/v1/vendedor/${id}`)
      .toPromise();
  }
  salvar(vendedor: Vendedor) {
    return this.http.post<IServiceResponse<Vendedor>>('/api-vendas/api/v1/vendedor', vendedor)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Vendedor[]>>(`/api-vendas/api/v1/vendedor`)
      .toPromise();
  }
  alterar(vendedor: Vendedor) {
    return this.http.put<IServiceResponse<Vendedor>>(`/api-vendas/api/v1/vendedor/${vendedor.id}`, vendedor)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(`/api-vendas/api/v1/vendedor/${id}`)
      .toPromise();
  }
}
