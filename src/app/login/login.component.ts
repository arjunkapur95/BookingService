import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:'';
  password:'';
  correctInfo=true;
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  login(){
    this.authService.emailLogin(this.email,this.password);
    console.log(this.email);
    console.log(this.correctInfo);

  }
}
