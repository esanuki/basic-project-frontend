import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrencyUtils } from '../../../shared/utils/currency-utils';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  produto: Produto;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.produto = this.activatedRoute.snapshot.data['produto'].data;
  }
  
  ngOnInit(): void {
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
    });
  }

  preencherForm() {
    this.form.patchValue({
      id: this.produto.id,
      descricao: this.produto.descricao,
      valorUnitario: CurrencyUtils.DecimalParaString(this.produto.valorUnitario)
    });

  }

}
