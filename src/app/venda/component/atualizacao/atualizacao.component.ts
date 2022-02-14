import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../cliente/models/cliente';
import { Produto } from '../../../produto/component/models/produto';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { VendaItem, VendaItemLista } from '../../models/venda-item';
import { VendaService } from '../../services/venda.service';
import { utilsBr } from 'js-brasil';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import { Venda } from '../../models/venda';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  formProdutos: FormGroup;

  @ViewChild('matSelectProduto') matSelect: MatSelect;
  @ViewChild('matSelectCliente') matSelectCliente: MatSelect;

  colunas: string[] = ['descricao', 'qtd', 'valorunitario', 'valortotal', 'acao'];
  dataSource: MatTableDataSource<VendaItem>;

  clienteId: number;
  clienteSelect: Cliente;
  clientesArray: Cliente[] = [];
  produtosArray: Produto[] = [];

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
    this.clienteId = this.venda.cliente.id;

    this.obterClientes();
    this.obterProdutos();
  }

  ngAfterViewInit(): void {
    this.preencherDados();
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

  preencherDados() {
    this.form.patchValue({
      data: this.venda.dataVenda,
      cliente: this.clienteId
    });
    this.obterVendaItens(this.venda.vendaItens);

  }

  atualizar(){
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

    this.vendaService.atualizar(venda) 
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
      id: this.venda.id,
      clienteId: Number(this.clienteId),
      dataVenda: this.form.get('data').value,
      vendaItens: vendaItem,
      cliente: null
    }

    return venda;
  }

  obterVendaItens(vendaItens: VendaItem[]){    
    this.vendaItemListaArray = vendaItens;
    this.vendaItemListaArray.forEach(vi => {
      vi.valorUnitario = CurrencyUtils.DecimalParaString(vi.valorUnitario);
      vi.valorTotal = CurrencyUtils.DecimalParaString(vi.valorTotal)
    })
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);
  }

  adicionarProduto() {
    let vendaItemLista = this.formProdutos.getRawValue() as VendaItem;

    if (!this.validacaoAdicionarProduto(vendaItemLista)) return;

    let valorTotal = vendaItemLista.qtde *  CurrencyUtils.StringParaDecimal(vendaItemLista.valorUnitario);
    vendaItemLista.valorTotal = CurrencyUtils.DecimalParaString(valorTotal);

    this.vendaItemListaArray.push(vendaItemLista);
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);

    this.formProdutos.reset();
    
  }

  alterarProduto(vendaItem: VendaItemLista) {
    this.formProdutos.get('produto').setValue(this.produtosArray.find(p => p.id === vendaItem.produto.id));
    this.formProdutos.get('qtde').setValue(vendaItem.qtde);
    this.formProdutos.get('valorUnitario').setValue(CurrencyUtils.DecimalParaString(vendaItem.valorUnitario));

    this.vendaItemListaArray = this.vendaItemListaArray.filter(x => x.produto.id !== vendaItem.produto.id);
    
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray);  
  }

  excluirProduto(vendaItem: VendaItemLista) {
    this.vendaItemListaArray = this.vendaItemListaArray.filter(x => x.produto.id !== vendaItem.produto.id);
    
    this.dataSource = new MatTableDataSource<VendaItem>(this.vendaItemListaArray); 
  }

  validacaoAdicionarProduto(vendaItem: VendaItemLista) : boolean {
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
