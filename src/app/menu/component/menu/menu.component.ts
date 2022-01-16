import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cadastroCliente(){
    alert('Redirecionar cadastro de clientes');
  }

  cadastroProduto(){
    alert('Redirecionar cadastro de clientes');
  }

  movimentacaoVenda(){
    alert('Redirecionar para vendas')
  }

}
