import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente";
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from "../../shared/services/http-util.services";
import { Observable } from "rxjs";

@Injectable()
export class ClienteService {

    private readonly PATH: string = 'cliente'

    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilService) {}

    obterTodos(): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH, this.httpUtils.headers());
    }

    obterPorId(id: number): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH + '/' + id, this.httpUtils.headers());
    }

    cadastrar(cliente: Cliente): Observable<any> {
        return this.http.post(env.baseUrl + this.PATH, cliente, this.httpUtils.headers());
    }

    atualizar(cliente: Cliente): Observable<any> {
        return this.http.put(env.baseUrl + this.PATH, cliente, this.httpUtils.headers());
    }

    remover(id: number): Observable<any> {
        return this.http.delete(env.baseUrl + this.PATH + '?id=' + id, this.httpUtils.headers());
    }
}