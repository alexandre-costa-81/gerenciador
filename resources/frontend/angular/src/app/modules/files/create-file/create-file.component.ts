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
  file: File;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.messageTimer.duration = 5000;
    this.fileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      file: ['', [Validators.required]],
      description: ['', [Validators.minLength(6), Validators.maxLength(255)]]
    });
  }

  createFile() {
    let formData = new FormData();
    let name = this.fileForm.get('name').value;
    let description = this.fileForm.get('description').value;

    formData.append('name', name);
    formData.append('description', description);
    formData.append('document', this.file);

    this.fileService.create(formData)
      .subscribe(res => {
        this._snackBar.open('Arquivo salvo com sucesso.', '', this.messageTimer);
        this.router.navigate(['/files']);
      },
      error => {
        console.log(error)
        this._snackBar.open('Não foi possível salvar o arquivo.', '', this.messageTimer);
      }
    );
  }

  onFileChange(fileList: FileList): void {
    if (fileList.length) {
      this.file = fileList[0];
      this.fileForm.patchValue({ file: `${this.file.name}` });
    }
  }
}
