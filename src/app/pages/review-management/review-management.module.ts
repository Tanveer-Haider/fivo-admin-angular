import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewManagementRoutingModule } from './review-management-routing.module';
import { ReviewListComponent } from './review-list/review-list.component';
import { ViewReviewComponent } from './view-review/view-review.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReviewListComponent, ViewReviewComponent],
  imports: [
    CommonModule,
    ReviewManagementRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReviewManagementModule { }
