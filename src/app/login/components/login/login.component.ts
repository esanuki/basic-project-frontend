import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/component/spinner/spinner.component';
import { HttpUtilService } from '../../../shared/services/http-util.services';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @ViewChild(SpinnerComponent) spinner: SpinnerComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private httpUtil: HttpUtilService,
    private route: Router
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

    this.spinner.open();

    let login = this.form.getRawValue() as Login;

    this.loginService.login(login)
      .subscribe(data => {
        this.spinner.close();
        this.httpUtil.setToken(data);
        this.route.navigate(['/principal']);
      },
      err => {
        this.spinner.close();
        this.snackBar.open('Ocorreu um erro ao logar no sistema', 'Erro', { duration: 5000 });
      })
  }
}
