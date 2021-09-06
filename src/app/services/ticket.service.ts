import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly ticketUrl = 'http://localhost:8080/tickets'

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  createNewTicket(ticket: any){
    return this.http.post<any>(this.ticketUrl, ticket);
  }

  getAllTickets(){
    return this.http.get<any>(this.ticketUrl + "/all");
  }
}
