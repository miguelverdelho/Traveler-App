import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { ActivatedRoute, Router } from '@angular/router';


interface TravelSpot {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  link?: string;
  date: string; // or `Date` depending on how you want to format it
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
  spots: TravelSpot[] = [];
  loadingSpots = true;

  private map!: L.Map;
  selectedPhoto: string = '';
  selectedDescription: string = '';
  selectedLink: string = '';
  showModal: boolean = false;
  selectedPhotos: string[] = [];
  selectedSpotId: string = '';

  isAuthenticated = false;
  selectedTitle: string = '';
  selectedDate: string = '';

  onLoginSuccess() {
    this.isAuthenticated = true;
     // Defer initMap until DOM is updated
    setTimeout(() => {
      this.initMap();
      this.loadSpots();
    });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //remove when login active

    this.initMap();
    this.loadSpots();

    this.route.queryParams.subscribe(params => {
      const spotId = params['spot'];
      if (spotId) {
        // Wait until spots are loaded before opening modal
        setTimeout(() => {
          const target = this.spots.find(s => s.id === spotId);
          if (target) {
            this.openSpot(target); // Extract the modal opening logic into a method
          }
        }, 500);
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      maxZoom: 18,
      minZoom: 2,
      maxBoundsViscosity: 1.0,
      worldCopyJump: false,
      maxBounds: [
        [-85, -180],
        [85, 180]
      ]
    });
  
    L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=bPMFb9L0UDBUeWHd3aj9', {
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  
    const europeBounds: L.LatLngBoundsExpression = [
      [34, -11],  // Southwest (Canary Islands / Morocco area)
      [60, 30]    // Northeast (Western Russia area)
    ];
    
    this.map.fitBounds(europeBounds);
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { spot: null },
      queryParamsHandling: 'merge'
    });
  }

  private loadSpots(): void {
    this.loadingSpots = true; 
    console.log(this.loadingSpots);

    this.http.get<any>('https://traveler-cms.vercel.app/api/travel-spots?limit=1000').subscribe(response => {
      const spots: TravelSpot[] = response.docs;
      this.spots = spots;
      spots.forEach(spot => {        
        L.marker([spot.lat, spot.lng], { icon: redPinIcon })
          .addTo(this.map)
          .bindTooltip(spot.title, { permanent: false, direction: 'top' })
          .on('click', () => this.openSpot(spot));          
      });

      this.tryOpenSpotFromUrl(spots);
    });

    this.loadingSpots = false; 
  }

  private tryOpenSpotFromUrl(spots: TravelSpot[]): void {
    const spotId = this.route.snapshot.queryParamMap.get('spot');
       if (spotId) {
         const target = spots.find(s => s.id === spotId);
         if (target) this.openSpot(target);
       }
  }
  
  private openSpot(spot: TravelSpot): void {
    this.selectedPhotos = spot.photos || [];
    this.selectedTitle = spot.title;
    this.selectedDescription = spot.description;
    this.selectedDate = spot.date || 'No date provided';
    this.selectedLink = spot.link || '';
    this.selectedSpotId = spot.id;
    this.showModal = true;

    if (this.map) {
      this.map.setView(
        [spot.lat, spot.lng], 
        8, 
        {
          animate: true,
          duration: 0.5
        }
    );
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { spot: spot.id },
      queryParamsHandling: 'merge'
    });
  }
}
