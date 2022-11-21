import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';

const routes: Routes = [
  {path:'',component:MainDashboardComponent},
  {path:'view-order', component:ViewOrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
