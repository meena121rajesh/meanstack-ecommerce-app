import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, MatSidenavModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
