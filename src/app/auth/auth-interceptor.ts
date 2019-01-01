import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService) { }  //inject auth service to this service so we can call gettoken to get the token

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //https://apifootball.com/api/
    const authToken = this.authservice.getToken(); //get token from service
    console.log(authToken);
    if (req.url.search("https://apifootball.com/") === -1) { // avoid cors probleme if we use api we should remove it later
      const authRequest = req.clone({ //clone the request to avoid chainging  the original request
        headers: req.headers.set('Authorization', "Bearer " + authToken) //add a new value on header request that contains the token
      });
      return next.handle(authRequest);//allow request to continue running 
    }
    return next.handle(req);//ignore filtring api football we should remove it later
  }
}