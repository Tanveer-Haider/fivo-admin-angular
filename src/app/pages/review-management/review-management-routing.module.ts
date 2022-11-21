import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewListComponent } from './review-list/review-list.component';
import { ViewReviewComponent } from './view-review/view-review.component';

const routes: Routes = [
  {path:'',component:ReviewListComponent},
  {path:'view-review/:id',component:ViewReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewManagementRoutingModule { }
