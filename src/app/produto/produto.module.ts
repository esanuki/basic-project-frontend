import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtualizacaoComponent } from './component/atualizacao/atualizacao.component';
import { DetalhesComponent } from './component/detalhes/detalhes.component';
import { ListagemComponent } from './component/listagem/listagem.component';
import { NovoComponent } from './component/novo/novo.component';
import { ProdutoComponent } from './component/produto.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProdutoRoutingModule } from './produto-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { ProdutoService } from './services/produto.service';
import { NgBrazil } from 'ng-brazil';
import { ProdutoResolve } from './services/produto.resolve';



@NgModule({
  declarations: [
    ProdutoComponent,
    NovoComponent,
    AtualizacaoComponent, 
    DetalhesComponent, 
    ListagemComponent, 
   
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgBrazil,
    TextMaskModule,
    NgxMaskModule.forRoot(),
    SharedModule,

    ProdutoRoutingModule
  ],
  providers: [
    ProdutoService,
    ProdutoResolve
  ]
})
export class ProdutoModule { }
