import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';

const routes: Routes = [
  {path:'',component:DiscountListComponent},
  {path:'add-discount',component:AddDiscountComponent},
  {path:'edit-discount',component:EditDiscountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountManagementRoutingModule { }
