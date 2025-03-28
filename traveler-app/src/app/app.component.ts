import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { LoginComponent } from './components/login/login.component';


interface TravelSpot {
  lat: number;
  lng: number;
  title: string;
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
  imports: [CommonModule, PhotoModalComponent,LoginComponent],
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
  isAuthenticated = false;

  onLoginSuccess() {
    this.isAuthenticated = true;
     // Defer initMap until DOM is updated
    setTimeout(() => {
      this.initMap();
      this.loadSpots();
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
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
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  }
  

  closeModal() {
    this.showModal = false;
  }

  private loadSpots(): void {
    this.http.get<any>('https://traveler-cms.vercel.app/api/travel-spots').subscribe(response => {
      const spots: TravelSpot[] = response.docs;
  
      spots.forEach(spot => {
        L.marker([spot.lat, spot.lng], { icon: redPinIcon })
          .addTo(this.map)
          .on('click', () => {
            this.selectedPhotos = spot.photos || [];
            this.selectedDescription = spot.description;
            this.selectedLink = spot.link || '';
            this.showModal = true;
          });
      });
    });
  }
  
}
