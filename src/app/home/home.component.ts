import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private bookingService: BookingService,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService) { }
  bookings: any[];
  tempBookings:any[];
  emptyBooking = true;
  today: Date;

  ngOnInit() {
  	this.getBookings();
    const tempDate = new Date();
      this.today = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate());
  }

  // Returns the bookings of a given user and displays the active bookings
  getBookings(): void{
    console.log("Getting bookings for "+this.authService.currentUserName);
  	this.bookingService.getBookingsByName(this.authService.currentUserEmail)
  		.subscribe(b =>{
        console.log(b.length);
        // Removes the bookings that have expired i.e. end date before today
        for(var i=0;i<b.length;i++){
          b[i].endDate = new Date(b[i].endDate.seconds*1000);
          b[i].startDate = new Date(b[i].startDate.seconds*1000);
          if(b[i].endDate.getTime()<this.today.getTime()){
            b.splice(i,1);
            i--;
            }
        }  
        // Sorts the bookings by startDate
        for(var j=0;j<b.length-1;j++){
          for(var i=0;i<b.length-1-j;i++){
            if(b[i].startDate.getTime()>b[i+1].startDate.getTime()){
               var temp=b[i+1];
               b[i+1]=b[i];
               b[i] = temp;
            }  
          }
        }
        this.bookings=b;
        if(this.bookings.length>0){this.emptyBooking=false; console.log(this.emptyBooking);}

  })
  }

  //Deletes a booking
  delete(email:string,env:string, start:Date,end:Date){
    this.bookingService.deleteBooking(email,env,start,end);
  }

  // Opens the confirmation window to delete a booking
  openBottomSheet(name:string,env:string, start:Date,end:Date): void {
    var temp = name+env+start+end;
    const sheetRef = this.bottomSheet.open(DeleteConfirmation);
    sheetRef.afterDismissed().subscribe(result=>{
      if(result != null){
        if(result.delete){
                this.delete(name,env,start,end);
        }
      }      
    })
  }

}

@Component({
  selector: 'delete-confirmation',
  templateUrl: 'delete-confirmation.html',

})
export class DeleteConfirmation {
  constructor(private bottomSheetRef: MatBottomSheetRef<DeleteConfirmation>) {}
  // Sets delete flag to true for the home component
  deleteBooking(event: MouseEvent): void{
    this.bottomSheetRef.dismiss({delete:true});
    event.preventDefault();
   }
  
  // Sets delete flag to false for the home component
  doNothing(event: MouseEvent): void{
    this.bottomSheetRef.dismiss({delete:false});
    event.preventDefault();
   }
}