import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth.guard";
import { AtualizacaoComponent } from "./component/atualizacao/atualizacao.component";
import { ClienteRouterComponent } from "./component/cliente.router.component";
import { DetalhesComponent } from "./component/detalhes/detalhes.component";
import { ListagemComponent } from "./component/listagem/listagem.component";
import { NovoComponent } from "./component/novo/novo.component";

export const clienteRoutes: Routes = [
    {
        path: '',
        component: ClienteRouterComponent,
        //canActivate: [AuthGuard],
        children: [
            { path: 'novo', component: NovoComponent },
            { path: 'listagem', component: ListagemComponent },
            { path: 'atualizacao', component: AtualizacaoComponent },
            { path: 'detalhes', component: DetalhesComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(clienteRoutes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {}