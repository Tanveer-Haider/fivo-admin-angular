import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [TicketListComponent, TicketViewComponent],
  imports: [
    CommonModule,
    TicketManagementRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class TicketManagementModule { }
