import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  mode: 'signup' | 'login' = 'signup';
  user = { name: '', email: '', password: '' };
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  setMode(mode: 'signup' | 'login') {
    this.mode = mode;
    this.successMsg = '';
    this.errorMsg = '';
    this.user = { name: '', email: '', password: '' };
  }

  submit() {
    const url = `http://localhost:8089/${this.mode}`;
    const body = this.mode === 'login'
      ? { email: this.user.email, password: this.user.password }
      : this.user;

    this.http.post<any>(url, body).subscribe({
      next: (res) => {
        this.successMsg = `${this.mode} successful!`;
        this.errorMsg = '';

        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMsg = 'Email already exists.';
        } else if (err.status === 401) {
          this.errorMsg = 'Invalid login credentials.';
        } else {
          this.errorMsg = 'Something went wrong.';
        }
        this.successMsg = '';
      }
    });
  }

  // ✅ Admin button click handler
  openAdminLogin() {
    this.router.navigate(['/admin-login']);
  }
  goToHelp() {
  alert('For help, contact: support@farmzy.com');
}

goToAbout() {
  alert('Farmzy is an e-commerce platform for fertilizers and pesticides.');
}

}
