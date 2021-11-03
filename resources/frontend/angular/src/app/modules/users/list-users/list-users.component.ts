import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { TableColumn } from 'src/app/components/table/TableColumn';
import { Actions } from 'src/app/components/table/Actions';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  messageTimer: MatSnackBarConfig = new MatSnackBarConfig();
  users!: User[];
  usersTableColumns!: TableColumn[];
  actions!: Actions;

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messageTimer.duration = 5000;
    this.initializeColumns();
    this.initializeActions();
    this.getUsers();
  }

  sortData(sortParameters: Sort) {
    const keyName: string = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.users = this.users.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.users = this.users.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getUsers();
    }
  }

  editUser(user: User) {
    this.router.navigate([`/users/${user.id}/edit`]);
  }

  viewUser(user: User) {
    this.router.navigate([`/users/${user.id}`]);
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(res => {
      this._snackBar.open('Usuário excluido com sucesso.', '', this.messageTimer);
      this.users = this.users.filter(item => item.id !== user.id)
    },
    error => {
      this._snackBar.open('Não foi possível exluir o usuário.', '', this.messageTimer);
    });
  }

  initializeActions(): void {
    this.actions = {
      edit: true,
      view: true,
      delete: true
    }
  }

  initializeColumns(): void {
    this.usersTableColumns = [
      {
        name: 'ID',
        dataKey: 'id',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Nome',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'E-mail',
        dataKey: 'email',
        position: 'left',
        isSortable: true
      },
    ];
  }

  getUsers() {
    this.userService.list().subscribe(users => this.users = users);
  }
}
