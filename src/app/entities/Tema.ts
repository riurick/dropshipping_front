import { SubTema } from './SubTema';

export class Tema {
    id: number;
    nome: string;
    descricao: string;
    situacao: boolean;
    subTemas: Array<SubTema>;
}
