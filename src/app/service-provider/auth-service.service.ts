import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  public isLoggedIn() : boolean{
    return localStorage.getItem('token') ? true : false
  }
}
