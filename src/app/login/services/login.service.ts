import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Login } from "../models/login";
import { environment as env } from '../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {

    private readonly PATH: string = 'login';
    private readonly PATH_USUARIO: string = 'usuario';

    constructor(
        private http: HttpClient
    ) {}

    login(login: Login): Observable<any>{
        return this.http.post(env.baseUrl + this.PATH + '/entrar', login);
    }

    registrar(login: Login): Observable<any> {
        return this.http.post(env.baseUrl + this.PATH_USUARIO, login);
    }
}