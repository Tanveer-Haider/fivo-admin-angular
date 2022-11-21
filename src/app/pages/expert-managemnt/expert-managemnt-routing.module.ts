import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExpertComponent } from './add-expert/add-expert.component';
import { EditExpertComponent } from './edit-expert/edit-expert.component';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { ViewExpertComponent } from './view-expert/view-expert.component';

const routes: Routes = [
  { path: '', component: ExpertListComponent },
  { path: 'add-expert', component: AddExpertComponent },
  { path: 'view-expert/:id', component: ViewExpertComponent },
  { path: 'edit-expert/:id', component: EditExpertComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertManagemntRoutingModule { }
