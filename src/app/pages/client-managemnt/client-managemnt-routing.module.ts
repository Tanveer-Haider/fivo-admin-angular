import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {path : '' , component:ClientListComponent},
  {path : 'add-client',component:AddClientComponent},
  {path : 'edit-client/:id',component:EditClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagemntRoutingModule { }
