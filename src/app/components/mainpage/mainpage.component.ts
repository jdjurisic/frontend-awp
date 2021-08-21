import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  isUserType:boolean = false;

  constructor() { }

  ngOnInit(): void {

    if(localStorage.getItem("usertype") != "ROLE_ADMIN"){
      this.isUserType = true;
    }
    
  }

}
