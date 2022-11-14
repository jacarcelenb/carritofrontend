import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapGeocoder, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddressService } from 'src/app/service/address.service';
import { SenderDataService } from 'src/app/service/sender-data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements AfterViewInit, OnInit {
  address = this.actRoute.snapshot.paramMap.get("address");
  positions: any[] = [];
  @ViewChild('inputPlaces')
  inputPlaces!: ElementRef;

  FindPlace: any
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  @ViewChild(GoogleMap)
  map!: google.maps.Map;
  @ViewChild(MapMarker) markerposition: MapMarker | undefined
  list_address: any[] = [];
  clickMap: boolean = false;


  centerPosition!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    title: "Usted está aquí"
  };

  markerPositions: google.maps.LatLngLiteral[] = [];


  newPoisiton: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    zoom: 17,
    fullscreenControl: false,
    disableDefaultUI: false,
    mapTypeControl: false,

  };

  apiLatitude: number = 0
  apiLongitude: number = 0


  constructor(public actRoute: ActivatedRoute,
    private addressService: AddressService,
    private router: Router,
    private geocoder: MapGeocoder) {
  }

  // TO DO
  // Crear un metodo para buscar la direccion
  // Validar la posicion obtenida
  // Tomar los datos de las direcciones con latitud y longitud
  // Probar
  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.addressService.getClientAddress().subscribe((data: any) => {
      this.list_address = data.Direcciones
      this.setLocation();
    })
  }

  findAddress() {
    console.log(this.address)
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
      if (this.list_address[index].dir_direccion == this.address) {
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
    this.inputPlaces.nativeElement.value = ""
    const place = this.findAddress()
    if (place.dir_latitud !=null && place.dir_longitud !=null) {
      this.inputPlaces.nativeElement.value = place.dir_direccion
      this.centerPosition = { lat: parseFloat(place.dir_latitud), lng: parseFloat(place.dir_longitud) }
      this.markerPositions.push({ lat: parseFloat(place.dir_latitud), lng: parseFloat(place.dir_longitud) })
    }else {
      this.markerPositions = []
      this.inputPlaces.nativeElement.value = ""
      this.geocoder.geocode({
        address: place.dir_direccion,
        region: 'EC',
        componentRestrictions: {
          country: 'EC'
        }
      }).subscribe((data: any) => {
        this.centerPosition = { lat: data.results[0].geometry.location.lat(), lng: data.results[0].geometry.location.lng() }
        this.inputPlaces.nativeElement.value = data.results[0].formatted_address
        this.markerPositions.push({ lat: data.results[0].geometry.location.lat(), lng: data.results[0].geometry.location.lng() })

      });

    }

  }


  addMarker(event: google.maps.MapMouseEvent) {
    console.log(this.markerPositions)
    this.markerPositions = []
    if (this.markerPositions.length == 0) {
      this.markerPositions.push(event.latLng!.toJSON());
    }
  }


  public handleAddressChange(address: Address) {
    console.log(address)
  }


  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.inputPlaces.nativeElement
    );
    console.log(searchBox)
    this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.inputPlaces!.nativeElement
    )

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places?.length == 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      console.log(places)
      this.FindPlace = places
      this.latitude = places![0].geometry?.location?.lat()
      this.longitude = places![0].geometry?.location?.lng()

      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)


        }
      })


      this.markerPositions.push({ lat: this.latitude!, lng: this.longitude! })

      if (this.markerPositions.length > 0) {
        this.newPoisiton.push(this.markerPositions[this.markerPositions.length - 1])
        console.log(this.newPoisiton)
        // vaciar la lista
        this.markerPositions = []
        console.log(this.markerPositions)
        this.markerPositions.push(this.newPoisiton[0])
        console.log(this.markerPositions)
        this.newPoisiton = []

      }
      this.map?.fitBounds(bounds)



    })
  }

  showValues() {
    console.log(this.markerposition?.getPosition()?.lat())
    console.log(this.markerposition?.getPosition()?.lng())

    const position = {
      latitude: this.markerposition?.getPosition()?.lat(),
      longitude: this.markerposition?.getPosition()?.lng()
    }



    this.positions.push(position)




  }

  SaveData() {
    let latitude: any
    let longitude: any
    const address = this.findAddress()

    if (this.positions.length > 0) {
      latitude =this.positions[this.positions.length - 1].latitude.toString()
      longitude = this.positions[this.positions.length - 1].longitude.toString()
      address.dir_latitud = latitude
      address.dir_longitud = longitude
    } else {
       latitude = this.markerposition?.marker?.getPosition()?.lat().toString()
       longitude = this.markerposition?.marker?.getPosition()?.lng().toString()

       address.dir_latitud = latitude
       address.dir_longitud = longitude

    }
    this.addressService.postAddress(address).subscribe((data: any) => {
      Swal.fire(
        'Información registrada correctamente',
        'Su dirección ha sido registrada',
        'success'
      )
      this.router.navigate(['/'])
    })
  }

}
