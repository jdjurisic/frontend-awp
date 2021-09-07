import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.css']
})
export class EditticketComponent implements OnInit {

  private id!: string;
  ticket: any;

  companies: [] = [];
  flights: [] = [];

  editTicketForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private flightService:FlightService,
    private companyService:CompanyService) { 
      
    this.route.params.subscribe( params => {
      this.id = params.id;
      console.log(params);
      console.log(this.id);
    } );

    this.ticketService.getTicketById(this.id).subscribe(data =>{
      this.ticket = data;
    },
    (error =>{
      alert("Can't load ticket. Try again.")
    }));

    this.companyService.getCompanies().subscribe(data =>{
      this.companies = data;
    });

    this.flightService.getFlights().subscribe(data =>{
      this.flights = data;
    });

    this.editTicketForm = new FormGroup({
      company: new FormControl(''),
      oneway: new FormControl(''),
      departureDate: new FormControl(''),
      returnDate: new FormControl(''),
      flight: new FormControl(''),
      count: new FormControl('')
    });

  }

  ngOnInit(): void {

  }
  
  editTicket(){
    
    let komp = this.editTicketForm.get('company').value;
    let vanway = this.editTicketForm.get('oneway').value;
    let flajt = this.editTicketForm.get('flight').value;
    let broj = this.editTicketForm.get('count').value;
    let polazak = this.editTicketForm.get('departureDate').value;
    let povratak = this.editTicketForm.get('returnDate').value;

    if(komp)    this.ticket.company = komp;
    if(vanway)  this.ticket.oneway = vanway;
    if(flajt)   this.ticket.flight = flajt;
    if(broj)    this.ticket.count = broj;
    if(polazak) this.ticket.departureDate = polazak;
    if(povratak)this.ticket.returnDate = povratak;

    this.ticketService.editTicket(this.ticket).subscribe(data =>{
      alert("Successfully updated.");
      this.editTicketForm.reset();
    },
    (error =>{
      alert("Ticket wasn't updated. Try again");
    }))
  
  }

  resetForm(){
    this.editTicketForm.reset();
  }

}
