import { Produto } from './Produto';

export class Imagem {
    id: number;
    nome: String;
    arquivo: Blob;
    produto: Produto;
}
