import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';

const routes: Routes = [
  {path:'',component:TicketListComponent},
  {path:'ticket-view',component:TicketViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagementRoutingModule { }
