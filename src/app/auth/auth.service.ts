import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {JwtResponse} from "./jwt-response";
import {LoginInfo} from "./login-info";
import {SignUpInfo} from "./signup-info";
import {environment} from "../../environments/environment";
import {UtilService} from "../util.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  attemptLogin(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/login`, credentials, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }

  register(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/register`, info, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }

  constructor(private http: HttpClient) { }
}
