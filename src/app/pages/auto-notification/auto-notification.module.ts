import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoNotificationRoutingModule } from './auto-notification-routing.module';
import { EditAutoNotificationComponent } from './edit-auto-notification/edit-auto-notification.component';
import { AutoNotificationListComponent } from './auto-notification-list/auto-notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewAutoNotificationComponent } from './view-auto-notification/view-auto-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditAutoNotificationComponent, AutoNotificationListComponent, ViewAutoNotificationComponent],
  imports: [
    CommonModule,
    AutoNotificationRoutingModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AutoNotificationModule { }
