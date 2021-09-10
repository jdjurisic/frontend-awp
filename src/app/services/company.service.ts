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

  getCompanyById(id: string){
    return this.http.get<any>(this.companyUrl + "/" + id);
  }

  deleteCompanyById(id: string){
    return this.http.delete<any>(this.companyUrl + "/" + id);
  }
  
  getTicketsForCompany(id: string){
    return this.http.get<any>(this.companyUrl + "/tickets/" + id);
  }

  createCompany(name: string){
    let cmp = {
      "name":name
    };

    return this.http.post<any>(this.companyUrl,cmp);
  }

  editCompany(comp: any){
    return this.http.put<any>(this.companyUrl, comp);
  }

}
