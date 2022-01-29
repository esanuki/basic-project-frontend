import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cadastroProduto(){
    alert('Redirecionar cadastro de clientes');
  }

  movimentacaoVenda(){
    alert('Redirecionar para vendas')
  }

}
