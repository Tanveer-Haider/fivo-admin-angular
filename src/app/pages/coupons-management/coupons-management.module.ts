import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-management-routing.module';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/module/share/share.module';


@NgModule({
  declarations: [CouponListComponent, AddCouponComponent, EditCouponComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ShareModule
  ]
})
export class CouponsManagementModule { }
