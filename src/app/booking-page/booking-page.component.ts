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
export class BookingPageComponent implements OnInit{

  validBooking = true;
  submitted = true; 
  minDate = new Date();
  request = {} as any;
  environments=['Dev','Test','SIT','UAT','Prod'];
  today = new Date();
  temp = true;
  testBookings = [];

  //NgbCalendar
  model: NgbDateStruct;
  date: {year: number, month: number};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private bookingService: BookingService, private calendar: NgbCalendar, ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.request.environment="";
    this.request.name="";

   }
   
  makeBooking() {
    if(this.request.environment==""||
      this.request.name==""){
      this.submitted = false;
    } else {
      var notBooked = true;
      const tempStart = new Date(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      const tempEnd = new Date(this.toDate.year,this.toDate.month-1,this.toDate.day);

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

  envChanged(){
    this.testBookings=[];
    this.bookingService.getBookingsByEnviroment(this.request.environment).subscribe(b=>{
      for(var i=0;i<b.length;i++){

        const start = new Date(b[i].startDate.seconds*1000);
        start.setHours(0);
        const end = new Date(b[i].endDate.seconds*1000);
        end.setHours(0);
        this.testBookings.push(start);
        this.testBookings.push(end);
        }
    });  
  }


  //Ngbcalendar stuff

  
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else if (this.fromDate && !this.toDate && date.equals(this.fromDate)){
      this.toDate = date; 
      console.log("test");
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

  isBooked(date: NgbDate){
  var tempDate = new Date(date.year,date.month-1,date.day);

  for(var i=0;i<this.testBookings.length;i=i+2){
      if(tempDate.getTime()>=this.testBookings[i].getTime()&&tempDate.getTime()<=this.testBookings[i+1].getTime()){
        return true;
      }
  }
  }
}
