import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertManagementRoutingModule } from './advert-management-routing.module';
import { AdvertListComponent } from './advert-list/advert-list.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [AdvertListComponent, AddAdvertComponent, EditAdvertComponent],
  imports: [
    CommonModule,
    AdvertManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ImageCropperModule
  ]
})
export class AdvertManagementModule { }
