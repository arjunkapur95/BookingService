import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/auth.service';
import {MatSnackBar} from '@angular/material';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit{

  validBooking = true;
  submitted = true; 
  request = {} as any;
  environments=['Dev','Test','SIT','UAT','Prod'];
  today = new Date();
  testBookings = [];
  bookingOwner=[];
  selectedOwner:null;
  selectedFrom:Date;
  selectedTo:Date;

  //NgbCalendar
  model: NgbDateStruct;
  date: {year: number, month: number};
  minDate = {year : this.today.getFullYear, month : this.today.getMonth, day:this.today.getDate};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private bookingService: BookingService,
     private calendar: NgbCalendar,
    private authService:AuthService,
    public snackbar: MatSnackBar ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.request.environment="";
    this.request.email=this.authService.currentUserEmail;
    this.request.name=this.authService.currentUserName;
    console.log(this.request.name);

   }
  
  /**
   * Checks if booking for an environment is free
   * Creates booking if the slot is free
   */

  makeBooking() {
    if(this.request.environment==""){
      this.submitted = false;
    } else {
      var notBooked = true;
      const tempStart = new Date(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      const tempEnd = new Date(this.toDate.year,this.toDate.month-1,this.toDate.day);


      for(var i=0;i<this.testBookings.length;i=i+2){
        if(tempStart.getTime()>=this.testBookings[i].getTime()
          && tempStart.getTime()<=this.testBookings[i+1].getTime() 
          || tempEnd.getTime()>=this.testBookings[i].getTime() 
          && tempEnd.getTime()<=this.testBookings[i+1].getTime()
          ||tempStart.getTime()<=this.testBookings[i].getTime()
          && tempEnd.getTime()>=this.testBookings[i+1].getTime()){
            notBooked = false;
          }
        }
                               
        if(notBooked){
          console.log("Making booking");
          this.bookingService.makeBooking(this.request.email,this.request.name,this.request.environment,tempStart,tempEnd);
          this.openSnackBar();

        } else {
          console.log("Failed");
          this.validBooking=false;
        }
      }


  }
  
 

  ngOnInit() {
  }
  /**
   * Grabs list of bookings for the selected environment for display
   */
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
        this.bookingOwner.push(b[i].name);
        }
    });  
  }


  //Ngbcalendar stuff

  /**
   * Updates values when a date is selected in the date picker
   * @param date Selected date
   */
  onDateSelection(date: NgbDate) {
    this.selectedOwner = null;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else if (this.fromDate && !this.toDate && date.equals(this.fromDate)){
      this.toDate = date; 
    } else {
      this.toDate = null;
      this.fromDate = date;  
    }
    this.getBookingOwner(date);
  
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

  /**
   * Checks if a date is currently booked
   * @param date 
   */
  isBooked(date: NgbDate){
    var tempDate = new Date(date.year,date.month-1,date.day);

    for(var i=0;i<this.testBookings.length;i=i+2){
        if(tempDate.getTime()>=this.testBookings[i].getTime()&&tempDate.getTime()<=this.testBookings[i+1].getTime()){
          return true;
        }
    }
    return false;
  }

  /**
   * Returns the owner of the booking if a date is booked
   * @param date 
   */
  getBookingOwner(date: NgbDate){
  var tempDate = new Date(date.year,date.month-1,date.day);

    for(var i=0;i<this.testBookings.length;i=i+2){
        if(tempDate.getTime()>=this.testBookings[i].getTime()
        &&tempDate.getTime()<=this.testBookings[i+1].getTime()){
          if(i%2==1){
            i--;
          }
          this.selectedOwner = this.bookingOwner[i/2];
          this.selectedFrom =this.testBookings[i];
          this.selectedTo = this.testBookings[i+1];
          return true;    
        }
    }
  }

  /**
   * Opens the snackbar to confirm the booking
   */
  openSnackBar(){
    this.snackbar.openFromComponent(BookingConfirmationComponent,{
      duration:1500,
    })
  }



}



@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
})
export class BookingConfirmationComponent{}