import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SenderDataService } from 'src/app/service/sender-data.service';

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements AfterViewInit, OnInit {
  @ViewChild('inputPlaces')
  inputPlaces!: ElementRef;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  @ViewChild(GoogleMap)
  map!: google.maps.Map;
  @ViewChild(MapMarker) markerposition: MapMarker | undefined


  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    title: "Usted está aquí"
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    center: { lat: -1.831239, lng: -78.183406 },
    zoom: 4,
    fullscreenControl: false,
    disableDefaultUI: false,
    mapTypeControl: false

  };
  constructor(private SenderDataService: SenderDataService) {
  }
  ngOnInit(): void {
    console.log("dataffff")
    this.SenderDataService.sender.subscribe((data: any) => {
      console.log("dataffff")
      console.log(data)
    })
  }




  addMarker(position: google.maps.LatLngLiteral) {
    if (this.markerPositions.length == 0) {
      this.markerPositions.push(position);
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
      console.log(places)
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
      this.map?.fitBounds(bounds)



    })
  }

  showValues() {
    console.log(this.markerposition?.getPosition()?.lat())
    console.log(this.markerposition?.getPosition()?.lng())
  }

}
