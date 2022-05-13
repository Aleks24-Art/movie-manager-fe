import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { LoginInfo } from '../auth/login-info';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, public tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptLogin(this.loginInfo).subscribe(
      data => {
        console.log(data);
        console.log(data.accessToken);
        this.tokenStorage.saveToken(data.accessToken);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.goToFilms();
      },
      error => {
        console.log(error);
        alert(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  goToFilms() {
    this.router.navigate(['films'])
  }
}
