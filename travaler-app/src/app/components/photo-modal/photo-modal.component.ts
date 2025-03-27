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
  @Input() photo: string = '';
  @Input() description: string = '';
  @Input() isVisible: boolean = false;

  @Output() onClose = new EventEmitter<void>();
}