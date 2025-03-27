import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import sha256 from 'crypto-js/sha256';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password = '';
  error = false;

  private expectedHash = 'e72a0f66cd5ac1187f5fc3ec2d335fd5533f3b1a1a489236b481a892502c4eda';

  @Output() loginSuccess = new EventEmitter<void>();

  checkPassword() {
    console.log(this.password);
    const enteredHash = sha256(this.password).toString();
    if (enteredHash === this.expectedHash) {
      this.loginSuccess.emit();
    } else {
      this.error = true;
    }
  }
}
