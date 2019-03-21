import { Pedido } from './Pedido';
import { Produto } from './Produto';

export class ProdutoPedido {
    id: number;
    pedido: Pedido;
    produto: Produto;
    quantidade: number;
    valor: number;
}
