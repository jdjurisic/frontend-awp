import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly flightUrl = 'http://localhost:8080/flights'

  constructor(private http: HttpClient) { }

  getFlights(){
    return this.http.get<any>(this.flightUrl + "/all");
  }
  
}
