import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialOrdersRoutingModule } from './material-orders-management-routing.module';
import { MaterialOrderListComponent } from './material-order-list/material-order-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewMaterialOrderComponent } from './view-material-order/view-material-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MaterialOrderListComponent, ViewMaterialOrderComponent],
  imports: [
    CommonModule,
    MaterialOrdersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MaterialOrdersManagementModule { }
