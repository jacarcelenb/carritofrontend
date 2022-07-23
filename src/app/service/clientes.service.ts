import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ModelCliente} from '../model/model.cliente';
import { catchError, Observable, retry,throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    private url = "https://app-backend-sh-cart.herokuapp.com/clientes";

    getAllClientes(): Observable<ModelCliente[]> {
        return this.http.get<ModelCliente[]>(this.url);
    }
    getClienteById(id:any): Observable<ModelCliente> {
        return this.http.get<ModelCliente>(this.url +"/id/"+ id);
    }
    
    public getClientsByCedula(cedula: any) {
        return this.http.get(this.url+"/cedula/"+cedula);
    }
   
    updateCliente(id: any,cliente:any){
        return this.http.put<ModelCliente>(this.url +"/id/"+id, cliente);
    }
    deleteCliente(id: any,cliente:any){
        const urlb = "https://app-backend-sh-cart.herokuapp.com/clientes/delete/id/"+id;
        return this.http.put<ModelCliente>(urlb,cliente);
    }

    public getCivilStates() {
        let url = "https://app-sh-cart-mongo.herokuapp.com/states";
        return this.http.get(url);
    }

    public getCities() {
        let url = "https://app-sh-cart-mongo.herokuapp.com/cities";
        return this.http.get(url);
    }

    public Login(){
        let url = "https://app-backend-sh-cart.herokuapp.com/login";
        return this.http.get(url);
    }

    public postClients(persona: any) {
        return this.http.post(this.url, JSON.stringify(persona),this.httpOptions).pipe(retry(1),
            catchError(this.handleError))
    }

    
    // Manejo de errores
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
    
   


}
