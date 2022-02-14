import { Cliente } from "../../cliente/models/cliente";
import { VendaItem, VendaItemLista } from "./venda-item";

export interface Venda {
    id: number;
    cliente: Cliente,
    clienteId: number;
    dataVenda: Date;
    vendaItens: VendaItem[]
}

export interface VendaList {
    id: number;
    cliente: string;
    dataVenda: Date;
    totalVenda: number
}