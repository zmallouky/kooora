import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // function creating a new user with email and pwd set into signup form
  createUser(email: string, password: string) { // method to create user
    const authData: AuthData = { email: email, password: password }; //create user object with interface
    this.http.post("http://localhost:3000/api/user/signp", authData)
      .subscribe(response => { // response that we are listening on from the emit
        console.log(response); //show the new user create on backend/user.js
        this.router.navigate(['/login']);
        alert('user created');
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  // function connecting a user with email and pwd set into login form
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }; //create user object with interface
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        //console.log(response); //show the token generated on backend/user.js
        const token = response.token;
        this.token = token;
        if (token) { // set the expiration time for the token for the first time
          const expiresInDuration = response.expiresIn;
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate); //save on borwser storage to use it when we reload
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) { // declenche the timer
    console.log("setting timer : " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout(); // logout on 1h
    }, duration * 1000); // sec to ms
  }

  private saveAuthData(token: string, expirationDate: Date) { //save authentifcation data on local storage
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() { //clear the auth data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  autoAuthUser() { //authentifacte user from local storage lanched automoaticly on app componenet
    const authInformation = this.getAuthData();
    if (!authInformation) { // if we are not login no need to continue
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); // get left time on ms for the token expiration
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); // convert ms to sec 
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() { // get oken and timer from the local storage
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}