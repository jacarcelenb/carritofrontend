import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms'



@Component({
  selector: 'app-address-app',
  templateUrl: './address-app.component.html',
  styleUrls: ['./address-app.component.css']
})
export class AddressAppComponent implements OnInit {

  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };
  constructor() {

  }


  ngOnInit(): void {

  }







}


