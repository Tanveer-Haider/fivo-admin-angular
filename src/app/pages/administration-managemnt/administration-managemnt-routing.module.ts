import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

const routes: Routes = [
  {path : "" ,component:AdminListComponent},
  {path : 'view-admin',component:ViewAdminComponent},
  {path : 'add-admin' , component: AddAdminComponent},
  {path : 'edit-admin' , component: EditAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationManagemntRoutingModule { }
