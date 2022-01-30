import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpUtilService } from "../../shared/services/http-util.services";
import { environment as env } from '../../../environments/environment';
import { Produto } from "../component/models/produto";

@Injectable()
export class ProdutoService {

    private readonly PATH: string = 'produto';
    
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilService
    ) {}

    obterTodos(): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH, this.httpUtils.headers());
    }

    obterPorId(id: number): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH + '/' + id, this.httpUtils.headers());
    }

    cadastrar(produto: Produto): Observable<any> {
        return this.http.post(env.baseUrl + this.PATH, produto, this.httpUtils.headers());
    }

    atualizar(produto: Produto): Observable<any> {
        return this.http.put(env.baseUrl + this.PATH, produto, this.httpUtils.headers());
    }

    remover(id: number): Observable<any> {
        return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtils.headers());
    }
}