import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManagemntRoutingModule } from './client-managemnt-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [ClientListComponent, AddClientComponent, ViewClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientManagemntRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
})
export class ClientManagemntModule { 
  constructor(){
    console.log("client module loaded");
    
  }
}
