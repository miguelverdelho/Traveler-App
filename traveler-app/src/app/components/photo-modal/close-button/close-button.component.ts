import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css'],
  standalone: true
})
export class CloseButtonComponent {
  @Output() click = new EventEmitter<void>();
}
