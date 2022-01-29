import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { ConfirmarDialog } from '../../../shared/dialogs/confirmar/confirmar.dialog';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  colunas: string[] = ['nome', 'cpf', 'email', 'acao'];
  spinner: SpinnerComponent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialogRemove: MatDialog;
  
  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 

  }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.obterTodosClientes();
    
  }

  obterTodosClientes() {
    this.spinner.open();
    this.clienteService.obterTodos()
      .subscribe(data => {
        this.spinner.close();
        const clientes = data['data'] as Cliente[];
        this.dataSource = new MatTableDataSource<Cliente>(clientes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro ao obter os clientes!', 'Erro', { duration: 3000 });
      })
  }

  removerDialog(clienteId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {
      data: {title: 'Deseja realmente remover esse cliente?'}
    });
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(clienteId);
      }
    })
  }

  remover(clienteId: string) {
    this.spinner.open();
    this.clienteService.remover(Number(clienteId))
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Cliente removido com sucesso', 'Erro', { duration: 3000});
        this.obterTodosClientes();
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
