import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqManagementRoutingModule } from './faq-management-routing.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { ViewFaqComponent } from './view-faq/view-faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [FaqListComponent, ViewFaqComponent, AddFaqComponent, EditFaqComponent],
  imports: [
    CommonModule,
    FaqManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      maxOpened: 1,
      preventDuplicates: true,
    }),
    NgxPaginationModule
  ]
})
export class FaqManagementModule { }
