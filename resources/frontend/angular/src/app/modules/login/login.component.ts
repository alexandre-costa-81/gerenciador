import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageTimer: MatSnackBarConfig = new MatSnackBarConfig();
  loginForm: FormGroup;

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {

    this.messageTimer.duration = 5000;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService
      .authenticate(email, password)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.loginForm.reset();
          this.emailInput?.nativeElement.focus();
          this._snackBar.open('Usuário ou senha inválido.', '', this.messageTimer);
        }
      );
    // if (this.loginForm.valid) {
    //   this.submitEM.emit(this.loginForm.value);
    // }
  }

  // createUser() {
  //   this.userService.create(this.userForm.value)
  //     .subscribe(res => {
  //       this._snackBar.open('Usuário criado com sucesso.', '', this.messageTimer);
  //       this.router.navigate(['/users']);
  //     },
  //     error => {
  //       this._snackBar.open('Não foi possível criar o usuário.', '', this.messageTimer);
  //     });
  // }
}
