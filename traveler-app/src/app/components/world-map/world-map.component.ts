import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

interface TravelSpot {
  lat: number;
  lng: number;
  description: string;
  photo: string;
}

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  private map: L.Map | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadTravelSpots();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      worldCopyJump: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadTravelSpots(): void {
    this.http.get<TravelSpot[]>('assets/map-data.json').subscribe(spots => {
      spots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.lng])
          .addTo(this.map!)
          .bindPopup(`
            <b>${spot.description}</b><br/>
            <img src="${spot.photo}" alt="photo" style="width:150px; border-radius: 8px; margin-top: 5px;" />
          `);
      });
    });
  }
}
