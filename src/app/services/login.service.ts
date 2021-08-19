import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy  {

  private readonly loginUrl = 'http://localhost:8080/auth/login'
  
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private router: Router) { }
  
  ngOnDestroy(): void {
    this.logout()
  }

  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  }

  login(username:string, password:string) {

    let o = {"username":"", "password":""};
    o.username = username;
    o.password = password;

    return this.http.post<any>(this.loginUrl, o).pipe(map( response => {
      localStorage.setItem("jwt", response.jwt);
      localStorage.setItem("username", username);
    },
      (error: any) => {
      console.log("Login failed.");
    }))
  }
  
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken() {
    return localStorage.retrieve('jwt');
  }
  
}
  
