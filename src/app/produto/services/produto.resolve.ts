import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Produto } from "../component/models/produto";
import { ProdutoService } from "./produto.service";

@Injectable()
export class ProdutoResolve implements Resolve<Produto> {
    
    constructor(private produtoService: ProdutoService) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.produtoService.obterPorId(route.params['id']);
    }
}