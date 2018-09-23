import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BOOKINGS } from '../mock-booking';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {


  submitted = true; 
  minDate = new Date();
  request: Booking = new Booking(this.minDate,this.minDate,"","");
  environments=['Dev','Test','SIT','UAT','Prod'];
  today = new Date();
   validBooking = true;

  constructor(private bookingServce: BookingService) { }

  contructor(http: Http){
     this.request={} as any;
   }

   
  registerUser() {
    if(this.request.startDate == this.minDate ||
      this.request.endDate == this.minDate ||
      this.request.environment==""||
      this.request.name==""){
      console.log("test");
      this.submitted = false;
    } else {
      // //Converts the date input into a date variable
      // var parts = this.request.startDate.match(/(\d+)/g);
      // var tempStart = new Date(parts[0], parts[1]-1, parts[2]);
      // parts = this.request.endDate.match(/(\d+)/g);
      // var tempEnd = new Date(parts[0], parts[1]-1, parts[2]);


      // //Checks against the list of known dates
      // for(var b of BOOKINGS){
      //   if((tempStart.getTime()>b.startDate.getTime()&&tempStart.getTime()<b.endDate.getTime())||
      //   (tempEnd.getTime()>b.startDate.getTime()&&tempEnd.getTime()<b.endDate.getTime())){
      //   //   console.log(this.request.environment);
      //   // console.log(b.environment);
      //   //   if(this.request.environment==b.environment){
      //   //     validBooking=false;
      //   //   }  
      //     if(this.request.environment==b.environment){
      //       validBooking=false;
      //     }
      //   } 
      // }

      // 
      //Confirms validity of booking
      this.bookingServce.checkAvaliability(this.request).subscribe(validBooking=>this.validBooking=validBooking);

      if(this.validBooking){
        console.log("Booking is legal.");
      } else {
        console.log("Booking is illegal");
      }
    }
  }


  updateDate(){
        // var parts = this.request.startDate.match(/(\d+)/g);
        // var tempStart = new Date(parts[0], parts[1]-1, parts[2]);
        const tempStart: Date = new Date(this.request.startDate);

        tempStart.setDate(tempStart.getDate()+1);
        this.minDate = tempStart;
  }
  ngOnInit() {
  }

}
