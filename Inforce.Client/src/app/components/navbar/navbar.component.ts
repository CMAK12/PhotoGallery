import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  auth = inject(AuthorizationService);

  logOut() {
    this.auth.logout();
  }

  public get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
}
