import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  isUserType:boolean = false;

  createUserForm: FormGroup;
  createTicketForm: FormGroup;

  backendUserTypes: String[];
  companies: [] = [];
  flights: [] = [];
  tickets: [] = [];

  maxPage: number;
  currentPage: number;

  ticketTypeFilter:string[] = ["all", "oneway", "roundtrip"];
  selectedType:string = "all";


  constructor(private userService:UserService, private flightService:FlightService, private companyService:CompanyService, private ticketService:TicketService, private reservationService: ReservationService,   private router: Router ) { 
    this.createUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('',Validators.required)
    });

    this.createTicketForm = new FormGroup({
      company: new FormControl('', Validators.required),
      oneway: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      returnDate: new FormControl(''),
      flight: new FormControl('', Validators.required),
      count: new FormControl('', Validators.min(1))
    });
  }

  ngOnInit(): void {

    // user
    if(localStorage.getItem("usertype") != "ROLE_ADMIN"){
      this.isUserType = true;
    }

    // admin
    else 
    {
      this.isUserType = false;

      this.userService.getUserTypes().subscribe(data =>{
        this.backendUserTypes = data;
      });

      this.companyService.getCompanies().subscribe(data =>{
        this.companies = data;
      });

      this.flightService.getFlights().subscribe(data =>{
        this.flights = data;
      });
    }

    // both
    this.ticketService.getAllTickets(0).subscribe(data =>{
      this.tickets = data.content;
      this.maxPage = data.totalPages;
      this.currentPage = 0;
    });

  }


  createUser(){

    if(!this.createUserForm.valid){
      alert("Invalid input.");
      return;
    }
    
    let usrname = this.createUserForm.get('username')!.value;
    let pswd = this.createUserForm.get('password')!.value;
    let tp = this.createUserForm.get('usertype')!.value;
  
    let user = {
      "username": usrname,
      "password": pswd,
      "type": tp
    };
  
    this.userService.createNewUser(user).subscribe(data => {
      alert("User successfully created.");
    },
    (error => {
      alert("User wasn't created. Try again");
    }));

    this.createUserForm.reset();
  }

  createTicket(){

    if(!this.createTicketForm.valid){
      alert("Invalid input.");
      return;
    };

    let komp = this.createTicketForm.get('company')!.value;
    let vanway = this.createTicketForm.get('oneway')!.value;
    let flajt = this.createTicketForm.get('flight')!.value;
    let broj = this.createTicketForm.get('count')!.value;
    let polazak = this.createTicketForm.get('departureDate')!.value;
    let povratak = this.createTicketForm.get('returnDate').value;

    let ticket = {
      "company": komp,
      "oneway": vanway,
      "departureDate": polazak,
      "returnDate": povratak,
      "flight": flajt,
      "count": broj
    };

    this.ticketService.createNewTicket(ticket).subscribe(data =>{
      alert("Ticket successfully created.");
    },
    (error =>{
      alert("Ticket wasn't created. Try again");
    }));

    this.createTicketForm.reset();

  }

  reserve(i: any, tick:any){

    let noOfTickets = (<HTMLInputElement>document.getElementById(i)).value;

    this.reservationService.makeReservation(noOfTickets,tick).subscribe(data =>{
      alert("Successfull reservation.");
      this.ngOnInit();
    },
    (error =>{
      alert("Reservation failed.");
    }));

  }

  deleteTicket(tick: any){
    this.ticketService.deleteTicketById(tick.id).subscribe(data =>{
      alert("Successfully deleted.");
      this.ticketService.getAllTickets(0).subscribe(data =>{
        this.tickets = data.content;
      });
    },
    (error =>{
      alert("Delete failed.");
    }))

  }


  editTicket(tick: any){
    this.router.navigate(["/tedit/"+tick.id]);
  }

  paginateBack(){
    if(this.currentPage > 0){
      this.currentPage --;
    }

    if(this.selectedType == "all"){
      this.ticketService.getAllTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;
      });
    }
    else if(this.selectedType == "oneway"){
      this.ticketService.getOnewayTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;
      });
    }
    else if(this.selectedType == "roundtrip"){
      this.ticketService.getRoundtripTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;
      });
    }
  }

  paginateNext(){
    if(this.currentPage < this.maxPage - 1){
      this.currentPage ++;
    }

    if(this.selectedType == "all"){
      this.ticketService.getAllTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;
      });
    }
    else if(this.selectedType == "oneway"){
      this.ticketService.getOnewayTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;
      });
    }
    else if(this.selectedType == "roundtrip"){
      this.ticketService.getRoundtripTickets(this.currentPage).subscribe(data =>{
        this.tickets = data.content;

      });
    }

  }

  radioChangedHandler(event:any){
    this.selectedType = event.target.value;
    console.log(this.selectedType);
    if(this.selectedType == "all"){
      this.ticketService.getAllTickets(0).subscribe(data =>{
        this.tickets = data.content;
        this.maxPage = data.totalPages;
        this.currentPage = 0;
      });
    }
    else if(this.selectedType == "oneway") {
      this.ticketService.getOnewayTickets(0).subscribe(data =>{
        this.tickets = data.content;
        this.maxPage = data.totalPages;
        this.currentPage = 0;
      });
    }
    else if(this.selectedType == "roundtrip"){
      this.ticketService.getRoundtripTickets(0).subscribe(data =>{
        this.tickets = data.content;
        this.maxPage = data.totalPages;
        this.currentPage = 0;
      });
    }
  }
}
