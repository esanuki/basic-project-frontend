import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/cliente';
import { StringUtils } from '../../../shared/utils/string-utils';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  @ViewChild('dataNascimento') dataNascimento: ElementRef;
  spinner: SpinnerComponent;


  form: FormGroup;
  estados: string[];

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.spinner = new SpinnerComponent(this.dialog);
    this.geraForm();
  }

  geraForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.maxLength(60)]],
      telefone: [''],
      dataNascimento: [''],
      endereco : this.fb.group({
        logradouro: ['', [Validators.required, Validators.maxLength(60)]],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cep: ['', [Validators.required, Validators.maxLength(10)]],
        cidade: ['', [Validators.required, Validators.maxLength(60)]],
        uf: ['', [Validators.required, Validators.maxLength(2)]]
      })
    });

    this.listarEstados();
  }

  listarEstados() {
    this.estados = Array();
    this.estados.push('AC');
    this.estados.push('AL');
    this.estados.push('AP');
    this.estados.push('AM');
    this.estados.push('BA');
    this.estados.push('CE');
    this.estados.push('DF');
    this.estados.push('ES');
    this.estados.push('GO');
    this.estados.push('MA');
    this.estados.push('MT');
    this.estados.push('MS');
    this.estados.push('MG');
    this.estados.push('PA');
    this.estados.push('PB');
    this.estados.push('PR');
    this.estados.push('PE');
    this.estados.push('PI');
    this.estados.push('RJ');
    this.estados.push('RN');
    this.estados.push('RS');
    this.estados.push('RO');
    this.estados.push('RR');
    this.estados.push('SC');
    this.estados.push('SP');
    this.estados.push('SE');
    this.estados.push('TO');
  }

  cadastrar() {
    
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido', 'Erro', { duration: 3000 });
      return;
    }

    this.spinner.open();
    
    let cliente = this.form.getRawValue() as Cliente;
    cliente.cpf = StringUtils.soNumeros(cliente.cpf);
    cliente.telefone = StringUtils.soNumeros(cliente.telefone);
    cliente.endereco.cep = StringUtils.soNumeros(cliente.endereco.cep);
    cliente.dataNascimento = new Date(this.dataNascimento.nativeElement.value);

    this.clienteService.cadastrar(cliente)
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Cliente cadastrado com sucesso!', 'Sucesso', { duration: 3000 });
        this.router.navigate(['/cliente/listagem']);
      },
      erro => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!', 'Erro', { duration: 3000});
      })
  }

}
