import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';

const routes: Routes = [
  { path: "", component: CouponListComponent },
  { path: "add-coupons", component: AddCouponComponent },
  { path: "edit-coupons", component: EditCouponComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
