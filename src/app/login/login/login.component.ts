import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../entities/Fornecedor';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { ApiFornecedorService } from '../../fornecedor/api-fornecedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fornecedor: Fornecedor;
  credentials = {email: '', senha: ''};
  constructor(
    private authService: AuthGuardService,
    private http: HttpClient,
    private router: Router,
    private apiFornecedor: ApiFornecedorService,
  ) { }

  login() {
    this.credentials.email = this.fornecedor.email.toString();
    this.credentials.senha = this.fornecedor.senha.toString();
    this.authService.authenticate(this.fornecedor, () => {
        this.apiFornecedor.getByEmail(this.fornecedor.email).then(response => {
          this.fornecedor = response.data;
          this.router.navigateByUrl('/lista-produto/' + this.fornecedor.id);
        });

    });
    return false;
  }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
  }

}
