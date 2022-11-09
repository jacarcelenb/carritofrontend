import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements AfterViewInit {
  @ViewChild('inputPlaces')
  inputPlaces!: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective | undefined;

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
    fullscreenControl: false,
    disableDefaultUI: false,
    mapTypeControl:false

  };
  constructor() {
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress=address.formatted_address
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
