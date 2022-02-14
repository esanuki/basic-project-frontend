import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { ConfirmarDialog } from '../../../shared/dialogs/confirmar/confirmar.dialog';
import { VendaList } from '../../models/venda';
import { VendaService } from '../../services/venda.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  spinner: SpinnerComponent;

  dataSource: MatTableDataSource<VendaList> = new MatTableDataSource<any>();
  colunas: string[] = ['cliente', 'datavenda', 'totalvenda', 'acao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private vendaService: VendaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.obterVendas();
  }

  obterVendas() {
    this.spinner.open();

    this.vendaService.obterVendas()
      .subscribe(data => {
        this.spinner.close();
        const vendas = data['data'] as VendaList[];
        this.dataSource = new MatTableDataSource(vendas);
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro ao obter as vendas', 'Erro', { duration: 3000 });
      })
  }

  removerDialog(produtoId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {
      data: {title: 'Deseja realmente remover essa venda?'}
    });
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(produtoId);
      }
    })
  }

  remover(vendaId: string) {
    this.spinner.open();
    this.vendaService.remover(Number(vendaId))
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Venda removido com sucesso', 'Erro', { duration: 3000});
        this.obterVendas();
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
