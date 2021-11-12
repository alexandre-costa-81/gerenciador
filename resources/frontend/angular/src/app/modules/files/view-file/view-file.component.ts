import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from 'src/app/models/File.model';

import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  fileForm: FormGroup;
  file: FileModel;

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      name: [''],
      description: ['']
    });
    this.getFile(this.route.snapshot.paramMap.get('id'));
  }

  getFile(id) {
    this.fileService.get(id)
      .toPromise()
      .then(file => {
        this.fileForm = new FormGroup({
          'name': new FormControl({ value: file.name, disabled: true }),
          'description': new FormControl({ value: file.description, disabled: true })
        });
        this.file = file;
      })
      .catch(
      error => {
        console.log(error);
    });
  }

  download() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fileService.download(id).subscribe(blob => {
      console.log(blob);
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = this.file.name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
