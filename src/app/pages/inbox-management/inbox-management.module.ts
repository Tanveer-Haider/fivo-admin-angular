import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxManagementRoutingModule } from './inbox-management-routing.module';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InboxListComponent],
  imports: [
    CommonModule,
    InboxManagementRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InboxManagementModule { }
