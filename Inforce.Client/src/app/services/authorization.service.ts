import { Injectable } from '@angular/core';
import { AuthRequest } from '../interfaces/auth.interface';
import { TokenResponse } from '../interfaces/token.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const ACCESS_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly baseUrl = 'http://localhost:5016/api/authorization';
  

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) { }

  get getCurrentUserId(): string {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['sub'];
    }
    return '';
  }

  async login(request: AuthRequest) {
    const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const token: TokenResponse = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role === "Admin";
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}
