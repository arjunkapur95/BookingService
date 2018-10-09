import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password1:'';
  password2:'';
  email:'';
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  signUp(){
    if(this.password1!==this.password2){
      console.log("Incorrect passwords");
    } else {
      this.authService.emailSignup(this.email,this.password1);
    }
  }
}
