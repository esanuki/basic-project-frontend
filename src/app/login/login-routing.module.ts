import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { LoginRouterOutletComponent } from "./components/login-router-outlet";
import { LoginComponent } from "./components/login/login.component";

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginRouterOutletComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}