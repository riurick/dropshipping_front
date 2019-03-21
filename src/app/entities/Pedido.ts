import { Cliente } from './CLiente';
import { Vendedor } from './Vendedor';

export class Pedido {
    id: number;
    dtPedido: Date;
    cliente: Cliente;
    vendedor: Vendedor;
    pagementoEfetuado: boolean;
    avComentario: string;
    nota: number;

}
