import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/User.model';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

const API = 'http://localhost/api/v1/users';

const removeEmptyStringsFrom = (obj) => Object
.entries({ ...obj })
.filter(([key, val]) => val !== '')
.reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1] }), {});


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService) {

    this.tokenService.hasToken() &&
      this.decodeAndNotify();
  }

  list() {
    return this.httpClient.get<User[]>(API);
  }

  get(id: string) {
    return this.httpClient.get<User>(`${API}/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete<User>(`${API}/${id}`);
  }

  create(data: User) {
    return this.httpClient.post<User>(API, data);
  }

  update(id: string, data: User) {
    return this.httpClient.put<User>(`${API}/${id}`, removeEmptyStringsFrom(data));
  }

  exitsEmail(email: string) {
    return this.httpClient.get(`${API}?email=${email}`);
  }

  me() {
    return this.httpClient.get<User>(`http://localhost/api/v1/me`);
  }

  login(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    this.me().subscribe(user => {
      this.userSubject.next(user);
    });
  }

  getUserSubject() {
    return this.userSubject.asObservable();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }
}
