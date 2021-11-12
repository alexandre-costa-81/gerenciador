import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  messageTimer: MatSnackBarConfig = new MatSnackBarConfig();
  passwordHide = true;
  userID: string = '';
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.messageTimer.duration = 5000;
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      is_admin: [false, [Validators.required]],
    });
    this.userForm.controls['email'].disable();
  }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id: any) {
    this.userService.get(id)
      .toPromise()
      .then(data => {
        console.log(data);
        this.userID = data.id;
        this.userForm.get('name')?.setValue(data.name);
        this.userForm.get('email')?.setValue(data.email);
        // this.userForm.get('is_admin')?.setValue(data.is_admin);
      })
      .catch(
      error => {
        console.log(error);
    });
  }

  updateUser() {
    this.userService.update(this.userID, this.userForm.value)
      .subscribe(res => {
        this._snackBar.open('Dados do usuário atualizado com sucesso.', '', this.messageTimer);
        this.router.navigate(['/users']);
      },
      error => {
        this._snackBar.open('Não foi possível atualizar os dados do usuário.', '', this.messageTimer);
      });
  }
}
