import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelSpot } from './travel-spot.interface';

@Component({
  selector: 'app-travel-spot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-spot.component.html',
  styleUrls: ['./travel-spot.component.css']
})
export class TravelSpotComponent {
  @Input() spot!: TravelSpot;
}
