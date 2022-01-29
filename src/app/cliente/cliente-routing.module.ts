import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtualizacaoComponent } from "./component/atualizacao/atualizacao.component";
import { ClienteRouterComponent } from "./component/cliente.router.component";
import { DetalhesComponent } from "./component/detalhes/detalhes.component";
import { ListagemComponent } from "./component/listagem/listagem.component";
import { NovoComponent } from "./component/novo/novo.component";
import { ClienteResolve } from "./services/cliente.resolve";

export const clienteRoutes: Routes = [
    {
        path: '',
        component: ClienteRouterComponent,
        //canActivate: [AuthGuard],
        children: [
            { path: 'novo', component: NovoComponent },
            { path: 'listagem', component: ListagemComponent },
            { 
                path: 'atualizacao/:id', 
                component: AtualizacaoComponent,
                resolve: {
                    cliente: ClienteResolve
                }
            },
            { 
                path: 'detalhes/:id', 
                component: DetalhesComponent, 
                resolve: {
                    cliente: ClienteResolve
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(clienteRoutes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {}