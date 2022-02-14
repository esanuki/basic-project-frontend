import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../cliente/models/cliente';
import { VendaService } from '../../services/venda.service';
import { Produto } from '../../../produto/component/models/produto';
import { utilsBr } from 'js-brasil';
import { MatTableDataSource } from '@angular/material/table';
import { VendaItem, VendaItemLista } from '../../models/venda-item';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import { MatSelect } from '@angular/material/select';
import { Venda } from '../../models/venda';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  form: FormGroup;
  formProdutos: FormGroup;

  @ViewChild('matSelectProduto') matSelect: MatSelect;
  @ViewChild('matSelectCliente') matSelectCliente: MatSelect;

  colunas: string[] = ['descricao', 'qtd', 'valorunitario', 'valortotal', 'acao'];
  dataSource: MatTableDataSource<VendaItem>;

  clienteId: string;
  clientesArray: Cliente[] = [];
  produtosArray: Produto[] = [];

  vendaItemListaArray: VendaItem[] = [];

  MASKS = utilsBr.MASKS;

  spinner: SpinnerComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private vendaService: VendaService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.geraForm();
    this.obterClientes();
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);
    this.obterProdutos();
  }

  geraForm(){
    this.form = this.fb.group({
      cliente: ['', [Validators.required]],
      data: [new Date(), [Validators.required]]
    });

    this.formProdutos = this.fb.group({
      produto: ['', []],
      qtde: ['',[]],
      valorUnitario: ['',[]]
    })
  }

  obterClientes() {
    this.vendaService.obterClientes()
      .subscribe(data => {
        this.clientesArray = data['data'] as Cliente[];
      },
      err => {
        this.snackBar.open('Ocorreu um erro ao obter os clientes!', 'Erro', { duration: 3000 });
      })
  }

  obterProdutos() {
    this.vendaService.obterProdutos()
      .subscribe(data => {
        this.produtosArray = data['data'] as Produto[];
      },
      err => {
        this.snackBar.open('Ocorreu um erro ao obter os produtos!', 'Erro', { duration: 3000 });
      })
  }

  salvar() {
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido', 'Erro', { duration: 3000 });
      return;
    }

    if (this.vendaItemListaArray.length === 0) {
      this.snackBar.open('Nenhum produto informado!', 'Erro', { duration: 3000 });
      return
    }

    var venda = this.obterVendaParaSalvar();

    console.log(JSON.stringify(venda));

    this.spinner.open();

    this.vendaService.cadastrar(venda) 
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Venda cadastrada com sucesso!', 'Sucesso', { duration: 3000 });
        this.router.navigate(['/venda/listagem']);       
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!', 'Erro', { duration: 3000 });
      });
  }

  obterVendaParaSalvar() {
    
    var vendaItem: VendaItem[] = [];
    this.vendaItemListaArray.forEach(vi => vendaItem.push({
      id: 0,
      descricao: vi.produto.descricao,
      valorUnitario: CurrencyUtils.StringParaDecimal(vi.valorUnitario),
      qtde: vi.qtde,
      produtoId: vi.produto.id
    } as VendaItem));

    var venda : Venda = {
      id: 0,
      clienteId: Number(this.clienteId),
      dataVenda: this.form.get('data').value,
      vendaItens: vendaItem,
      cliente: null
    }

    return venda;
  }

  adicionarProduto() {
    let vendaItemLista = this.formProdutos.getRawValue() as VendaItem;

    if (!this.validacaoAdicionarProduto(vendaItemLista)) return;

    let valorTotal = (vendaItemLista.qtde * CurrencyUtils.StringParaDecimal(vendaItemLista.valorUnitario));
    vendaItemLista.valorTotal = CurrencyUtils.DecimalParaString(valorTotal);

    this.vendaItemListaArray.push(vendaItemLista);
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);

    this.formProdutos.reset();
    
  }

  alterarProduto(vendaItem: VendaItemLista) {
    this.formProdutos.get('produto').setValue(vendaItem.produto);
    this.formProdutos.get('qtde').setValue(vendaItem.qtde);
    this.formProdutos.get('valorUnitario').setValue(vendaItem.valorUnitario);

    this.vendaItemListaArray = this.vendaItemListaArray.filter(x => x.produto.id !== vendaItem.produto.id);
    
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);  
  }

  excluirProduto(vendaItem: VendaItemLista) {
    this.vendaItemListaArray = this.vendaItemListaArray.filter(x => x.produto.id !== vendaItem.produto.id);
    
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray); 
  }


  validacaoAdicionarProduto(vendaItem: VendaItem) : boolean {
    if (!this.matSelect.selected) {
      this.snackBar.open('Produto deve ser informado', 'Erro', { duration: 3000 });
      return false;
    }

    let produto = this.matSelect['value'] as Produto;
    let item = this.vendaItemListaArray.find(x => x.produto.id === produto.id)

    if (item) {
      this.snackBar.open('Produto já existente', 'Erro', { duration: 3000 });
      return false;
    }

    if (vendaItem.qtde <= 0) {
      this.snackBar.open('Quantidade não pode ser menor ou igual a zero', 'Erro', { duration: 3000 });
      return false;
    }

    if (vendaItem.valorUnitario <= 0) {
      this.snackBar.open('Valor unitário não pode ser igual ou menor que zero', 'Erro', { duration: 3000 });
      return false;
    }

    

    return true;
  }

}
