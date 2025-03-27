import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';


interface TravelSpot {
  lat: number;
  lng: number;
  description: string;
  photo: string;
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
  showModal: boolean = false;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadSpots();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      maxZoom: 8,             // optional: set a zoom ceiling
      minZoom: 3,             // optional: prevent over-zoom out
      maxBoundsViscosity: 1.0, // strong edge resistance
      worldCopyJump: false,    // important: don't wrap
      maxBounds: [
        [-85, -180],
        [85, 180]
      ]
    });

    L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}@2x.png?key=bPMFb9L0UDBUeWHd3aj9', {
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
          this.selectedPhoto = spot.photo;
          this.selectedDescription = spot.description;
          this.showModal = true;
        });
      });
    });
  }
}
