import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpUtilService {

    constructor() {}

    headers() {
        let httpHeaders: HttpHeaders = new HttpHeaders();

        if (localStorage['token']) {
            httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + localStorage['token']);
            httpHeaders = httpHeaders.set('Content-Type', 'application/json');
        }

        return { headers: httpHeaders };
    }

    autenticado() {
        return localStorage['token'] ?? false;
    }

    setToken(data: any) {
        localStorage.setItem('token', data.data.accessToken);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

}