import { Component, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-address-type-map',
  templateUrl: './address-type-map.component.html',
  styleUrls: ['./address-type-map.component.css']
})
export class AddressTypeMapComponent implements OnInit {

  address = this.actRoute.snapshot.paramMap.get("address");
  client = this.actRoute.snapshot.paramMap.get("client");
  type = this.actRoute.snapshot.paramMap.get("type");
  constructor(public actRoute: ActivatedRoute,
    private addressService: AddressService,
    private router: Router,
    private geocoder: MapGeocoder) { }

  ngOnInit(): void {
    console.log(this.address)
    console.log(this.client)
    console.log(this.type)
  }

}
