import { Booking } from './booking';

export const BOOKINGS: Booking [] = [
	{ startDate: new Date(" February 4, 2018"), endDate: new Date("March 4, 2018"), name: 'Joe', environment: "Dev"},
	{ startDate: new Date(" April 4, 2018"), endDate: new Date("May 4, 2018"), name: 'Mat', environment: "Dev"},
	{ startDate: new Date(" September 4, 2018"), endDate: new Date("October 4, 2018"), name: 'Joe', environment: "Test"},
	{ startDate: new Date(" November 4, 2018"), endDate: new Date("January 4, 2019"), name: 'Rob', environment: "Test"},
	{ startDate: new Date(" Feburary 4, 2019"), endDate: new Date("March 4, 2019"), name: 'Joe', environment: "SIT"},
	{ startDate: new Date(" April 4, 2019"), endDate: new Date("July 4, 2019"), name: 'Joe', environment: "SIT"},
];
