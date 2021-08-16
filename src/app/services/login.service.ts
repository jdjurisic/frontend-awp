import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy  {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn1() {
    return this.loggedIn.asObservable();
  }

  private readonly loginUrl = 'http://localhost:8080/auth/login'
  
  constructor(private http: HttpClient) { }
  
    ngOnDestroy(): void {
      this.logout()
    }

    logout(){
      this.loggedIn.next(false);
      localStorage.removeItem("jwt")
      localStorage.removeItem("username")
    }
  
    login(username:string, password:string) {
      localStorage.setItem("username", username)
      let httpParams = new HttpParams()
      httpParams.append("username", username)
      httpParams.append('password', password)
      return this.http.post<string>(this.loginUrl, httpParams
        ).pipe(map( (response => {
          this.loggedIn.next(true);
          window.localStorage.setItem("jwt", response);
      })))
    }
    
    isLoggedIn(): boolean {
      return this.getJwtToken() != null;
    }

    getJwtToken() {
      return window.localStorage.retrieve('jwt');
    }
    
  }
  
