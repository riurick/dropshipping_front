import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Imagem } from '../entities/Imagem';
import { UtilityService } from '../services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ApiImagemService {
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }
  buscaImagemId(id: Number) {
    return this.http.get(this.utility.apiVendasUrl() + `api/v1/imagem/arquivo/` + id, { responseType: 'blob' }).toPromise();
  }


  get(id: Number) {
    return this.http.get<IServiceResponse<Imagem>>(this.utility.apiVendasUrl() + `api/v1/imagem/${id}`)
      .toPromise();
  }
  lista() {
    return this.http.get<IServiceResponse<Imagem[]>>(this.utility.apiVendasUrl() + `api/v1/imagem`)
      .toPromise();
  }
  alterar(imagem: Imagem) {
    return this.http.put<IServiceResponse<Imagem>>(this.utility.apiVendasUrl() + `api/v1/imagem/${imagem.id}`, imagem)
      .toPromise();
  }
  excluir(id) {
    return this.http.delete<IServiceResponse<any>>(this.utility.apiVendasUrl() + `api/v1/imagem/${id}`)
      .toPromise();
  }
  buscaPorProduto(id: Number) {
    return this.http.get<IServiceResponse<Imagem[]>>(this.utility.apiVendasUrl() + `api/v1/imagem/buscarPorProduto/${id}`)
    .toPromise();
  }
}
