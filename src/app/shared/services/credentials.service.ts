import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor() { }

  // port: string = "http://10.10.10.4/api";
  port: string = "http://10.10.10.4:8000/api"
  // port: string = "http://192.168.43.174:8000/api"

  userInformation(): IUserInformation {
    return {
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token")
    }
  }
}

interface IUserInformation {
  user: any;
  token: string | null;
}
