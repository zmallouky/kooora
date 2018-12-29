import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
   constructor(private http: HttpClient) { }
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
      this.http.post("http://localhost:3000/api/user/login", authData)
            .subscribe(response => {
               console.log(response); //show the token generated on backend/user.js
            });
   }
}