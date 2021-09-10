import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-companyedit',
  templateUrl: './companyedit.component.html',
  styleUrls: ['./companyedit.component.css']
})
export class CompanyeditComponent implements OnInit {

  isUserType:boolean = false;

  id: any;
  company: any;

  tickets: [] = [];

  createCompanyForm: FormGroup;
  editCompanyForm: FormGroup;

  constructor(private companyService: CompanyService,private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private flightService:FlightService,
    private reservationService: ReservationService) { 
    
    this.createCompanyForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.editCompanyForm = new FormGroup({
      editedname: new FormControl('', Validators.required)
    });
      
    this.route.params.subscribe( params => {
      this.id = params.id;
      console.log(params);
      console.log(this.id);
    } );

    this.companyService.getCompanyById(this.id).subscribe(data =>{
      this.company = data;
    },
    (error =>{
      alert("Failed to load company. Try again.");
    }))

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

        }

        this.companyService.getTicketsForCompany(this.id).subscribe(data =>{
          this.tickets = data;
        });


  }

  deleteCompany(){
    this.companyService.deleteCompanyById(this.company.id).subscribe(data =>{
      this.router.navigate(["/main"]);
    });
  };

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
  
  editCompanyName(){

    if(!this.editCompanyForm.valid){
      alert("Invalid input.");
      return;
    };

    let cmp = {
      "id": this.id,
      "name": this.editCompanyForm.get('editedname').value
    };

    this.companyService.editCompany(cmp).subscribe(data =>{
      alert("Company successfully edited.");
    },
    (error =>{
      alert("Something's wrong. Try again. Name has to be unique.")
    }));

  }

  createNewCompany(){

    if(!this.createCompanyForm.valid){
      alert("Invalid input.");
      return;
    };

    let nm = this.createCompanyForm.get('name').value;

    this.companyService.createCompany(nm).subscribe(data =>{
      alert("Company successfully created.");
    },
    (error =>{
      alert("Fail. Try again. Name has to be unique.")
    }));
  }

}
