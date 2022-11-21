import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './pages/Auth/change-password/change-password.component';
import { ForgetPasswordComponent } from './pages/Auth/forget-password/forget-password.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { OtpVerificationComponent } from './pages/Auth/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './pages/Auth/reset-password/reset-password.component';
import { PreloadingStrategyService } from './Services/preloading-strategy.service';
import { AuthGuard } from './guard/auth.guard';
import { DashboardGuard } from './guard/dashboard.guard';
// import { HomeGuard } from './guard/home.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'otp-verification', component: OtpVerificationComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [DashboardGuard] },

  { path: 'dashboard',data: { preload: true }, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [DashboardGuard] },
  { path: 'admin',data: { preload: true }, loadChildren: () => import('./pages/administration-managemnt/administration-managemnt.module').then(m => m.AdministrationManagemntModule), canActivate: [DashboardGuard],canActivateChild: [DashboardGuard], },
  { path: 'order', loadChildren: () => import('./pages/order-management/order-management.module').then(m => m.OrderManagementModule), canActivate: [DashboardGuard] },
  { path: 'client', loadChildren: () => import('./pages/client-managemnt/client-managemnt.module').then(m => m.ClientManagemntModule), canActivate: [DashboardGuard] },
  { path: 'expert', loadChildren: () => import('./pages/expert-managemnt/expert-managemnt.module').then(m => m.ExpertManagemntModule), canActivate: [DashboardGuard] },
  { path: 'delivery', loadChildren: () => import('./pages/delivery-management/delivery-management.module').then(m => m.DeliveryManagementModule), canActivate: [DashboardGuard] },
  { path: 'inventory', loadChildren: () => import('./pages/inventory-management/inventory-management.module').then(m => m.InventoryManagementModule), canActivate: [DashboardGuard] },
  { path: 'advert', loadChildren: () => import('./pages/advert-management/advert-management.module').then(m => m.AdvertManagementModule), canActivate: [DashboardGuard] },
  { path: 'category', loadChildren: () => import('./pages/category-management/category-management.module').then(m => m.CategoryManagementModule), canActivate: [DashboardGuard] },
  { path: 'coupons', loadChildren: () => import('./pages/coupons-management/coupons-management.module').then(m => m.CouponsManagementModule), canActivate: [DashboardGuard] },
  { path: 'discount', loadChildren: () => import('./pages/discount-management/discount-management.module').then(m => m.DiscountManagementModule), canActivate: [DashboardGuard] },
  { path: 'earnings', loadChildren: () => import('./pages/earnings-management/earnings-management.module').then(m => m.EarningsManagementModule), canActivate: [DashboardGuard] },
  { path: 'jobs', loadChildren: () => import('./pages/job-management/job-management.module').then(m => m.JobManagementModule), canActivate: [DashboardGuard] },
  { path: 'materials', loadChildren: () => import('./pages/material-orders-management/material-orders-management.module').then(m => m.MaterialOrdersManagementModule), canActivate: [DashboardGuard] },
  { path: 'notification', loadChildren: () => import('./pages/notification-management/notification-management.module').then(m => m.NotificationManagementModule), canActivate: [DashboardGuard] },
  { path: 'auto-notification', loadChildren: () => import('./pages/auto-notification/auto-notification.module').then(m => m.AutoNotificationModule), canActivate: [DashboardGuard] },
  { path: 'reviews', loadChildren: () => import('./pages/review-management/review-management.module').then(m => m.ReviewManagementModule), canActivate: [DashboardGuard] },
  { path: 'services', loadChildren: () => import('./pages/service-management/service-management.module').then(m => m.ServiceManagementModule), canActivate: [DashboardGuard] },
  { path: 'static-content', loadChildren: () => import('./pages/static-content-management/static-content-management.module').then(m => m.StaticContentManagementModule), canActivate: [DashboardGuard] },
  { path: 'faq', loadChildren: () => import('./pages/faq-management/faq-management.module').then(m => m.FaqManagementModule), canActivate: [DashboardGuard] },
  { path: 'setting', data: { preload: true }, loadChildren: () => import('./pages/setting-management/setting-management.module').then(m => m.SettingManagementModule), canActivate: [DashboardGuard] },
  { path: 'reviews', loadChildren: () => import('./pages/review-management/review-management.module').then(m => m.ReviewManagementModule), canActivate: [DashboardGuard] },
  { path: 'services', loadChildren: () => import('./pages/service-management/service-management.module').then(m => m.ServiceManagementModule), canActivate: [DashboardGuard] },
  { path: 'inbox', loadChildren: () => import('./pages/inbox-management/inbox-management.module').then(m => m.InboxManagementModule), canActivate: [DashboardGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  /**
   * @Note :- route notes add 'data: { preload: true },'
   * For custom preloading Module
   * In --> Routes
   * 
   */

}
