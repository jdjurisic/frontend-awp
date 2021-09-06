import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl = 'http://localhost:8080/users'
  
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  getNumberOfReservations(){
    return this.http.get<any>(this.userUrl + "/getByUsername/" + localStorage.getItem("username"));
  }

  getUserTypes(){
    return this.http.get<any>(this.userUrl + "/types");
  }

  createNewUser(user: any){
    return this.http.post<any>(this.userUrl, user);
  }
  

}
