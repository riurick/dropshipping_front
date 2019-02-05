import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IServiceResponse } from '../entities/IResponse';
import { Repositorio } from '../entities/Repositorio';
import { Arquivo } from '../entities/Arquivo';
import { Modulo } from '../entities/Modulo';
import { ApiFileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient, private fileUploadService: ApiFileUploadService) { }

  @Input() chaveModulo: string;
  @Input() chaveRepositorio: string;

  // tslint:disable-next-line
  @Output() onConcluirUpload = new EventEmitter<string>();

  urlUpload = '/upload/api/v1/arquivos/'; // URL de UPLOAD - utilizado no arquivo .html
  tamanhoMaximoEmMb: string;
  extensoesValidas: string;
  repositorio: Repositorio;
  moduloValidado = false;
  componenteCarregado = false;
  promiseModuloCarregado = null;
  disabilita = false;

  setDesabilita() {
    this.disabilita = true;
  }
  ngOnInit() {
    if (this.chaveModulo) {
      this.carregarModulo();
    } else {
      this.componenteCarregado = true;
    }

  }

  ngOnChanges() {
    // tslint:disable-next-line
    this.promiseModuloCarregado && this.promiseModuloCarregado.then(() => this.carregarArquivos());
  }

  abrirUrlDownload(file: Arquivo) {
    this.fileUploadService.abrirUrlDownload(file);
  }

  reset() {
    this.validarRepositorio(this.chaveRepositorio);
    this.repositorio = null;
    this.chaveRepositorio = null;
  }

  validar() {
    this.validarRepositorio(this.chaveRepositorio);
  }

  remover() {
    this.removerRepositorio(this.chaveRepositorio);
  }

  download(file: Arquivo) {
    this.fileUploadService.getArquivoDownload(file.chaveArquivo).then(data => {

      const thefile = new Blob([data], { type: file.mimeType });

      const url = window.URL.createObjectURL(thefile);

      const link = document.createElement('a');
      link.href = url;
      link.download = file.nome;
      link.dispatchEvent(new MouseEvent('click'));
    });

  }

  validarRepositorio(repositorioValidar: string) {
    this.fileUploadService.getValidacaoRepositorio(repositorioValidar).then(data => {
      this.carregarArquivos();
    });
  }

  carregarModulo() {
      this.promiseModuloCarregado = new Promise((resolve) => {
        this.fileUploadService.getModulo(this.chaveModulo).then(response => {
          const modulo = response.data;

          if (modulo) {
            this.tamanhoMaximoEmMb = (modulo.tamanhoLimiteArquivo * 1000000).toString();

            const extensoesModulo = modulo.extensoesPermitidas;
            this.carregaExtensoesValidas(extensoesModulo);

            resolve();
            this.moduloValidado = true;
            this.carregarArquivos();
          } else {
            alert('Módulo Inválido');
          }

          this.componenteCarregado = true;
        }).catch(e => {
          console.log(e);
          this.componenteCarregado = true;
        });
      });
  }

  carregaExtensoesValidas(extensoesModulo: string) {
    if (extensoesModulo) {
      const extensoes = extensoesModulo.replace(' ', '').split(',');
      let saidaExtensoes = '';
      extensoes.forEach(ext => {
        saidaExtensoes += (saidaExtensoes !== '' ? ',' : '') + '.' + ext;
      });

      this.extensoesValidas = saidaExtensoes;
    }
  }

  carregarArquivos() {
    if (this.chaveRepositorio) {
      this.onConcluirUpload.emit(this.chaveRepositorio);
      if (this.moduloValidado) {
        this.fileUploadService.getArquivos(this.chaveRepositorio).then(response => {
          this.repositorio = response.data;
          if (response.data) {
            this.chaveRepositorio = response.data.chaveRepositorio;
          }
          this.tratarMensagens(response);
        });
      }
    }
  }

  // Antes de enviar a requisição
  onBeforeSend(event) {
    event.formData.append('modulo', this.chaveModulo);
    if (this.chaveRepositorio != null) {
      event.formData.append('repositorio', this.chaveRepositorio);
    }
  }

  // Após fazer o POST do UPLOAD
  onUpload(event) {
    const retorno = event.xhr as XMLHttpRequest;
    const repositorio = Object.assign(JSON.parse(retorno.responseText)) as IServiceResponse<Repositorio>;

    if (repositorio != null && repositorio.data != null && repositorio.data.chaveRepositorio != null) {
      this.chaveRepositorio = repositorio.data.chaveRepositorio;
    }

    this.tratarMensagens(repositorio);
  }

  // Dispara quando vai limpar a listagem
  onClear(event) {
    this.carregarArquivos();
  }

  // Quando retorna algum erro
  onError(event) {
    this.carregarArquivos();
  }

  onRemove(file: Arquivo) {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      if (file != null && this.moduloValidado) {
        this.fileUploadService.removerArquivo(file).then(response => {
          this.tratarMensagens(response);
          this.carregarArquivos();
        }).catch(e => {
          this.carregarArquivos();
        });
      }
    }
  }

  removerRepositorio(repositorio: string) {
    this.fileUploadService.deleteRepositorio(repositorio).then(response => {
      this.repositorio = response.data;
      this.tratarMensagens(response);
      this.carregarArquivos();
    }).catch(e => {
      this.carregarArquivos();
    });
  }



  tratarMensagens(resp: IServiceResponse<Repositorio>) {
    if (resp != null && resp.messages != null && resp.messages.length > 0) {
      resp.messages.forEach(mens => {
        if (mens.type !== 'SUCCESS') {
          alert(mens.type + ' => ' + mens.message);
        }
      });
    }
  }


}
