import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobManagementRoutingModule } from './job-management-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JobListComponent, ViewJobComponent],
  imports: [
    CommonModule,
    JobManagementRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class JobManagementModule { }
