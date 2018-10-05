import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private db;
  constructor(dbTemp: AngularFirestore) { 
      this.db = dbTemp;
  }

  getBookingsByName(name: string): Observable<any[]>{
    return  this.db.collection(name,ref=>ref.where('name','==',name)).valueChanges();
  }

  getBookingsByEnviroment(env: string): Observable<any[]>{
    return  this.db.collection('masterList',ref=>ref.where('environment','==',env)).valueChanges();
  }

  deleteBooking(name:string,env: string, start: Date, end: Date){
    this.db.collection('masterList').doc(name+env+start.getTime()+start.getTime()).delete();
    this.db.collection(name).doc(name+env+start.getTime()+start.getTime()).delete();
  }
  makeBooking(name :string, env: string, start: Date, end: Date){
      var data = {
      startDate: start,
      endDate: end,
      name: name,
      environment: env,
    };
    var docName = name+env+start.getTime()+start.getTime();
    var setDoc = this.db.collection('masterList').doc(docName).set(data);

    var setDoc = this.db.collection(name).doc(docName).set(data);
  }


}
