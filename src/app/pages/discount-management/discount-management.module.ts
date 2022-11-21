import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountManagementRoutingModule } from './discount-management-routing.module';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShareModule } from 'src/app/module/share/share.module';

// import { MultiSelectDropdownComponent } from 'src/app/components/multi-select-dropdown/multi-select-dropdown.component';

@NgModule({
  declarations: [DiscountListComponent, AddDiscountComponent, EditDiscountComponent,
    // MultiSelectDropdownComponent 
  ],
  imports: [
    CommonModule,
    DiscountManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    ShareModule
  ],
  // exports:[
  //   MultiSelectDropdownComponent
  // ]
})
export class DiscountManagementModule { }
