import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8089/api/products').subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    this.http.post('http://localhost:8089/api/products', this.newProduct).subscribe(() => {
      alert('Product added!');
      this.newProduct = { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
      this.loadProducts();
    });
  }

  updateProduct(product: any) {
    this.http.put(`http://localhost:8089/api/products/${product.id}`, product).subscribe(() => {
      alert('Product updated!');
    });
  }
}
