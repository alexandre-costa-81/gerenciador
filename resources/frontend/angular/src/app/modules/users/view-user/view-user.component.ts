import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  passwordHide = true;
  hide = true;
  userForm: FormGroup = new FormGroup({
    'name': new FormControl(''),
    'email': new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id: any) {
    this.userService.get(id)
      .toPromise()
      .then(data => {
        this.userForm = new FormGroup({
          'name': new FormControl({ value: data.name, disabled: true }),
          'email': new FormControl({ value: data.email, disabled: true })
        });
      })
      .catch(
      error => {
        console.log(error);
    });
  }
}
