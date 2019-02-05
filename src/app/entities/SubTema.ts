import { Tema } from './Tema';

export class SubTema {
    id: number;
    nome: string;
    descricao: string;
    situacao: boolean;
    tema: Tema;
    temaPai: Tema;
}
