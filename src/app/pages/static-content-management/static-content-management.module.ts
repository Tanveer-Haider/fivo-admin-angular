import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticContentManagementRoutingModule } from './static-content-management-routing.module';
import { StaticContentListComponent } from './static-content-list/static-content-list.component';
import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ngx-ckeditor';
import { SplitPipe } from 'src/app/pipes/split.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [StaticContentListComponent, ViewStaticContentComponent,SplitPipe, ContactUsComponent],
  imports: [
    CommonModule,
    StaticContentManagementRoutingModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class StaticContentManagementModule { }
