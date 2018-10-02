import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookingService } from '../booking.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  validBooking = true;
  submitted = true; 
  minDate = new Date();
  request: Booking = new Booking(this.minDate,this.minDate,"","");
  environments=['Dev','Test','SIT','UAT','Prod'];
  today = new Date();
  temp = true;
  bookings : Observable<any[]>;
  val: any[];
  constructor(private bookingService: BookingService) { }

  contructor(http: Http){
     this.request={} as any;

   }

   
  async registerUser() {
    if(this.request.startDate == this.minDate ||
      this.request.endDate == this.minDate ||
      this.request.environment==""||
      this.request.name==""){
      this.submitted = false;
    } else {
      var notBooked = true;
      const tempStart = new Date(this.request.startDate);
      const tempEnd = new Date(this.request.endDate);

      this.bookingService.getBookingsByEnviroment(this.request.environment).subscribe(b =>{
      if(this.temp){
        console.log("Test");
        console.log(b.length);
        for(var i=0;i<b.length;i++){
        console.log("Testing for ...... "+b[i].name);
        const start = new Date(b[i].startDate.seconds*1000);
        const end = new Date(b[i].endDate.seconds*1000);
        console.log(tempStart.getTime());
        console.log(tempEnd.getTime());
        console.log(start.getTime());
        console.log(end.getTime());
        if(tempStart.getTime()>=start.getTime() && tempStart.getTime()<=end.getTime() 
        || tempEnd.getTime()>=start.getTime() && tempEnd.getTime()<=end.getTime()
        ||tempStart.getTime()<=start.getTime() && tempEnd.getTime()>=start.getTime() ){
          notBooked = false;
          i=b.length;
          }
        }
                               
        if(notBooked){
          console.log("Making booking");
          this.bookingService.makeBooking(this.request.name,this.request.environment,tempStart,tempEnd);
          this.temp=false;

        } else {
          console.log("Failed");
          this.temp=true;
          this.validBooking=false;
        }
      }
      this.temp = true;
    })

  }
  }  

  updateDate(){
        const tempStart: Date = new Date(this.request.startDate);
        tempStart.setDate(tempStart.getDate()+1);
        this.minDate = tempStart;
  }
  ngOnInit() {
  }

}
