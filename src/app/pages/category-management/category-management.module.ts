import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [CategoryListComponent, EditCategoryComponent, AddCategoryComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ImageCropperModule
  ]
})
export class CategoryManagementModule { }
