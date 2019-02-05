import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Para rotas com necessidades de acessos elevados, identifica se o usuário
    // está tentando acessar uma destas rotas e se ele possui o acesso necessário
    // caso não possua o acesso, é redirecionado para a tela inicial
    const restrictedRoutesRoleMaps = [{
      routes: [
        'assunto',
        'estatisticas',
        'informativo',
        'jurisprudencias',
        'magistrados',
        'novajurisprudencia',
        'novoassunto',
        'novoinformativo',
        'novomagistrado',
        'novoorgaojulgador',
        'novosubtema',
        'novotema',
        'novotipodeprocesso',
        'novotribunal',
        'orgaosjulgadores',
        'temas',
        'tipodeprocesso',
        'tribunais',
        'subtema'
      ],
      role: 'PARAMETRIZAR_JURIS'
    }];

    restrictedRoutesRoleMaps.forEach(rr => {
      const destRestricted = rr.routes.find(rt => rt === route.routeConfig.path);
    });

    return true;
  }
}
