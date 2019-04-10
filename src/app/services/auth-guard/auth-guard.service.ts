import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fornecedor } from '../../entities/Fornecedor';
import { Usuario } from '../../entities/Usuario';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  authenticated = false;
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  authenticate(credentials: Usuario, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.senha)
    } : {});
    this.http.get(this.utility.apiControleUrl() + `/api-controle/api/v1/usuario/login/${credentials.email}`,
     {headers: headers}).subscribe(response => {
        if (response['data']) {
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
        this.http.get(this.utility.apiVendasUrl() +
            `/api-vendas/api/v1/usuario/login/${credentials.email}`,
            {headers: headers}
        ).subscribe(response => {
            if (response['email']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

        }

}
