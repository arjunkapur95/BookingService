import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BOOKINGS } from '../mock-booking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  bookings = BOOKINGS;
   
  constructor() { }

  ngOnInit() {

  }
}
