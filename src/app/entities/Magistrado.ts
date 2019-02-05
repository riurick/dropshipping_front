import { Tribunal } from './Tribunal';
import { OrgaoJulgador } from './OrgaoJulgador';

export class Magistrado {
    id: number;
    nome: string;
    ativo: boolean;
    tribunal: Tribunal;
    listaOrgaoJulgador: OrgaoJulgador[];
}
