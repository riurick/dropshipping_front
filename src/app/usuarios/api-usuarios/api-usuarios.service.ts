import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceResponse } from 'src/app/entities/IResponse';
import { KCGroupRepresentation } from 'src/app/entities/KCGroupRepresentation';
import { KCUserRepresentation } from 'src/app/entities/KCUserRepresentation';
import { IPage } from 'src/app/entities/IPage';
import { Usuario } from '../../entities/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  constructor(private http: HttpClient) { }

  getUsers(): Promise<IServiceResponse<KCUserRepresentation[]>> {
    return this.http.get<IServiceResponse<KCUserRepresentation[]>>('/gerencia-usuario/api/v1/usuario')
      .toPromise();
  }

  obterUsuarios(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<KCUserRepresentation[]>>('/gerencia-usuario/api/v1/usuario/busca', options)
    .toPromise();
  }

  obterUsuariosPaginado(options: { params: HttpParams}) {
    return this.http.get<IServiceResponse<IPage<Usuario>>>('/gerencia-usuario/api/v1/usuario/buscaPaginada', options)
    .toPromise();
  }

  getUsersByName(username: string): Promise<IServiceResponse<KCUserRepresentation[]>> {
    return this.http.get<IServiceResponse<KCUserRepresentation[]>>(`/gerencia-usuario/api/v1/usuario/${username}`)
      .toPromise();
  }

  getUser(id: string): Promise<IServiceResponse<KCUserRepresentation>> {
    return this.http.get<IServiceResponse<KCUserRepresentation>>(`/gerencia-usuario/api/v1/usuario/${id}`)
      .toPromise();
  }

  getGroups(): Promise<IServiceResponse<KCGroupRepresentation[]>> {
    return this.http.get<IServiceResponse<KCGroupRepresentation[]>>('/gerencia-usuario/api/v1/grupo')
      .toPromise();
  }

  getGroupsByUser(userId: string): Promise<IServiceResponse<KCGroupRepresentation[]>> {
    return this.http.get<IServiceResponse<KCGroupRepresentation[]>>(`/gerencia-usuario/api/v1/usuario/${userId}/grupo`)
      .toPromise();
  }

  joinGroup(userId: string, groupId: string): Promise<IServiceResponse<string>> {
    return this.http.post<IServiceResponse<string>>(`/gerencia-usuario/api/v1/usuario/${userId}/joingroup/${groupId}`, null)
      .toPromise();
  }

  leaveGroup(userId: string, groupId: string): Promise<IServiceResponse<string>> {
    return this.http.delete<IServiceResponse<string>>(`/gerencia-usuario/api/v1/usuario/${userId}/leavegroup/${groupId}`)
      .toPromise();
  }
}
