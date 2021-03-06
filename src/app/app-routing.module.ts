import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UsertypeGuard } from './auth/usertype.guard';
import { CompanyeditComponent } from './components/companyedit/companyedit.component';
import { EditticketComponent } from './components/editticket/editticket.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ReservationspageComponent } from './components/reservationspage/reservationspage.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'main', component: MainpageComponent, canActivate: [AuthGuard]},
  {path: 'reservations', component: ReservationspageComponent, canActivate: [AuthGuard, UsertypeGuard]},
  {path: 'tedit/:id', component: EditticketComponent, canActivate: [AuthGuard]},
  {path: 'cedit/:id', component: CompanyeditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
