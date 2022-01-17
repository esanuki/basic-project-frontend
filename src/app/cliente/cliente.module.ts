import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './component/novo/novo.component';
import { ListagemComponent } from './component/listagem/listagem.component';
import { AtualizacaoComponent } from './component/atualizacao/atualizacao.component';
import { DetalhesComponent } from './component/detalhes/detalhes.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteRouterComponent } from './component/cliente.router.component';



@NgModule({
  declarations: [
    ClienteRouterComponent,
    NovoComponent, 
    ListagemComponent, 
    AtualizacaoComponent, 
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    FlexLayoutModule,

    ClienteRoutingModule
  ]
})
export class ClienteModule { }
