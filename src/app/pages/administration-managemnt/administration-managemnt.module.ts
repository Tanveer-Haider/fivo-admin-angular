import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationManagemntRoutingModule } from './administration-managemnt-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [AdminListComponent, AddAdminComponent, ViewAdminComponent, EditAdminComponent],
  imports: [
    CommonModule,
    AdministrationManagemntRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class AdministrationManagemntModule {}
