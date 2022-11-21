import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StaticContentListComponent } from './static-content-list/static-content-list.component';
import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';

const routes: Routes = [
  {path: '',component:StaticContentListComponent},
  {path : 'view-static-content',component :ViewStaticContentComponent},
  {path : 'view-contact-us',component :ContactUsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticContentManagementRoutingModule { }
