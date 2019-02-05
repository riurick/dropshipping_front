import { Tribunal } from './Tribunal';

export class OrgaoJulgador {
    id: number;
    tipo: string;
    nome: string;
    ativo: boolean;
    tribunal: Tribunal;
}
