import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { ForgetPasswordComponent } from './pages/Auth/forget-password/forget-password.component';
import { SideBarComponent } from './pages/sharing/side-bar/side-bar.component';
import { HeaderComponent } from './pages/sharing/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetPasswordComponent } from './pages/Auth/reset-password/reset-password.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpVerificationComponent } from './pages/Auth/otp-verification/otp-verification.component';
import { ChangePasswordComponent } from './pages/Auth/change-password/change-password.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { BnNgIdleService } from 'bn-ng-idle';
import { FooterComponent } from './pages/sharing/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    SideBarComponent,
    HeaderComponent,
    ResetPasswordComponent,
    OtpVerificationComponent,
    ChangePasswordComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgOtpInputModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      maxOpened: 1,
      preventDuplicates: true,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },DatePipe,BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
