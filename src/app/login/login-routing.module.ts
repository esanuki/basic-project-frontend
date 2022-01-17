import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth.guard";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { LoginRouterComponent } from "./components/login-router.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginGuard } from "./services/login.guard";

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginRouterComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'cadastro',
                component: CadastroComponent,
                canActivate: [LoginGuard]
            }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}