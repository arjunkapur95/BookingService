import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}