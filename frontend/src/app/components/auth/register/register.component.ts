import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   form = { name: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  register() {
    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/products']),
      error: e => this.snackBar.open(e.error.message || 'Registration failed', 'Close', { duration: 2000 })
    });
  }
}
