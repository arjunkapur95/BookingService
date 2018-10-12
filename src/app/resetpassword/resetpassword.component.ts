import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email ='';
  constructor(private authService: AuthService,
    private snackbar:MatSnackBar) { }

  ngOnInit() {
  }
  //Sends an email to reset the password
  reset(){
    if(this.email!=''){
      this.authService.resetPassword(this.email);
      this.openSnackBar();
    }
  }

openSnackBar(){
  this.snackbar.openFromComponent(ResetEmailComponent,{
    duration:1500,
  })
}



}



@Component({
selector: 'app-reset-email',
templateUrl: './reset-email-component.html',
})
export class ResetEmailComponent{}