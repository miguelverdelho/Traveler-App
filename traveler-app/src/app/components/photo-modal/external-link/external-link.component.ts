import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExternalLinkComponent {
  @Input() link!: string;
  @Input() spotId!: string;

  copied = false;

  copyShareUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('spot', this.spotId);
    navigator.clipboard.writeText(url.toString()).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }
}
