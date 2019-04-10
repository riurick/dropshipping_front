import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Fornecedor } from '../entities/Fornecedor';
import { UtilityService } from '../services/utility/utility.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': '$2a$10$s2ZRqrMSxhcqyCxWIxRs9eDjOhIb1FFECZJS4J60mWcQVMF64V8Xy',
    'userid': '2'
  })};
@Injectable({
  providedIn: 'root'
})
export class ApiFornecedorService {
  token: any;
  httpHeaders: any;
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) {

  }

  get(id: Number) {
    return this.http.get<IServiceResponse<Fornecedor>>(this.utility.apiVendasUrl()
    + `/api-vendas/api/v1/fornecedor/${id}`, this.httpHeaders)
      .toPromise();
  }
  salvar(fornecedor: Fornecedor) {
    return this.http.post<IServiceResponse<Fornecedor>>(this.utility.apiVendasUrl() + '/api-vendas/api/v1/fornecedor', fornecedor)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Fornecedor[]>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/fornecedor`)
      .toPromise();
  }
  alterar(fornecedor: Fornecedor) {
    return this.http.put<IServiceResponse<Fornecedor>>(this.utility.apiVendasUrl() +
    `/api-vendas/api/v1/fornecedor/${fornecedor.id}`, fornecedor)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/fornecedor/${id}`)
      .toPromise();
  }
  getByEmail(email: String) {

      // this.httpHeaders = {
       // headers:new HttpHeaders().set('X-Auth-Token', token)};

        return this.http.get<IServiceResponse<Fornecedor>>( this.utility.apiVendasUrl()
        + `/api-vendas/api/v1/fornecedor/getByEmail/${email}`/*, this.httpHeaders*/)
          .toPromise();

  }

  getToken() {
    return this.http.get(this.utility.apiVendasUrl() + '/api-vendas/api/v1/usuario/token').toPromise();
  }
}
