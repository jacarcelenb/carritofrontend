import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  url = " /oriondir/api/direcciones/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AddrHdr': '123MutImb987.',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers":"X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Allow": "GET, POST, OPTIONS, PUT, DELETE"

    })
  }


  public getClientAddress() {
    return this.http.get(this.url+"1344597?username=12333", this.httpOptions);
  }

  public postAddress(address: any){
    return this.http.post(this.url+"create", JSON.stringify(address) ,this.httpOptions);
  }
}
