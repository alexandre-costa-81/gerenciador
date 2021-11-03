import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ListUsersComponent } from "./list-users/list-users.component";
import { ViewUserComponent } from "./view-user/view-user.component";

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'create', component: CreateUserComponent },
  { path: ':id', component: ViewUserComponent },
  { path: ':id/edit', component: EditUserComponent },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
