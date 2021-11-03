import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(private userService: UserService) { }

  checkEmailTaken() {
    return (control: AbstractControl) => {
        return control
          .valueChanges
          .pipe(debounceTime(300))
          .pipe(switchMap(email => {
              return this.userService.exitsEmail(email);
          }))
          .pipe(map(isTaken => Array.isArray(isTaken) ? isTaken.length > 0 ? { emailTaken: true } : null : null))
          .pipe(first());
    }
  }
}
