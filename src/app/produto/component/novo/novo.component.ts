import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  spinner: SpinnerComponent;
  form: FormGroup;
  

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.geraForm();
  }

  geraForm() {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(60)]],
      valorUnitario: ['', [Validators.required]]
    });
  }

  cadastrar(){
    
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido!');
      return;
    }
    
    this.spinner.open();

    let produto = this.form.getRawValue() as Produto;
    produto.valorUnitario = CurrencyUtils.StringParaDecimal(produto.valorUnitario);

    this.produtoService.cadastrar(produto) 
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Produto cadastrado com sucesso!', 'Sucesso', { duration: 3000 });
        this.router.navigate(['/produto/listagem']);       
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!', 'Erro', { duration: 3000 });
      });

  }

}
