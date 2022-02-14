import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Venda } from '../../models/venda';
import { VendaItem, VendaItemLista } from '../../models/venda-item';
import { utilsBr } from 'js-brasil';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendaService } from '../../services/venda.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import * as moment from 'moment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  form: FormGroup;

  @ViewChild('dataVenda') dataVenda: ElementRef;

  colunas: string[] = ['descricao', 'qtd', 'valorunitario', 'valortotal'];
  dataSource: MatTableDataSource<VendaItem>;

  clientesArray: string[] = [];

  vendaItemListaArray: VendaItem[] = [];
  venda: Venda;

  MASKS = utilsBr.MASKS;

  spinner: SpinnerComponent;
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private vendaService: VendaService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.geraForm();

    this.venda = this.activatedRoute.snapshot.data['venda'].data;
  }

  ngAfterViewInit(): void {
    this.preencherDados();
  }

  geraForm(){
    this.form = this.fb.group({
      cliente: ['', [Validators.required]],
      data: [new Date(), [Validators.required]]
    });
  }

  preencherDados() {
    this.form.patchValue({
      data: this.venda.dataVenda,
      cliente: this.venda.cliente.nome
    });
    this.obterVendaItens(this.venda.vendaItens);

    this.dataVenda.nativeElement.value = (moment(this.venda.dataVenda)).format('DD/MM/YYYY') ;

  }

  obterVendaItens(vendaItens: VendaItem[]){    
    this.vendaItemListaArray = vendaItens;
    this.vendaItemListaArray.forEach(vi => {
      vi.valorUnitario = CurrencyUtils.DecimalParaString(vi.valorUnitario);
      vi.valorTotal = CurrencyUtils.DecimalParaString(vi.valorTotal)
    })
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);
  }

}
