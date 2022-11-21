import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SplitPipe } from 'src/app/pipes/split.pipe';


@NgModule({
  declarations: [OrderListComponent, ViewOrderComponent, EditOrderComponent],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    NgxPaginationModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrderManagementModule { 
  constructor(){
    console.log("order module loaded");
  }
}
