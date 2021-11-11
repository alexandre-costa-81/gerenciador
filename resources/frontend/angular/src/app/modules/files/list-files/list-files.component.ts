import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Actions } from 'src/app/components/table/Actions';
import { TableColumn } from 'src/app/components/table/TableColumn';
import { FileModel } from 'src/app/models/File.model';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  messageTimer: MatSnackBarConfig = new MatSnackBarConfig();
  files!: FileModel[];
  filesTableColumns!: TableColumn[];
  actions!: Actions;

  constructor(
    private router: Router,
    private fileService: FileService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messageTimer.duration = 5000;
    this.initializeColumns();
    this.initializeActions();
    this.getFiles();
  }

  sortData(sortParameters: Sort) {
    const keyName: string = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.files = this.files.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.files = this.files.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getFiles();
    }
  }

  editFile(file: FileModel) {
    this.router.navigate([`/files/${file.id}/edit`]);
  }

  viewFile(file: FileModel) {
    this.router.navigate([`/files/${file.id}`]);
  }

  deleteFile(file: FileModel) {
    this.fileService.delete(file.id).subscribe(res => {
      this._snackBar.open('Usuário excluido com sucesso.', '', this.messageTimer);
      this.files = this.files.filter(item => item.id !== file.id)
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
    this.filesTableColumns = [
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
        name: 'Caminho',
        dataKey: 'path',
        position: 'left',
        isSortable: true
      },
    ];
  }

  getFiles() {
    this.fileService.list().subscribe(files => this.files = files);
  }
}
