import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/User.model';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost/api/v1'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService) { }

  authenticate(email: string, password: string) {
    return this.httpClient
      .post(API_URL + '/login', {email, password}, { observe: 'body' })
      .pipe(tap((res: any) => {
        const token = res?.token.split('|')[1];
        this.userService.login(token);
      }));
  }
}
