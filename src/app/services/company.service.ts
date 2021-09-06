import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly companyUrl = 'http://localhost:8080/companies'

  constructor(private http: HttpClient) { }

  getCompanies(){
    return this.http.get<any>(this.companyUrl + "/all");
  }
  
}
