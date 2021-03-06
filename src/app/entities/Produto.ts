import { Categoria } from './Categoria';
import { Fornecedor } from './Fornecedor';
import { Imagem } from './Imagem';

export class Produto {
    id: Number;
    nome: String;
    descricao: String;
    marca: String;
    preco: number;
    categoria: Categoria;
    fornecedor: Fornecedor;
    imagens: Imagem[];
}
