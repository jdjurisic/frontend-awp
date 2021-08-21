import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  showMenuBar:boolean = false;
  isUserType:boolean = false;
  

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

  constructor(private authService: LoginService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.showMenuBar = true;
    }

    if(localStorage.getItem("usertype") != "ROLE_ADMIN"){
      this.isUserType = true;
    }
  }



}
