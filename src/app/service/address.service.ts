import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as vars from '../../../variables'
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
    console.log(vars.VARS.url)
  }
  url = " /oriondir/api/direcciones/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AddrHdr': vars.VARS.headerToken,
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Allow": "GET, POST, OPTIONS, PUT, DELETE"

    })


  }


  public getClientAddress(cliente: any , username: any) {
    return this.http.get(this.url+""+cliente+"?"+"username="+username, this.httpOptions);
  }

  public postAddress(address: any){
    return this.http.post(this.url+"create", JSON.stringify(address) ,this.httpOptions);
  }
}
