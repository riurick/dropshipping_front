import { Endereco } from './Endereco';
import { Usuario } from './Usuario';

export class Cliente extends Usuario {
    id: Number;
    nome: String;
    telefone: String;
    cpf: String;
    endereco: Endereco;

}
