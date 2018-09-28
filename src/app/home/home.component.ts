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
  test : boolean = true;
  constructor(private bookingServce: BookingService) { }

  ngOnInit() {
  	this.getBookings();
  }

  getBookings(): void{
  	this.bookingServce.getBookingsByName('Test2')
  		.subscribe(b =>{
        this.bookings=b;
        for(var i=0;i<b.length;i++){
          this.temp();
          b[i].endDate = new Date(b[i].endDate.seconds*1000);
          b[i].startDate = new Date(b[i].startDate.seconds*1000);
      }  
  })
  }

  temp(){
    console.log(this.test);
  }
}
