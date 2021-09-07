import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly reservationUrl = 'http://localhost:8080/reservations'

  constructor(private http: HttpClient) { }

  makeReservation(broj: string, ticket: any){
    return this.http.get<any>(this.reservationUrl + "/" + ticket.id + "/" + broj);
  }

  cancelReservation(broj: string){
    return this.http.delete<any>(this.reservationUrl + "/" + broj);
  }
}
