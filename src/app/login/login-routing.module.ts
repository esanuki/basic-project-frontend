import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
            }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}