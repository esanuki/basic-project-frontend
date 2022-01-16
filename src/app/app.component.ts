import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './shared/services/http-util.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base-project';

  constructor(
    private httpUtilService: HttpUtilService,
    private route: Router
  ) {}
  
  autenticado() {
    return this.httpUtilService.autenticado();
  }

  sair() {
    this.httpUtilService.removeToken();
    this.route.navigate(['/login']); 
  }
}
