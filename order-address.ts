import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-address.html'
})
export class OrderAddressComponent {
  address = {
    street: '',
    city: '',
    state: '',
    pincode: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  confirmAddress() {
    const productId = this.route.snapshot.queryParamMap.get('productId');
    const quantity = this.route.snapshot.queryParamMap.get('qty');

    if (!productId || !quantity) {
      alert('Missing product information. Please go back and select a product.');
      return;
    }

    // Store address temporarily
    localStorage.setItem('userAddress', JSON.stringify(this.address));

    // Navigate to confirmation step
    this.router.navigate(['/confirm-order'], {
      queryParams: { productId, qty: quantity }
    });
  }
}
