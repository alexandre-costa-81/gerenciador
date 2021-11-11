import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateFileComponent } from './create-file/create-file.component';
import { FilesRoutingModule } from './files-routing.modules';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListFilesComponent } from './list-files/list-files.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { ViewFileComponent } from './view-file/view-file.component';



@NgModule({
  declarations: [
    CreateFileComponent,
    ListFilesComponent,
    EditFileComponent,
    ViewFileComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ComponentsModule
  ]
})
export class FilesModule { }
