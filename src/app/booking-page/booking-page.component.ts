import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookingService } from '../booking.service';
import {Observable} from 'rxjs';

import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  validBooking = true;
  submitted = true; 
  minDate = new Date();
  request = {} as any;
  environments=['Dev','Test','SIT','UAT','Prod'];
  today = new Date();
  temp = true;

  //NgbCalendar
  model: NgbDateStruct;
  date: {year: number, month: number};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private bookingService: BookingService, private calendar: NgbCalendar, ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

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
        for(var i=0;i<b.length;i++){
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
          this.validBooking=false;
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



  //Ngbcalendar stuff

  
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }


  isDisabled(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return date.day==10 || d.getDay() === 0 || d.getDay() === 6;
  }
}
