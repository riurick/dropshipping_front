import { Endereco } from './Endereco';
import { Usuario } from './Usuario';

export class Fornecedor extends Usuario {
    id: Number;
    cnpj: String;
    razaoSocial: String;
    nomeFantasia: String;
    endereco: Endereco;
    telefone: String;
}
