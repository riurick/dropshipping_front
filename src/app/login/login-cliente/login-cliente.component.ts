import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../entities/CLiente';
import { ApiClienteService } from '../../clientes/api-cliente.service';
import { Router } from '../../../../node_modules/@angular/router';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {
  cliente: Cliente;
  credentials = {email: '', senha: ''};
  constructor(
    private authService: AuthGuardService,
    private http: HttpClient,
    private router: Router,
    private apiCliente: ApiClienteService,
  ) { }

  ngOnInit() {
    this.cliente = new Cliente();
  }

  login() {
    this.credentials.email = this.cliente.email.toString();
    this.credentials.senha = this.cliente.senha.toString();
    this.authService.authenticateCliente(this.cliente, () => {
      this.authService.authenticate(this.cliente, () => {
      this.apiCliente.getByEmail(this.cliente.email).then(response => {
        this.cliente = response.data;
          this.router.navigateByUrl('/vendas/' + this.cliente.id);
      });
    });

  });
  return false;
  }

}
