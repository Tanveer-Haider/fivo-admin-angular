import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';




@NgModule({
  declarations: [MainDashboardComponent, ViewOrderDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
  ]
})
export class DashboardModule { }
