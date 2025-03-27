import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { HttpClient } from '@angular/common/http';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { TravelSpotComponent } from './components/travel-spot/travel-spot.component';



interface TravelSpot {
  lat: number;
  lng: number;
  description: string;
  photo: string;
}

// const redPinIcon = L.icon({
//   iconUrl: 'assets/red-pin.svg',
//   iconSize: [20, 20],        // Small pin
//   iconAnchor: [10, 20],      // Center-bottom = (width/2, height)
//   popupAnchor: [0, -20]      // Popup appears just above
// });

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoModalComponent, TravelSpotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: maplibregl.Map | undefined;
  selectedPhoto: string = '';
  selectedDescription: string = '';
  showModal: boolean = false;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.map = new maplibregl.Map({
      container: 'map', // ID from HTML
      style: 'https://api.maptiler.com/maps/0195d7dd-ba62-78c4-aad6-8c97d6f1584e/style.json?key=bPMFb9L0UDBUeWHd3aj9',
      center: [0, 20],
      zoom: 2
    });
    
    this.map.on('load', () => {

      // ✅ now load markers
      this.http.get<TravelSpot[]>('assets/map-data.json').subscribe(spots => {
        console.log('Loaded spots:', spots); // 🔍 check browser console
        spots.forEach(spot => {
          const container = document.createElement('div');
          container.className = 'travel-spot-marker'; // for styling

          const img = document.createElement('img');
          img.src = 'assets/red-pin.svg';
          img.style.width = '20px';
          img.style.height = '20px';

          container.appendChild(img);

          container.addEventListener('click', () => {
            this.selectedPhoto = spot.photo;
            this.selectedDescription = spot.description;
            this.showModal = true;
          });

          new maplibregl.Marker({ element: container })
          .setLngLat([spot.lng, spot.lat])
          .addTo(this.map!);
        });
        
      });
    });
  }



  closeModal() {
    this.showModal = false;
  }

}
