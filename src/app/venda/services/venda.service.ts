import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpUtilService } from "../../shared/services/http-util.services";
import { environment as env } from '../../../environments/environment';
import { Observable } from "rxjs";
import { Venda } from "../models/venda";

@Injectable()
export class VendaService {
    
    private readonly PATH = 'venda';
    private readonly PATH_CLIENTE: string = 'cliente';
    private readonly PATH_PRODUTO: string = 'produto';

    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilService
    ) {}

    obterClientes(): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH_CLIENTE, this.httpUtils.headers());
    }    

    obterProdutos(): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH_PRODUTO, this.httpUtils.headers());
    }

    obterVendas(): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH, this.httpUtils.headers());
    }

    obterPorId(id: number): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH + '/'+ id, this.httpUtils.headers());
    }

    cadastrar(venda: Venda): Observable<any> {
        return this.http.post(env.baseUrl + this.PATH, venda, this.httpUtils.headers());
    }

    atualizar(venda: Venda): Observable<any> {
        return this.http.put(env.baseUrl + this.PATH, venda, this.httpUtils.headers());
    }

    remover(id: number): Observable<any> {
        return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtils.headers());
    }
}