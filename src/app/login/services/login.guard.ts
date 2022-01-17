import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HttpUtilService } from "../../shared/services/http-util.services";

@Injectable()
export class LoginGuard implements CanActivate {
    
    constructor(
        private httpUtilService: HttpUtilService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (this.httpUtilService.autenticado()) {
            this.router.navigate(['/principal']);
            return false;
        }

        return true;
    }
}