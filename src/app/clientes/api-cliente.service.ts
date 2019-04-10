import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../entities/CLiente';
import { IServiceResponse } from '../entities/IResponse';
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
export class ApiClienteService {
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  getByEmail(email: String) {
    return this.http.get<IServiceResponse<Cliente>>( this.utility.apiControleUrl() + `/api-controle/api/v1/clientes/getByEmail/${email}`)
      .toPromise();
  }


getCliente(id: Number) {
  return this.http.get<IServiceResponse<Cliente>>(this.utility.apiVendasUrl() + `/api-vendas/api/v1/clientes/${id}`, httpOptions)
    .toPromise();
}
salvarCliente(cliente: Cliente) {
  return this.http.post<IServiceResponse<Cliente>>(this.utility.apiVendasUrl() + '/api-vendas/api/v1/clientes', cliente)
    .toPromise();
}
lista() {
  return this.http.get<IServiceResponse<Cliente[]>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/clientes`)
    .toPromise();
}
alterar(cliente: Cliente) {
  return this.http.put<IServiceResponse<Cliente>>(this.utility.apiVendasUrl() + `/api-vendas/api/v1/clientes/${cliente.id}`, cliente)
    .toPromise();
}
excluir(id) {
  return this.http.delete<IServiceResponse<any>>( this.utility.apiVendasUrl() + `/api-vendas/api/v1/clientes/${id}`)
    .toPromise();
}
}
