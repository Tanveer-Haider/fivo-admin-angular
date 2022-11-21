import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationManagementRoutingModule } from './notification-management-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateListComponent } from './template-list/template-list.component';
import { AddTemplateComponent } from './add-template/add-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NotificationListComponent, TemplateListComponent, AddTemplateComponent, EditTemplateComponent],
  imports: [
    CommonModule,
    NotificationManagementRoutingModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class NotificationManagementModule { }
