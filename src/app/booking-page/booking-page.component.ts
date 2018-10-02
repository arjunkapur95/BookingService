import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BOOKINGS } from '../mock-booking';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookingService } from '../booking.service';
import {Observable} from 'rxjs';


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
  temp = true;
  bookings : Observable<any[]>;
  val: any[];
  constructor(private bookingService: BookingService) { }

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
            console.log(this.temp);
            var notBooked = true;
            const tempStart = new Date(this.request.startDate);
            const tempEnd = new Date(this.request.endDate);

            this.bookingService.getBookingsByEnviroment(this.request.environment).subscribe(b =>{
                if(this.temp){
                  for(var i=0;i<b.length;i++){
                    console.log("Testing for ...... "+b[i].name);
                    const start = new Date(b[i].startDate.seconds*1000);
                    const end = new Date(b[i].endDate.seconds*1000);
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
                  }
                }
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
