import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { AdvertListComponent } from './advert-list/advert-list.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';

const routes: Routes = [
  { path: '', component: AdvertListComponent },
  { path: 'add-advert', component: AddAdvertComponent },
  { path: 'edit-advert', component: EditAdvertComponent },
  {path: 'advert-list', component:AdvertListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertManagementRoutingModule { }
