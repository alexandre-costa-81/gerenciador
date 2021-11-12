import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateFileComponent } from "./create-file/create-file.component";
// import { EditFileComponent } from "./edit-file/edit-file.component";
import { ListFilesComponent } from "./list-files/list-files.component";
import { ViewFileComponent } from "./view-file/view-file.component";

const routes: Routes = [
  { path: '', component: ListFilesComponent },
  { path: 'create', component: CreateFileComponent },
  { path: ':id', component: ViewFileComponent },
  // { path: ':id/edit', component: EditFileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
