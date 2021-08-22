import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  time: Date; // global variable for string interpolation on html

  constructor() { }

  ngOnInit(): void {
    this.getCurrentDate();
  }

  getCurrentDate() {
    setInterval(() => {
    this.time = new Date();
    }, 1000);
  }



}
