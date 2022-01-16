import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './component/principal/principal.component';
import { RouterModule } from '@angular/router';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
