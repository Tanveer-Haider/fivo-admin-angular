import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTemplateComponent } from './add-template/add-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { TemplateListComponent } from './template-list/template-list.component';

const routes: Routes = [
  {path:'',component:NotificationListComponent},
  {path:'template-list',component:TemplateListComponent},
  {path:'add-template',component:AddTemplateComponent},
  {path:'edit-template',component:EditTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationManagementRoutingModule { }
