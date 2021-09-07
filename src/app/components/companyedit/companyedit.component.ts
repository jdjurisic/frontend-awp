import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
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

  constructor(private companyService: CompanyService,private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private flightService:FlightService) { 
      
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
  }

  deleteCompany(){
    this.companyService.deleteCompanyById(this.company.id).subscribe(data =>{
      this.router.navigate(["/main"]);
    });
  }
  

}
