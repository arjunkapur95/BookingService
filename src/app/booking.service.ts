import { Injectable } from '@angular/core';
import { Booking } from './booking';
import { BOOKINGS } from './mock-booking';
import {Observable, of} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private booked;
  private db;
  constructor(dbTemp: AngularFirestore) { 
      this.db = dbTemp;
  }

  getBookings(): Observable<Booking[]>{
  	return of(BOOKINGS);
  }

  getBookingsByName(name: string): Observable<any[]>{
    return  this.db.collection('/items',ref=>ref.where('name','==',name).orderBy('startDate')).valueChanges();
  }

  getBookingsByEnviroment(env: string): Observable<any[]>{
    return  this.db.collection('/items',ref=>ref.where('environment','==',env)).valueChanges();
  }

  makeBooking(name :string, env: string, start: Date, end: Date){
      var data = {
      startDate: start,
      endDate: end,
      name: name,
      environment: env,
    };
    var setDoc = this.db.collection('/items').doc(name).set(data);
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

  checkAvaliabilityFirestore(name :string, env: string, targetStart: Date, targetEnd: Date): boolean{
    this.booked = false;
    var bookings : any[];
    this.getBookingsByEnviroment(env).subscribe(b =>{
        bookings=b;
        for(var i=0;i<b.length;i++){
          const start = new Date(b[i].startDate.seconds*1000);
          const end = new Date(b[i].endDate.seconds*1000);
          console.log("Old start is : "+start.getTime());
          console.log("New start is : "+targetStart.getTime());

          console.log("Old end is : "+end.getTime());
          console.log("New end is : "+targetEnd.getTime());
          if(targetStart.getTime()<start.getTime() && targetEnd.getTime()<start.getTime() 
            || targetStart.getTime()>end.getTime() && targetEnd.getTime()>end.getTime()){
            this.booked = true;
          }
      }  
  })
   return this.booked;
  }


}
