import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './confirm-order.html',
  styleUrls: ['./confirm-order.css']
})
export class ConfirmOrderComponent implements OnInit {
  addressForm!: FormGroup;
  product: any;
  quantity: number = 1;
  userId!: number;
  orderPlaced: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedAddress = localStorage.getItem('userAddress');
    const address = storedAddress ? JSON.parse(storedAddress) : null;

    this.addressForm = this.fb.group({
      street: [address?.street || '', Validators.required],
      city: [address?.city || '', Validators.required],
      state: [address?.state || '', Validators.required],
      pincode: [address?.pincode || '', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    const productId = this.route.snapshot.queryParamMap.get('productId');
    const qty = this.route.snapshot.queryParamMap.get('qty');
    this.quantity = qty ? +qty : 1;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.id;

    if (!this.userId || !productId) {
      alert('Missing product or user data. Please login again and select a product.');
      return;
    }

    this.http.get(`http://localhost:8089/api/products/${productId}`).subscribe({
      next: (prod: any) => this.product = prod,
      error: () => alert('Failed to load product')
    });
  }

  placeOrder() {
    if (this.addressForm.invalid) {
      alert('Please fill all address fields correctly.');
      return;
    }

    const address = this.addressForm.value;

    this.http.post(`http://localhost:8089/create/${this.userId}`, address).subscribe({
      next: (order: any) => {
        this.http.post(`http://localhost:8089/${order.id}/add/${this.product.id}?qty=${this.quantity}`, {})
          .subscribe({
            next: () => {
              this.orderPlaced = true; // ✅ Show success message
            },
            error: () => alert('Failed to add item to order')
          });
      },
      error: () => alert('Order creation failed')
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
