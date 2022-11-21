import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  {path: '', component:OrderListComponent},
  {path : 'view-order',component : ViewOrderComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
