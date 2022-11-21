import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { ViewFaqComponent } from './view-faq/view-faq.component';

const routes: Routes = [
  {path: '', component:FaqListComponent},
  {path: 'view-faq', component:ViewFaqComponent},
  {path: 'edit-faq', component:EditFaqComponent},
  {path: 'add-faq', component:AddFaqComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqManagementRoutingModule { }
