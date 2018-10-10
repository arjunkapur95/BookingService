import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {AuthGuard} from './core/auth.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'signup',component:SignupComponent},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'reset', component: ResetpasswordComponent},
  { path: 'booking', component: BookingPageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}