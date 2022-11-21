import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingManagementRoutingModule } from './setting-management-routing.module';
import { ViewAdminProfileComponent } from './admin/view-admin-profile/view-admin-profile.component';
import { EditAdminProfileComponent } from './admin/edit-admin-profile/edit-admin-profile.component';
import { ExpertFeeComponent } from './fees/expert-fee/expert-fee.component';
import { CancellationFeeComponent } from './fees/cancellation-fee/cancellation-fee.component';
import { DeliveryFeeComponent } from './fees/delivery-fee/delivery-fee.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';
import { ServiceAreaIndicesComponent } from './service-area-indices/service-area-indices.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ClientSigninScreensBackgroundImageComponent } from './client-signin-screens-background-image/client-signin-screens-background-image.component';
import { ClientSigninScreensLogoComponent } from './client-signin-screens-logo/client-signin-screens-logo.component';
import { SliderImageComponent } from './slider-image/slider-image.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { RewardAmountsComponent } from './reward-amounts/reward-amounts.component';
import { AppReferralMessageComponent } from './app-referral-message/app-referral-message.component';
import { AutomaticLogoutTimeComponent } from './automatic-logout-time/automatic-logout-time.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { CurrencySymbolComponent } from './currency-symbol/currency-symbol.component';
import { CancellationReasonComponent } from './cancellation-reason/cancellation-reason.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeliveryVehicleListComponent } from './delivery-vehicle-type/delivery-vehicle-list/delivery-vehicle-list.component';
import { DeliveryVehicleViewComponent } from './delivery-vehicle-type/delivery-vehicle-view/delivery-vehicle-view.component';
import { DeliveryVehicleEditComponent } from './delivery-vehicle-type/delivery-vehicle-edit/delivery-vehicle-edit.component';
import { DeliveryVehicleAddComponent } from './delivery-vehicle-type/delivery-vehicle-add/delivery-vehicle-add.component';
import { AddCancellationReasonComponent } from './cancellation-reason/add-cancellation-reason/add-cancellation-reason.component';
import { EditCancellationReasonComponent } from './cancellation-reason/edit-cancellation-reason/edit-cancellation-reason.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FeesComponent } from './fees/fees.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { AddSliderImageComponent } from './slider-image/add-slider-image/add-slider-image.component';
import { EditSliderImageComponent } from './slider-image/edit-slider-image/edit-slider-image.component';
import { EditHomeScreenComponent } from './home-screen/edit-home-screen/edit-home-screen.component';
import { EmailGeneratedComponent } from './email-generated/email-generated.component';
import { ServiceAreaComponent } from './service-area/service-area.component';
import { AddServiceAreaComponent } from './service-area/add-service-area/add-service-area.component';
import { EditServiceAreaComponent } from './service-area/edit-service-area/edit-service-area.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [ViewAdminProfileComponent,
    EditAdminProfileComponent,
    ExpertFeeComponent,
    CancellationFeeComponent,
    DeliveryVehicleListComponent,
    DeliveryFeeComponent,
    ServiceAreasComponent,
    ServiceAreaIndicesComponent,
    HomeScreenComponent,
    ClientSigninScreensBackgroundImageComponent,
    ClientSigninScreensLogoComponent,
    SliderImageComponent,
    PaymentMethodsComponent,
    RewardAmountsComponent,
    AppReferralMessageComponent,
    AutomaticLogoutTimeComponent,
    SocialNetworksComponent,
    CurrencySymbolComponent,
    CancellationReasonComponent,
    DeliveryVehicleViewComponent,
    DeliveryVehicleEditComponent,
    DeliveryVehicleAddComponent,
    AddCancellationReasonComponent,
    EditCancellationReasonComponent,
    FeesComponent,
    FeeManagementComponent,
    AddSliderImageComponent,
    EditSliderImageComponent,
    EditHomeScreenComponent,
    EmailGeneratedComponent,
    ServiceAreaComponent,
    AddServiceAreaComponent,
    EditServiceAreaComponent
    ],
  imports: [
    CommonModule,
    SettingManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule,
    GooglePlaceModule,
    ImageCropperModule

  ]
})
export class SettingManagementModule {
  constructor() {
    console.log("setting module loaded");

  }
}
