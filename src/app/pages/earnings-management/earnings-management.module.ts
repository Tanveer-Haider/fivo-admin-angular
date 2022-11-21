import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarningsRoutingModule } from './earnings-management-routing.module';
import { EarningListComponent } from './earning-list/earning-list.component';
import { ViewEarningComponent } from './view-earning/view-earning.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [EarningListComponent, ViewEarningComponent],
  imports: [
    CommonModule,
    EarningsRoutingModule,
    NgxPaginationModule
  ]
})
export class EarningsManagementModule { }
