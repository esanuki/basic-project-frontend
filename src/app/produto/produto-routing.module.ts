import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtualizacaoComponent } from "./component/atualizacao/atualizacao.component";
import { DetalhesComponent } from "./component/detalhes/detalhes.component";
import { ListagemComponent } from "./component/listagem/listagem.component";
import { NovoComponent } from "./component/novo/novo.component";
import { ProdutoComponent } from "./component/produto.component";
import { ProdutoResolve } from "./services/produto.resolve";

export const produtoRoutes: Routes = [
    {
        path: '',
        component: ProdutoComponent,
        //canActivate: [AuthGuard],
        children: [
            { path: 'novo', component: NovoComponent },
            { path: 'listagem', component: ListagemComponent },
            { 
                path: 'atualizacao/:id', 
                component: AtualizacaoComponent,
                resolve: {
                    produto: ProdutoResolve
                }
            },
            { 
                path: 'detalhes/:id', 
                component: DetalhesComponent, 
                resolve: {
                    produto: ProdutoResolve
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(produtoRoutes)],
    exports: [RouterModule]
})
export class ProdutoRoutingModule {}