import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../entities/CLiente';
import { IServiceResponse } from '../entities/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {

  constructor(private http: HttpClient) { }

getCliente(id: Number) {
  return this.http.get<IServiceResponse<Cliente>>(`/api-vendas/api/v1/clientes/${id}`)
    .toPromise();
}
salvarCliente(cliente: Cliente) {
  return this.http.post<IServiceResponse<Cliente>>('/api-vendas/api/v1/clientes', cliente)
    .toPromise();
}
lista() {
  return this.http.get<IServiceResponse<Cliente[]>>(`/api-vendas/api/v1/clientes`)
    .toPromise();
}
alterar(cliente: Cliente) {
  return this.http.put<IServiceResponse<Cliente>>(`/api-vendas/api/v1/clientes/${cliente.id}`, cliente)
    .toPromise();
}
excluir(id) {
  return this.http.delete<IServiceResponse<any>>(`/api-vendas/api/v1/clientes/${id}`)
    .toPromise();
}
}
