import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ImageViewerComponent {
  @Input() currentPhoto!: string;
  @Input() imageLoaded = false;
  @Input() hasNav = false;

  @Output() imageLoadedEvent = new EventEmitter<void>();
  @Output() openGallery = new EventEmitter<Event>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
