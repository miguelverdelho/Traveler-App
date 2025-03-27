import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';


interface TravelSpot {
  lat: number;
  lng: number;
  description: string;
  link?: string;
  photos: string[];
}


const redPinIcon = L.icon({
  iconUrl: 'assets/red-pin.svg',
  iconSize: [20, 20],        // Small pin
  iconAnchor: [10, 20],      // Center-bottom = (width/2, height)
  popupAnchor: [0, -20]      // Popup appears just above
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private map!: L.Map;
  selectedPhoto: string = '';
  selectedDescription: string = '';
  selectedLink: string = '';
  showModal: boolean = false;
  selectedPhotos: string[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadSpots();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      maxZoom: 25,             // optional: set a zoom ceiling
      minZoom: 2.5,             // optional: prevent over-zoom out
      maxBoundsViscosity: 1.0, // strong edge resistance
      worldCopyJump: false,    // important: don't wrap
      maxBounds: [
        [-85, -180],
        [85, 180]
      ]
    });

    L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=bPMFb9L0UDBUeWHd3aj9', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  }


  closeModal() {
    this.showModal = false;
  }

  private loadSpots(): void {
    this.http.get<TravelSpot[]>('assets/map-data.json').subscribe(spots => {
      spots.forEach(spot => {
        L.marker([spot.lat, spot.lng], { icon: redPinIcon })
        .addTo(this.map)     
        .on('click', () => {
          this.selectedPhotos = spot.photos;
          this.selectedDescription = spot.description;
          this.selectedLink = spot.link || '';
          this.showModal = true;

        });
      });
    });
  }
}
