import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialOrderListComponent } from './material-order-list/material-order-list.component';
import { ViewMaterialOrderComponent } from './view-material-order/view-material-order.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {path : '' , component : MaterialOrderListComponent},
  {path : 'view-material-order',component : ViewMaterialOrderComponent},
  {path:"list-material-order", component: MaterialOrderListComponent}
];

@NgModule({
  imports: [NgxPaginationModule,NgxSliderModule,RouterModule.forChild(routes)],
  exports: [NgxSliderModule,RouterModule]
})
export class MaterialOrdersRoutingModule { }
