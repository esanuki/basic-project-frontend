import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Cliente } from "../models/cliente";
import { ClienteService } from "./cliente.service";

@Injectable()
export class ClienteResolve implements Resolve<Cliente> {
    
    constructor(
        private clienteService: ClienteService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.clienteService.obterPorId(route.params['id']);
    }
    
}