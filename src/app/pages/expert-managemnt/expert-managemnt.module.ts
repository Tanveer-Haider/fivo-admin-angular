import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertManagemntRoutingModule } from './expert-managemnt-routing.module';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { EditExpertComponent } from './edit-expert/edit-expert.component';
import { ViewExpertComponent } from './view-expert/view-expert.component';
import { AddExpertComponent } from './add-expert/add-expert.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [ExpertListComponent, EditExpertComponent, ViewExpertComponent, AddExpertComponent],
  imports: [
    ImageCropperModule,
    CommonModule,
    ExpertManagemntRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    GooglePlaceModule
  ]
})
export class ExpertManagemntModule {
  
 }
