import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  user: any;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    if (!this.user || !this.user.id) {
      alert('Please login first.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.get(`http://localhost:8089/api/products/${id}`).subscribe({
      next: (data: any) => {
        this.product = data;
        this.setImagePath();
      },
      error: (err) => console.error('Product not found', err)
    });
  }

  setImagePath() {
    const imageMap: { [key: string]: string } = {
      'Urea Fertilizer': 'images/urea.jpg',
      'DAP Fertilizer': 'images/dap.jpg',
      'NPK 20-20-20': 'images/npk.jpg',
      'Vermicompost': 'images/vermicompost.jpg',
      'Potash Granules': 'images/potash.jpg',
      'Single Super Phosphate': 'images/phosphate.jpg',
      'Ammonium Sulfate': 'images/ammonium.jpg',
      'Biofertilizer': 'images/biofertilizer.jpg',
      'Zinc Sulphate': 'images/zinc.jpg',
      'Seaweed Extract': 'images/seaweed.jpg',
      'Chlorpyrifos 50%': 'images/chlorpyrifos.jpg',
      'Imidacloprid 30.5%': 'images/imidacloprid.jpg',
      'Fipronil 5%': 'images/fipronil.jpg',
      'Neem Oil 3000ppm': 'images/neem-oil.jpg',
      'Carbaryl 50%': 'images/carbaryl.jpg',
      'Cypermethrin 10%': 'images/cypermethrin.jpg',
      'Mancozeb 75%': 'images/mancozeb.jpg',
      'Hexaconazole 5%': 'images/hexaconazole.jpg',
      'Copper Oxychloride': 'images/copper.jpg',
      'Sulphur 80%': 'images/sulphur.jpg',
      'Monocil': 'images/Monocil.jpg'
    };

    this.product.imageUrl = imageMap[this.product.name] || 'images/default.png';
  }

  orderNow() {
    if (this.quantity < 1 || this.quantity > this.product.stock) {
      alert('Invalid quantity selected!');
      return;
    }

    // ✅ Store selected product and quantity in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify({ ...this.product, quantity: this.quantity }));
    localStorage.setItem('user', JSON.stringify(this.user));

    this.router.navigate(['/enter-address']); // Step before confirm-order
  }
}
