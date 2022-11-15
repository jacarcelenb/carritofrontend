import { Component, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-address-type-map',
  templateUrl: './address-type-map.component.html',
  styleUrls: ['./address-type-map.component.css']
})
export class AddressTypeMapComponent implements OnInit {

  client = this.actRoute.snapshot.paramMap.get("client");
  type = this.actRoute.snapshot.paramMap.get("type");

  list_address: any[] = [];
  correctAddress: boolean = false;
  constructor(public actRoute: ActivatedRoute,
    private addressService: AddressService,
    private router: Router,
    private geocoder: MapGeocoder) { }

  centerPosition : google.maps.LatLngLiteral = { lat: 0.362678, lng: -78.1307}

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
      this.getAddress()
    }

  }

  ValidateAddress(): boolean {
    let validated = false;
    if ( this.client!.length > 0 && this.type!.length > 0) {
      validated = true
    }
    return validated
  }

  getAddress() {
    this.addressService.getClientAddress().subscribe((data: any) => {
      this.list_address = data.Direcciones
      this.setLocation();
    })
  }

  findAddress() {
    const location = {
      dir_cliente: "",
      dir_tipo_direccion: "",
      dir_direccion: "",
      creacion_usuario: "",
      creacion_fecha: "",
      modifica_usuario: "",
      modifica_fecha: "",
      dir_latitud: "",
      dir_longitud: ""
    }

    for (let index = 0; index < this.list_address.length; index++) {
      if (this.list_address[index].dir_cliente == this.client && this.list_address[index].dir_tipo_direccion == this.type) {
        this.correctAddress = true;
        location.dir_cliente = this.list_address[index].dir_cliente;
        location.dir_direccion = this.list_address[index].dir_direccion;
        location.dir_tipo_direccion = this.list_address[index].dir_tipo_direccion;
        location.creacion_usuario = this.list_address[index].creacion_usuario;
        location.creacion_fecha = this.list_address[index].creacion_fecha;
        location.modifica_fecha = this.list_address[index].modifica_fecha;
        location.modifica_usuario = this.list_address[index].modifica_usuario;
        location.dir_latitud = this.list_address[index].dir_latitud;
        location.dir_longitud = this.list_address[index].dir_longitud;

      }
    }
    return location
  }

  setLocation() {
    this.markerPositions = []
    const place = this.findAddress()
    if (place.dir_latitud != null && place.dir_longitud != null && this.correctAddress == true) {
      this.centerPosition = { lat: parseFloat(place.dir_latitud), lng: parseFloat(place.dir_longitud) }
      this.markerPositions.push({ lat: parseFloat(place.dir_latitud), lng: parseFloat(place.dir_longitud) })
    }
  }


}
