import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css']
})
export class PhotoModalComponent {
  @Input() photos: string[] = [];
  @Input() description: string = '';
  @Input() link: string = '';
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() title!: string;
  @Input() date!: string;


  currentIndex: number = 0;

  get currentPhoto(): string {
    return this.photos[this.currentIndex];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
