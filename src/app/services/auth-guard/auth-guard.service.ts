import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fornecedor } from '../../entities/Fornecedor';
import { Usuario } from '../../entities/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  authenticated = false;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  authenticate(credentials: Usuario, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.senha)
    } : {});
    this.http.get(`/api-vendas/api/v1/usuario/login/${credentials.email}`, {headers: headers}).subscribe(response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

    }

    authenticateCliente(credentials: Usuario, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.senha)
        } : {});
        this.http.get(`/api-controle/api/v1/usuario/login/${credentials.email}`, {headers: headers}).subscribe(response => {
            if (response['name']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

        }

}
