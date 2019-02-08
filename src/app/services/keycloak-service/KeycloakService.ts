import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var Keycloak;

@Injectable()
export class KeycloakService {

  constructor() { }

  private keycloak: any;
  private user: any;

  initialize(): Promise<any> {
    this.keycloak = Keycloak(environment.keycloakConfigFilePath);

    return new Promise((resolve, reject) => {
      this.keycloak.init({ onLoad: 'login-required' })
        .success(authenticated => {
          if (authenticated) {
            this.keycloak.loadUserProfile()
              .then(user => {
                this.user = user;
                resolve();
              });
          } else {
            reject();
          }
        }).error(err => {
          alert('Falha ao iniciar Keycloak: ' + err);
        });

      this.keycloak.onTokenExpired = () => {
        this.keycloak.updateToken()
        .success(() => {
          // Token atualizado, nada a ser feito.
        })
        .error(() => {
          alert('Erro au atualizar o token.');
        });
      };
    });
  }

  getUser() {
    return this.user;
  }

  hasRole(role) {
    return this.keycloak.hasResourceRole(role, 'juris-api');
  }

  logout() {
    this.keycloak.logout();
  }

  getToken() {
    return this.keycloak.token;
  }
}
