import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FileService } from 'src/app/services/file/file.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {
  messageTimer: MatSnackBarConfig = new MatSnackBarConfig();
  passwordHide = true;
  fileForm: FormGroup;
  hideRequiredControl = new FormControl(false);

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messageTimer.duration = 5000;
    this.fileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      file: ['', [Validators.required]]
    });
  }

  createFile() {
    this.fileService.create(this.fileForm.value)
      .subscribe(res => {
        this._snackBar.open('Arquivo salvo com sucesso.', '', this.messageTimer);
        this.router.navigate(['/files']);
      },
      error => {
        console.log(error)
        this._snackBar.open('Não foi possível salvar o arquivo.', '', this.messageTimer);
      });
  }

  display: FormControl = new FormControl("", Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax
  }
}
