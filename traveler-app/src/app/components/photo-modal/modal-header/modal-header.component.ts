import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css'],
  standalone: true,
  imports: [CommonModule], 
})
export class ModalHeaderComponent {
  @Input() title!: string;
  @Input() date!: string;
}
