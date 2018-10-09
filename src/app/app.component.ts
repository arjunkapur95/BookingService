import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Booking Service"
  constructor(private authService:AuthService){
  }
  logOut(){
    this.authService.logout();
  }
}
