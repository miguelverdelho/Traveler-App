import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thumbnail-carousel',
  templateUrl: './thumbnail-carousel.component.html',
  styleUrls: ['./thumbnail-carousel.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ThumbnailCarouselComponent {
  @Input() photos: string[] = [];
  @Input() currentIndex = 0;
  @Output() goTo = new EventEmitter<number>();
}
