import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservationspage',
  templateUrl: './reservationspage.component.html',
  styleUrls: ['./reservationspage.component.css']
})
export class ReservationspageComponent implements OnInit {

  reservations: any[] = [];

  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getNumberOfReservations().subscribe(data =>{
      this.reservations = data.reservations;
      let i;
      for(i=0; i< this.reservations.length; i++){
        console.log(this.reservations[i]);
      }
    },
    error =>{
      this.reservations = [];
    });

  }


  
}
