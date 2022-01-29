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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteRouterComponent } from './component/cliente.router.component';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ClienteService } from './services/cliente.service';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClienteResolve } from './services/cliente.resolve';


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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgBrazil,
    TextMaskModule,
    NgxMaskModule.forRoot(),
    SharedModule,

    ClienteRoutingModule
  ],
  providers: [
    ClienteService,
    ClienteResolve,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ]
})
export class ClienteModule { }
