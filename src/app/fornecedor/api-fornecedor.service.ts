import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Fornecedor } from '../entities/Fornecedor';
import { UtilityService } from '../services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFornecedorService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  get(id: Number) {
    return this.http.get<IServiceResponse<Fornecedor>>(`/api-vendas/api/v1/fornecedor/${id}`)
      .toPromise();
  }
  salvar(fornecedor: Fornecedor) {
    return this.http.post<IServiceResponse<Fornecedor>>('/api-vendas/api/v1/fornecedor', fornecedor)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Fornecedor[]>>( `/api-vendas/api/v1/fornecedor`)
      .toPromise();
  }
  alterar(fornecedor: Fornecedor) {
    return this.http.put<IServiceResponse<Fornecedor>>( `/api-vendas/api/v1/fornecedor/${fornecedor.id}`, fornecedor)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>( `/api-vendas/api/v1/fornecedor/${id}`)
      .toPromise();
  }
  getByEmail(email: String) {
    return this.http.get<IServiceResponse<Fornecedor>>( `/api-vendas/api/v1/fornecedor/getByEmail/${email}`)
      .toPromise();
  }
}
