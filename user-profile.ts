import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  orderHistory: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadOrderHistory();
  }

  loadOrderHistory() {
    this.http.get<any[]>(`http://localhost:8089/user/${this.user.id}/history`).subscribe({
      next: (data) => {
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
          'Unique PARAQUAT DICHLORIDE 24% SL, 500 ml':'images/Unique.jpg'
        };

        this.orderHistory = data.map(order => ({
          ...order,
          items: order.items.map((item: any) => ({
            ...item,
            imageUrl: imageMap[item.productName] || 'assets/images/default.png'
          }))
        }));
      },
      error: (err) => console.error('Failed to fetch history', err)
    });
  }

  deleteOrder(orderId: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete(`http://localhost:8089/order/${orderId}`).subscribe({
        next: () => {
          this.orderHistory = this.orderHistory.filter(order => order.orderId !== orderId);
          alert('Order deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete order:', err);
          alert('Failed to delete order.');
        }
      });
    }
  }
}
