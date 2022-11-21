import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryManagementRoutingModule } from './delivery-management-routing.module';
import { AgentListComponent } from './agent-list/agent-list.component';
import { ViewAgentComponent } from './view-agent/view-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [AgentListComponent, ViewAgentComponent, AddAgentComponent, EditAgentComponent],
  imports: [
    CommonModule,
    DeliveryManagementRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    GooglePlaceModule,
    MatInputModule,
    MatAutocompleteModule,
    ImageCropperModule
  ]
})
export class DeliveryManagementModule {
  constructor(){
    console.log("delivery module loaded");
    
  }
 }
