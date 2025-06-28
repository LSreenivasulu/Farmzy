import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Add this

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule], // ✅ Include RouterModule
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  products: any[] = [];
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.http.get<any[]>('http://localhost:8089/api/products').subscribe({
      next: (data) => {
        this.products = data;
        this.addImagePaths();
      },
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  addImagePaths() {
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
      'Monocil':'images/Monocil.jpg',
      'Unique PARAQUAT DICHLORIDE 24% SL, 500 ml':'images/Unique.jpg',
      'Parodontax':'images/Parodontax.jpg'
    };

    this.products.forEach(p => {
      p.imageUrl = imageMap[p.name] || 'images/default.png';
    });
  }

  get filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
