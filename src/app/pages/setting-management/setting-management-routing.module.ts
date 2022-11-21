import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomaticLogoutTimeComponent } from './automatic-logout-time/automatic-logout-time.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { EditAdminProfileComponent } from './admin/edit-admin-profile/edit-admin-profile.component';
import { ClientSigninScreensBackgroundImageComponent } from './client-signin-screens-background-image/client-signin-screens-background-image.component';
import { ClientSigninScreensLogoComponent } from './client-signin-screens-logo/client-signin-screens-logo.component';
import { ViewAdminProfileComponent } from './admin/view-admin-profile/view-admin-profile.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SliderImageComponent } from './slider-image/slider-image.component';
import { RewardAmountsComponent } from './reward-amounts/reward-amounts.component';
import { ExpertFeeComponent } from './fees/expert-fee/expert-fee.component';
import { CancellationFeeComponent } from './fees/cancellation-fee/cancellation-fee.component';
import { DeliveryFeeComponent } from './fees/delivery-fee/delivery-fee.component';
import { DeliveryVehicleListComponent } from './delivery-vehicle-type/delivery-vehicle-list/delivery-vehicle-list.component';
import { DeliveryVehicleViewComponent } from './delivery-vehicle-type/delivery-vehicle-view/delivery-vehicle-view.component';
import { DeliveryVehicleEditComponent } from './delivery-vehicle-type/delivery-vehicle-edit/delivery-vehicle-edit.component';
import { ServiceAreaIndicesComponent } from './service-area-indices/service-area-indices.component';
import { CurrencySymbolComponent } from './currency-symbol/currency-symbol.component';
import { CancellationReasonComponent } from './cancellation-reason/cancellation-reason.component';
import { AddCancellationReasonComponent } from './cancellation-reason/add-cancellation-reason/add-cancellation-reason.component';
import { EditCancellationReasonComponent } from './cancellation-reason/edit-cancellation-reason/edit-cancellation-reason.component';
import { AppReferralMessageComponent } from './app-referral-message/app-referral-message.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';
import { DeliveryVehicleAddComponent } from './delivery-vehicle-type/delivery-vehicle-add/delivery-vehicle-add.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { AddSliderImageComponent } from './slider-image/add-slider-image/add-slider-image.component';
import { EditSliderImageComponent } from './slider-image/edit-slider-image/edit-slider-image.component';
import { EditHomeScreenComponent } from './home-screen/edit-home-screen/edit-home-screen.component';
import { EmailGeneratedComponent } from './email-generated/email-generated.component';
import { ServiceAreaComponent } from './service-area/service-area.component';
import { AddServiceAreaComponent } from './service-area/add-service-area/add-service-area.component';
import { EditServiceAreaComponent } from './service-area/edit-service-area/edit-service-area.component';
const routes: Routes = [
  {path: "", component:ViewAdminProfileComponent},
  {path : 'admin-season',component :AutomaticLogoutTimeComponent},
  {path : 'social-network', component :SocialNetworksComponent},
  {path:"edit-admin-profile", component:EditAdminProfileComponent},
  {path: "view-admin-profile", component:ViewAdminProfileComponent},
  {path : 'background',component : ClientSigninScreensBackgroundImageComponent},
  {path : 'logo',component : ClientSigninScreensLogoComponent},
  { path: 'home-screen', component: HomeScreenComponent },
  { path: 'slider-image', component: SliderImageComponent },
  { path: 'reward-amount', component: RewardAmountsComponent },
  {path : 'expert-fee', component:ExpertFeeComponent},
  {path : 'cancellation-fee', component:CancellationFeeComponent},
  {path : 'delivery-fee', component:DeliveryFeeComponent},
  {path : 'delivery-vehicle-list', component:DeliveryVehicleListComponent},
  {path: 'delivery-vehicle-view', component:DeliveryVehicleViewComponent},
  {path: 'delivery-vehicle-edit', component:DeliveryVehicleEditComponent},
  {path: 'delivery-vehicle-add', component:DeliveryVehicleAddComponent},
  {path: 'service-area-indices', component:ServiceAreaIndicesComponent},
  {path: 'currency-symbol', component:CurrencySymbolComponent},
  {path: 'cancellation-reason', component:CancellationReasonComponent},
  {path: 'add-cancellation-reason', component:AddCancellationReasonComponent},
  {path: 'edit-cancellation-reason', component:EditCancellationReasonComponent},
  {path: 'app-referral-message', component:AppReferralMessageComponent},
  {path: 'services-areas', component:ServiceAreasComponent},
  {path: 'add-vehicle', component:DeliveryVehicleAddComponent},
  {path: 'fee-management', component:FeeManagementComponent},
  {path: 'add-slider', component:AddSliderImageComponent},
  {path: 'edit-home-Screen/:id', component:EditHomeScreenComponent},
  {path: 'edit-slider', component:EditSliderImageComponent},
  {path: 'system-email', component:EmailGeneratedComponent},
  {path : 'sevice-area', component : ServiceAreaComponent},
  {path : 'add-service-area', component : AddServiceAreaComponent},
  {path : 'edit-service-area', component : EditServiceAreaComponent}
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingManagementRoutingModule { }
