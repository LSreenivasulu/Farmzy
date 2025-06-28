import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {
  adminEmail = '';
  adminPassword = '';
  errorMsg = '';

  constructor(private router: Router) {}

  login() {

  const storedEmail = 'admin@farmcard.com';
  const storedPassword = 'admin123';

  const enteredEmail = this.adminEmail.trim();
  const enteredPassword = this.adminPassword.trim();

  if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
    this.router.navigate(['/admin-dashboard']);
  } else {
    this.errorMsg = 'Invalid admin credentials.';
  }
}

}
