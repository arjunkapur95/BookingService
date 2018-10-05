import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeComponent, DeleteConfirmation } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { FormControl, 
         Validators, 
         ValidatorFn, 
         AbstractControl,
         FormsModule, 
         ReactiveFormsModule, 
         NgForm  } from '@angular/forms';
import { MatDatepickerModule,
         MatNativeDateModule,
         MatInputModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookingPageComponent,
    DeleteConfirmation
      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatBottomSheetModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule.forRoot()
],
  providers: [MatNativeDateModule,],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent,DeleteConfirmation]
})
export class AppModule { }
