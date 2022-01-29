import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { utilsBr } from 'js-brasil';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  @ViewChild('dataNascimento') dataNascimento: ElementRef;

  form: FormGroup;
  estados: string[];
  cliente: Cliente;

  MASKS = utilsBr.MASKS;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,

  ) { 
    this.cliente = this.activatedRoute.snapshot.data['cliente'].data;
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
      nome: ['',],
      cpf: ['', ],
      email: ['', ],
      telefone: [''],
      dataNascimento: [''],
      endereco : this.fb.group({
        logradouro: ['', ],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cep: ['', ],
        cidade: ['', ],
        uf: ['', ]
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
}
