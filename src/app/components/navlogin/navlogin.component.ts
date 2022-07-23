import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navlogin',
  templateUrl: './navlogin.component.html',
  styleUrls: ['./navlogin.component.css']
})
export class NavloginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Salir de sesion del cliente
   */
  SignOut(): void { 
    localStorage.removeItem('per_cedula');
  }

}

