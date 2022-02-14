import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Venda } from "../models/venda";
import { VendaService } from "./venda.service";

@Injectable()
export class VendaResolve implements Resolve<Venda> {
    
    constructor(
        private vendaService: VendaService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.vendaService.obterPorId(route.params['id']);
    }
}