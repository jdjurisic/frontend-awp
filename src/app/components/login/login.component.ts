import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showErrorMessage!: boolean;

  username: string;
  password: string;

  constructor(private authService: LoginService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', Validators.required)
    });
    this.showErrorMessage = false;
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.username = this.loginForm.get('username')!.value;
    this.password = this.loginForm.get('password')!.value;

    this.authService.login(this.username, this.password).subscribe(data =>{
      if(this.authService.isLoggedIn){
        this.showErrorMessage = false;
        this.router.navigate(['/main']);
      }
    },
    error =>
    {
      this.authService.logout();
      this.showErrorMessage = true;
      this.router.navigate(['/login']);
    }
    
    );
  }

}