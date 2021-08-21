import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  showMenuBar:boolean = false;
  isUserType:boolean = false;

  // right corner data
  typeOfUser: string;
  numberOfReservations: number;
  username: string;
  

  userRoutes = [
    {linkName: 'Main Page', url: '/main'},
    {linkName: 'Ticket Table', url: '/table'},
    {linkName: 'Airline Info', url:'/airline'}
  ]

  adminRoutes = [
    {linkName: 'AMain Page', url: '/main'},
    {linkName: 'ATicket Table', url: '/table'},
    {linkName: 'AAirline Info', url:'/airline'}
  ]

  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.showMenuBar = true;
    }

    if(localStorage.getItem("usertype") != "ROLE_ADMIN")
    {
      this.isUserType = true;
      this.typeOfUser = "user";
    }
    else
    {
      this.typeOfUser = "admin";
    }

    this.username = localStorage.getItem("username");

    // TODO implement backend call
    this.numberOfReservations = 69;

    
  }

  logoutButton(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }


}
