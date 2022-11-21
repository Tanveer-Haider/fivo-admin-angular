import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoNotificationListComponent } from './auto-notification-list/auto-notification-list.component';
import { EditAutoNotificationComponent } from './edit-auto-notification/edit-auto-notification.component';
import { ViewAutoNotificationComponent } from './view-auto-notification/view-auto-notification.component';

const routes: Routes = [
  {path:'',component:AutoNotificationListComponent},
  {path:'edit-auto-notification/:id',component:EditAutoNotificationComponent},
  {path:'view-auto-notification/:id',component:ViewAutoNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoNotificationRoutingModule { }
