import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { ViewAgentComponent } from './view-agent/view-agent.component';

const routes: Routes = [
  {path:'',component:AgentListComponent},
  {path:'add-agent',component:AddAgentComponent},
  {path:'view-agent/:id',component:ViewAgentComponent},
  {path:'edit-agent/:id',component:EditAgentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryManagementRoutingModule { }
