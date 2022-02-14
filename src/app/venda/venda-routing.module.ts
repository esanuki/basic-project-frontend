import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth.guard";
import { AtualizacaoComponent } from "./component/atualizacao/atualizacao.component";
import { DetalhesComponent } from "./component/detalhes/detalhes.component";
import { ListagemComponent } from "./component/listagem/listagem.component";
import { NovoComponent } from "./component/novo/novo.component";
import { VendaComponent } from "./component/venda.component";
import { VendaResolve } from "./services/venda.resolve";

export const vendaRoutes: Routes = [
    {
        path: '',
        component: VendaComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'novo', component: NovoComponent },
            { path: 'listagem', component: ListagemComponent },
            { 
                path: 'atualizacao/:id', 
                component: AtualizacaoComponent,
                resolve: {
                    venda: VendaResolve
                }
            },
            { 
                path: 'detalhes/:id', 
                component: DetalhesComponent, 
                resolve: {
                    venda: VendaResolve
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(vendaRoutes)],
    exports: [RouterModule]
})
export class VendaRoutingModule {}