import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { ConfirmarDialog } from '../../../shared/dialogs/confirmar/confirmar.dialog';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../models/produto';
import { ProdutoComponent } from '../produto.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  spinner: SpinnerComponent;

  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<any>();
  colunas: string[] = ['descricao', 'valor', 'acao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {   
    this.spinner = new SpinnerComponent(this.dialog);
    this.obterTodosProdutos();
  }

  obterTodosProdutos() {
    this.spinner.open();
    this.produtoService.obterTodos()
      .subscribe(data => {
        this.spinner.close();
        const produtos = data['data'] as Produto[];
        this.dataSource = new MatTableDataSource<Produto>(produtos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      erro => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!','Erro', { duration: 3000 });
      })
  }

  removerDialog(produtoId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {
      data: {title: 'Deseja realmente remover esse produto?'}
    });
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(produtoId);
      }
    })
  }

  remover(produtoId: string) {
    this.spinner.open();
    this.produtoService.remover(Number(produtoId))
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Produto removido com sucesso', 'Erro', { duration: 3000});
        this.obterTodosProdutos();
      }, 
      err => {
        this.spinner.close();
        let msg = 'Tente novamente em instantes.';
        if (err.status === 400)
          msg = err.error.errors.join(' ');

        this.snackBar.open(msg,'Erro', { duration: 3000 });
      })
  }

}
