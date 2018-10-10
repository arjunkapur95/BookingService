import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email ='';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  //Sends an email to reset the password
  reset(){
    if(this.email!=''){
      this.authService.resetPassword(this.email);
    }
  }
}

