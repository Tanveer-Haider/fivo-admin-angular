import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { ViewJobComponent } from './view-job/view-job.component';

const routes: Routes = [
  {path:'',component:JobListComponent},
  {path:'view-job',component:ViewJobComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobManagementRoutingModule { }
