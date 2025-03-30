import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

@Component({
  selector: 'app-photo-modal',
  standalone: true,
  imports: [CommonModule],
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
  @Output() onClose = new EventEmitter<void>();

  currentIndex: number = 0;
  lightbox?: PhotoSwipeLightbox;

  @ViewChild('galleryContainer', { static: false }) galleryContainer!: ElementRef;
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
        this.onClose.emit(); // optional: allow ESC to close modal
        break;
    }
  }

  get currentPhoto(): string {
    return this.photos[this.currentIndex];
  }

  ngAfterViewInit(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: '.image-area',
      children: 'a',
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
  }

  openGallery(event: Event): void {
    event.preventDefault();

    if (this.lightbox?.pswp) {
      this.lightbox.pswp.close();
    }

    this.lightbox?.loadAndOpen(this.currentIndex);
  }
  
}
