import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  login(){
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido!', 'Erro', { duration: 5000 });
      return;
    }

    let login = this.form.getRawValue() as Login;

    this.loginService.login(login)
      .subscribe(data => {
        this.snackBar.open('Sucesso ao autenticar o usuário', 'Sucesso', { duration: 5000} );
      },
      err => {
        this.snackBar.open('Ocorreu um erro ao logar no sistema', 'Erro', { duration: 5000 });
      })
  }

}
