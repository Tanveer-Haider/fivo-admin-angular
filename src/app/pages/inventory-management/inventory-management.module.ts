import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [ProductListComponent, AddProductComponent, EditProductComponent, ViewProductComponent],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class InventoryManagementModule { 
  constructor(){
    console.log("inventory module loaded"); 
    
  }
}
