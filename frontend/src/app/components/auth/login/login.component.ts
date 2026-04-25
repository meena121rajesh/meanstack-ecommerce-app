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
  selector: 'app-login',
  imports: [FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   form = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  login() {
    this.auth.login(this.form).subscribe({
      next: () => this.router.navigate(['/products']),
      error: e => this.snackBar.open(e.error.message || 'Login failed', 'Close', { duration: 2000 })
    });
  }
}
