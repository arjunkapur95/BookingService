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
  bookings: Booking[];
   
  constructor(private bookingServce: BookingService) { }

  ngOnInit() {
  	this.getBookings();
  }

  getBookings(): void{
  	this.bookingServce.getBookings()
  		.subscribe(bookings=>this.bookings=bookings);
  }
}
