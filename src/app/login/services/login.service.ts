import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/login";
import { environment as env } from 'src/environments/environment';

@Injectable()
export class LoginService {

    private readonly PATH: string = 'login';

    constructor(
        private http: HttpClient
    ) {}

    login(login: Login): Observable<any>{
        return this.http.post(env.baseUrl + this.PATH + '/entrar', login);
    }
}