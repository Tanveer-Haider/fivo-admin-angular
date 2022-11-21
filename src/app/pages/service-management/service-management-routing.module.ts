import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ViewServiceComponent } from './view-service/view-service.component';

const routes: Routes = [
  {path:'',component:ServiceListComponent},
  {path:'add-service',component:AddServiceComponent},
  {path:'view-service',component:ViewServiceComponent},
  {path:'edit-service',component:EditServiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagementRoutingModule { }
