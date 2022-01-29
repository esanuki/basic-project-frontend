import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringUtils } from '../../../shared/utils/string-utils';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit, AfterViewInit {

  @ViewChild('dataNascimento') dataNascimento: ElementRef;
  spinner: SpinnerComponent;


  form: FormGroup;
  estados: string[];
  cliente: Cliente;

  MASKS = utilsBr.MASKS;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private router: Router
  ) { 
    this.cliente = this.activatedRoute.snapshot.data['cliente'].data;
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

  preencherForm() {
    console.log(this.cliente);
    this.form.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      email: this.cliente.email,
      telefone: this.cliente.telefone,
      datanNascimento: this.cliente.dataNascimento,
      endereco : {
        logradouro: this.cliente.endereco.logradouro,
        numero: this.cliente.endereco.numero,
        complemento: this.cliente.endereco.complemento,
        bairro: this.cliente.endereco.bairro,
        cep: this.cliente.endereco.cep,
        cidade: this.cliente.endereco.cidade,
        uf: this.cliente.endereco.uf
      }
    });

    this.dataNascimento.nativeElement.value = (moment(this.cliente.dataNascimento)).format('DD/MM/YYYY') ;
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

  atualizar() {
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

    this.clienteService.atualizar(cliente)
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Cliente atualizado com sucesso!', 'Sucesso', { duration: 3000 });
        this.router.navigate(['/cliente/listagem']);
      },
      erro => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro!', 'Erro', { duration: 3000});
      })
  }

}
