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

  getAllTickets(pageNumber: any){
    return this.http.get<any>(this.ticketUrl + "/all/" + pageNumber);
  }

  getOnewayTickets(pageNumber: any){
    return this.http.get<any>(this.ticketUrl + "/oneway/" + pageNumber);
  }

  getRoundtripTickets(pageNumber: any){
    return this.http.get<any>(this.ticketUrl + "/roundtrip/" + pageNumber);
  }

  deleteTicketById(id: string){
    return this.http.delete<any>(this.ticketUrl + "/" + id);
  }

  getTicketById(id: string){
    return this.http.get<any>(this.ticketUrl + "/" + id);
  }

  editTicket(ticket: any){
    return this.http.put<any>(this.ticketUrl + "/" + ticket.id, ticket);
  }

}
