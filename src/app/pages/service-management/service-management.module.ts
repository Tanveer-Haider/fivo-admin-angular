import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [ServiceListComponent, AddServiceComponent, ViewServiceComponent, EditServiceComponent],
  imports: [
    CommonModule,
    ServiceManagementRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class ServiceManagementModule { }
