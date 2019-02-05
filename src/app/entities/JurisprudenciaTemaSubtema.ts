import { Jurisprudencia } from './Jurisprudencia';
import { Tema } from './Tema';
import { SubTema } from './SubTema';

export class JurisprudenciaTemaSubtema {
    id: number;
    jurisprudencia: Jurisprudencia;
    tema: Tema;
    subTema: SubTema;
}
