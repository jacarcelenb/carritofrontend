import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms'
import { GoogleMap, MapGeocoder, MapMarker } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SenderDataService } from 'src/app/service/sender-data.service';




@Component({
  selector: 'app-address-app',
  templateUrl: './address-app.component.html',
  styleUrls: ['./address-app.component.css']
})
export class AddressAppComponent implements AfterViewInit, OnInit{
  @ViewChild('inputPlaces')
  inputPlaces!: ElementRef;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  @ViewChild(GoogleMap) map: GoogleMap | undefined;
  @ViewChild(MapMarker) markerposition: MapMarker | undefined

  formattedaddress = " ";
  option = {
    componentRestrictions: {
      country: ["AU"]
    }
  }
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    center: { lat: -1.831239, lng: -78.183406 },
    zoom: 4,
    fullscreenControl: false
  };
  constructor(private SenderDataService: SenderDataService) {
  }
  ngOnInit(): void {
   this.formattedaddress = "fadfasdfasdfasdfasdfasdfasdfas"
  }

  selectDireccion() {


    this.SenderDataService.sender.emit({
      data: this.formattedaddress
    })

  }
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address
  }
  addMarker(event: google.maps.MapMouseEvent) {
    if (this.markerPositions.length == 0) {
      this.markerPositions.push(event.latLng!.toJSON());
    }
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
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
      this.inputPlaces.nativeElement
    )

    console.log(this.inputPlaces.nativeElement)

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places?.length == 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
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
      this.map?.fitBounds(bounds)


    })
  }

  showValues() {
    console.log(this.markerposition?.getPosition()?.lat())
    console.log(this.markerposition?.getPosition()?.lng())
  }


}










