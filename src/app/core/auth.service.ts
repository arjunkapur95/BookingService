import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {
  authState: any = null;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get isLoggedIn(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string{
    return (this.authState !== null) ? this.authState.uid: ''
  }

  get currentUserName(): any{
    // return this.authState['email']
    return this.afAuth.auth.currentUser.email;
  }

  get currentUser():any{
    return (this.authState!==null)?this.authState:null;
  }


  emailLogin(email:string, password: string):boolean{
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
        .then(value =>{
          this.authState=value;
          console.log('Nice, it worked!');
          this.router.navigateByUrl('/home');
        })
        .catch(err=>{
          console.log('Something went wrong: ',err.message);
        })
    return false;    
  }

  
  
  emailSignup(email:string,password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(value=>{
        this.authState=value;
        console.log('Success',value);
        this.router.navigateByUrl('/home');
      })
      .catch(error=>{
        console.log('Something went wrong: ',error);
      })
  }


  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/']);
    });
  }

  
  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider);
  }

  resetPassword(email:string){
    return this.afAuth.auth.sendPasswordResetEmail(email)
        .then(()=>console.log("email sent"))
        .catch((error)=>{
          console.log(error);
        })
  }
  
}
