import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
   orders: any[] = [];

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.user)
      this.orderService.getUserOrders(this.auth.user._id).subscribe(o => this.orders = o);
  }

  getStatusColor(status: string) {
    const map: any = { pending: 'warn', processing: 'accent', shipped: 'primary', delivered: '' };
    return map[status] || '';
  }
}
