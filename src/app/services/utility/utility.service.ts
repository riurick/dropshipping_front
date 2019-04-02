import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

   public retirarFormatacao(numFormatado: String) {
        return numFormatado ? (numFormatado.replace(/\./g, '')).replace('-', '').replace('(', '')
        .replace(')', '').replace(' ', '').replace('/', '') : numFormatado;
    }

   public convertDateToString(data: Date) {
        return data ? data.toDateString() : null;
      }

    public  carregaParamsString(option: any, optionParams: any, optionName: string) {
        return option ? optionParams.set(optionName, option.toString()) : optionParams;
      }

    public carregaParamsId(option: any, optionParams: any, optionName: string) {
        return option ? optionParams.set(optionName, option.id.toString()) : optionParams;
      }

    public formataNumeracao(num: string) {
      return num ? (num.substring(0, 7) + '-' + num.substring(7, 9) + '.' + num.substring(9, 13) + '.' +
        num.substring(13, 14) + '.' + num.substring(14, 16) + '.' + num.substring(16, 20)) : '';
    }

    public inicializarUF() {
      const ufs = [
        {label: 'UF', value: null},
        {label: 'Acre', value: 'AC'},
        {label: 'Alagoas', value: 'AL'},
        {label: 'Amapá', value: 'AP'},
        {label: 'Amazonas', value: 'AM'},
        {label: 'Bahia', value: 'BA'},
        {label: 'Ceará', value: 'CE'},
        {label: 'Distrito Federal', value: 'DF'},
        {label: 'Espírito Santo', value: 'ES'},
        {label: 'Goiás', value: 'GO'},
        {label: 'Maranhão', value: 'MA'},
        {label: 'Mato Grosso', value: 'MY'},
        {label: 'Mato Grosso do SuL', value: 'MS'},
        {label: 'Minas Gerais', value: 'MG'},
        {label: 'Pará', value: 'PA'},
        {label: 'Paraíba', value: 'PB'},
        {label: 'Paraná', value: 'PR'},
        {label: 'Pernambuco', value: 'PE'},
        {label: 'Piauí', value: 'PI'},
        {label: 'Rio de Janeiro', value: 'RJ'},
        {label: 'Rio Grande do Norte', value: 'RN'},
        {label: 'Rio Grande do Sul', value: 'RS'},
        {label: 'Rondônia', value: 'RO'},
        {label: 'Roraima', value: 'RR'},
        {label: 'Santa Catarina', value: 'SC'},
        {label: 'São Paulo', value: 'SP'},
        {label: 'Sergipe', value: 'SE'},
        {label: 'Tocantins', value: 'TO'}
    ];
    return ufs;
    }
    public apiVendasUrl() {
      return 'https://dropshipping-cadastro.herokuapp.com';
    }

    public apiControleUrl() {
      return 'http://dropshipping-pedidos.herokuapp.com';
    }
}
