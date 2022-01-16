import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from "./component/principal/principal.component";

export const principalRoutes: Routes = [
    {
        path: '',
        component: PrincipalComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(principalRoutes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule {}