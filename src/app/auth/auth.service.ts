import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthService {
   private token: string;
   private authStatusListener = new Subject<boolean>();

   constructor(private http: HttpClient) { }

   getToken() {
      return this.token;
   }
   getAuthStatusListener() {
      return this.authStatusListener.asObservable();
   }

   // function creating a new user with email and pwd set into signup form
   createUser(email: string, password: string) { // method to create user
      const authData: AuthData = { email: email, password: password }; //create user object with interface
      this.http.post("http://localhost:3000/api/user/signp", authData)
         .subscribe(response => { // response that we are listening on from the emit
            console.log(response); //show the new user create on backend/user.js
         });
   }

   // function connecting a user with email and pwd set into login form
   login(email: string, password: string) {
      const authData: AuthData = { email: email, password: password }; //create user object with interface
      this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authData)
         .subscribe(response => {
            //console.log(response); //show the token generated on backend/user.js
            const token = response.token;
            this.token = token;
            this.authStatusListener.next(true);
         });
   }
}