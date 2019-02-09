import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPage } from '../entities/IPage';
import { IServiceResponse } from '../entities/IResponse';
import { Modulo } from '../entities/Modulo';
import { Repositorio } from '../entities/Repositorio';
import { Arquivo } from '../entities/Arquivo';

@Injectable({
  providedIn: 'root'
})
export class ApiFileUploadService {

  constructor(private http: HttpClient) { }

  getValidacaoRepositorio(repositorioValidar: string) {
    return this.http.put<IServiceResponse<Repositorio>>('/upload/api/v1/arquivos/' + repositorioValidar, {}).toPromise();
  }

  getArquivoDownload(chaveArquivo: string) {
    return this.http.get('/upload/api/v1/arquivos/' + chaveArquivo, { responseType: 'blob' }).toPromise();
  }

  getModulo(chaveModulo: string): Promise<IServiceResponse<Modulo>> {
    return this.http.get<any>('/upload/api/v1/modulos/' + chaveModulo).toPromise();
  }

  deleteRepositorio(repositorio: string): Promise<IServiceResponse<Repositorio>> {
    if (repositorio !== null && repositorio !== '') {
      return this.http.delete<any>('/api/v1/repositorios/' + repositorio).toPromise();
    }
  }

  removerArquivo(file: Arquivo): Promise<IServiceResponse<Repositorio>> {
    return this.http.delete<any>('/upload/api/v1/arquivos/' + file.chaveArquivo).toPromise();
  }

  getArquivos(chaveRepositorio: string): Promise<IServiceResponse<Repositorio>> {
    return this.http.get<any>('/upload/api/v1/repositorios/' + chaveRepositorio).toPromise();
  }

  abrirUrlDownload(file: Arquivo) {
    window.open('/upload/api/v1/arquivos/' + file.chaveArquivo, '_blank');
  }
}
