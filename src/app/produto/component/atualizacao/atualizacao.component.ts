import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { Produto } from '../models/produto';
import { utilsBr } from 'js-brasil';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  spinner: SpinnerComponent;
  produto: Produto;

  MASKS = utilsBr.MASKS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private produtoService: ProdutoService,
    private router: Router
  ) { 
    this.produto = this.activatedRoute.snapshot.data['produto'].data;
  }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.geraForm();
  }

  ngAfterViewInit(): void {
    this.preencherForm();
  }

  geraForm() {
    this.form = this.fb.group({
      id: '',
      descricao: ['', [Validators.required, Validators.maxLength(60)]],
      valorUnitario: ['', [Validators.required]]
    })
  }

  preencherForm() {
    this.form.patchValue({
      id: this.produto.id,
      descricao: this.produto.descricao,
      valorUnitario: CurrencyUtils.DecimalParaString(this.produto.valorUnitario)
    });

  }

  atualizar() {
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido!');
      return;
    }
    
    this.spinner.open();

    let produto = this.form.getRawValue() as Produto;
    produto.valorUnitario = CurrencyUtils.StringParaDecimal(produto.valorUnitario);

    this.produtoService.atualizar(produto) 
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Produto atualizado com sucesso!', 'Sucesso', { duration: 3000 });
        this.router.navigate(['/produto/listagem']);       
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!', 'Erro', { duration: 3000 });
      });
  }

}
