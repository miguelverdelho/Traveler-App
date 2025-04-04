import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, OnDestroy, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

// Subcomponents
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ThumbnailCarouselComponent } from './thumbnail-carousel/thumbnail-carousel.component';
import { DescriptionComponent } from './description/description.component';
import { ExternalLinkComponent } from './external-link/external-link.component';
import { CloseButtonComponent } from './close-button/close-button.component';

@Component({
  selector: 'app-photo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalHeaderComponent,
    ImageViewerComponent,
    ThumbnailCarouselComponent,
    DescriptionComponent,
    ExternalLinkComponent,
    CloseButtonComponent
  ],
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css']
})
export class PhotoModalComponent implements AfterViewInit, OnDestroy {
  @Input() photos: string[] = [];
  @Input() description: string = '';
  @Input() link: string = '';
  @Input() title!: string;
  @Input() date!: string;
  @Input() isVisible: boolean = false;
  @Input() spotId!: string;
  @Output() onClose = new EventEmitter<void>();

  currentIndex: number = 0;
  imageLoaded: boolean = false;
  lightbox?: PhotoSwipeLightbox;

  ngOnInit(): void {
    console.log(this.currentIndex);
    this.currentIndex = 0;
  }

  get currentPhoto(): string {
    return this.photos[this.currentIndex];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isVisible) return;

    switch (event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'Escape':
        this.onClose.emit();
        break;
    }
  }

  ngAfterViewInit(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: '.image-area',
      children: 'a',
      bgOpacity: 0.9,
      closeOnVerticalDrag: true,
      pswpModule: () => import('photoswipe')
    });

    this.lightbox.init();
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.imageLoaded = false;
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  openGallery(event: Event): void {
    event.preventDefault();
  
    if (!this.lightbox) return;
  
    const galleryItems = this.photos.map(photo => ({
      src: photo,
      width: 1600,   // or detect dynamically
      height: 1200
    }));
  
    // Create a custom gallery
    this.lightbox.pswp?.close(); // close if already open
    this.lightbox?.loadAndOpen(this.currentIndex,  galleryItems );
  }
}
