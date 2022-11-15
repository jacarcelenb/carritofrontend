import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapGeocoder, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
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
    private router: Router,
    private geocoder: MapGeocoder) { }

  centerPosition!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    title: "Usted está aquí"
  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  options: google.maps.MapOptions = {
    zoom: 17,
    fullscreenControl: false,
    disableDefaultUI: false,
    mapTypeControl: false,

  };




  ngOnInit(): void {
    if (this.ValidateAddress() == true) {
      this.setLocation()
    } else {
      this.router.navigate(['/'])
    }

  }

  ValidateAddress(): boolean {
    let validated = false;
    if (this.address!.length > 0 && this.client!.length > 0 && this.type!.length > 0) {
      validated = true
    }
    return validated
  }

  setLocation() {
    this.markerPositions = []
    this.geocoder.geocode({
      address: this.address,
      region: 'EC',
      componentRestrictions: {
        country: 'EC'
      }
    }).subscribe((data: any) => {
      console.log(data.results[0])
      this.centerPosition = { lat: data.results[0].geometry.location.lat(), lng: data.results[0].geometry.location.lng() }
      this.markerPositions.push({ lat: data.results[0].geometry.location.lat(), lng: data.results[0].geometry.location.lng() })

    });



  }



}
