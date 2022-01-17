import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import { LoginValidators } from '../../utils/login.validators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild(SpinnerComponent) spinner: SpinnerComponent;
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(3)]]
    },
    {
      validators: [LoginValidators.ConfirmarSenha]
    })
  }

  salvar(){
    if (!this.cadastroForm.valid) {
      this.snackBar.open('Formulário inválido', 'Erro', { duration: 5000 });
      return;
    }

    this.spinner.open();

    let login: Login = this.cadastroForm.getRawValue();

    this.loginService.registrar(login)
      .subscribe(data => {
        this.spinner.close();
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Sucesso', { duration: 3000});
        this.router.navigate(['/login']);
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro ao cadastrar o usuário', 'Erro', { duration: 3000 });
      })
  }

}
