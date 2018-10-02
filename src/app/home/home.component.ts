import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BOOKINGS } from '../mock-booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  bookings: any[];
  tempBookings:any[];
  test : boolean = true;
  constructor(private bookingService: BookingService) { }
  today: Date;
  ngOnInit() {
  	this.getBookings();
    const tempDate = new Date();
    this.today = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate()));
  }

  // Returns the bookings of a given user and displays the active bookings
  getBookings(): void{
  	this.bookingService.getBookingsByName('Robert')
  		.subscribe(b =>{
        this.bookings=b;
        for(var i=0;i<b.length;i++){
          b[i].endDate = new Date(b[i].endDate.seconds*1000);
          b[i].startDate = new Date(b[i].startDate.seconds*1000);
          if(b[i].endDate.getTime()<this.today.getTime()){
            b.splice(i,1);
            i--;
          }
      }  
  })
  }

  delete(name:string,env:string, start:Date,end:Date){
    this.bookingService.deleteBooking(name,env,start,end);
  }

}
