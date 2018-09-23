import { Injectable } from '@angular/core';
import { Booking } from './booking';
import { BOOKINGS } from './mock-booking';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  getBookings(): Observable<Booking[]>{
  	return of(BOOKINGS);
  }
  checkAvaliability(curr: Booking): Observable<boolean>{

    const tempStart: Date = new Date(curr.startDate);
    const tempEnd: Date = new Date(curr.endDate);

  	for(var b of BOOKINGS){
       if((tempStart.getTime()>b.startDate.getTime()&&tempStart.getTime()<b.endDate.getTime())||
       (tempEnd.getTime()>b.startDate.getTime()&&tempEnd.getTime()<b.endDate.getTime())){
          if(curr.environment==b.environment){
            return of(false);
          }
       	} 
      }
  	return of(true);
  }
}
