import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth.guard";
import { PrincipalComponent } from "./component/principal/principal.component";

export const principalRoutes: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(principalRoutes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule {}