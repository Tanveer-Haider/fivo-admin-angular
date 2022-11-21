import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EarningListComponent } from './earning-list/earning-list.component';
import { ViewEarningComponent } from './view-earning/view-earning.component';

const routes: Routes = [
  {path: '',component:EarningListComponent},
  {path:'view-earning',component:ViewEarningComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarningsRoutingModule { }
