import { Produto } from "../../produto/component/models/produto";

export interface VendaItem {
    id: number;
    descricao: string;
    produtoId: number;
    valorUnitario: number;
    qtde: number;
    valorTotal: number;
    produto: Produto;
}

export interface VendaItemLista {
    id: number;
    qtde: number;    
    valorUnitario: number;
    valorTotal: number;
    produto: Produto;
}