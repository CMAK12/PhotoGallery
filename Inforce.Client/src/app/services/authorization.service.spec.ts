import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        JwtHelperService,
        {
          provide: JWT_OPTIONS, useValue: { tokenGetter: null }
        }
      ]
    });
    service = TestBed.inject(AuthorizationService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return true for isAuthenticated when the token is valid', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiQWRtaW4ifQ.wfuPDg-_2bAV2qIfBzEk_bFp42YjAAKU8sxQ429_wwg';
    const mockJwtHelper = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);
    const decodedToken = { sub: '123', exp: Date.now() + 10000 }; 

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    mockJwtHelper.isTokenExpired.and.returnValue(false);
    mockJwtHelper.decodeToken.and.returnValue(decodedToken);

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated when the token is expired', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3RyaW5nIiwic3ViIjoiYTY2ZWEyNmUtYTk5NS00MWEwLWE5ZGYtZmE5MGFjN2Q0YmE5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MCwiaXNzIjoiR2FsbGVyeSIsImF1ZCI6InJlc291cmNlU2VydmVyIn0.jTExZFWQoGfBO42o6dm554xafy-ftNlEaWSGLlkErso';
    const mockJwtHelper = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired']);

    
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    mockJwtHelper.isTokenExpired.and.returnValue(true);

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true for isAdmin when user has admin role', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3RyaW5nIiwic3ViIjoiYTY2ZWEyNmUtYTk5NS00MWEwLWE5ZGYtZmE5MGFjN2Q0YmE5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzI3MzA4OTMsImlzcyI6IkdhbGxlcnkiLCJhdWQiOiJyZXNvdXJjZVNlcnZlciJ9.jTEdZwr8LhNXAcMBMcg82Nc6tK7ImB_E5HnJ4PDq_i4';
    const mockJwtHelper = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);
    const decodedToken = { 
      sub: '123', 
      exp: Date.now() + 10000, 
      'role': 'Admin' 
    };

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    mockJwtHelper.isTokenExpired.and.returnValue(false);
    mockJwtHelper.decodeToken.and.returnValue(decodedToken);

    expect(service.isAdmin()).toBeTrue();
  });

  it('should return false for isAdmin when user does not have admin role', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3RyaW5nIiwic3ViIjoiYTY2ZWEyNmUtYTk5NS00MWEwLWE5ZGYtZmE5MGFjN2Q0YmE5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTczMjczMDg5MywiaXNzIjoiR2FsbGVyeSIsImF1ZCI6InJlc291cmNlU2VydmVyIn0.7NvUGlqgQj3Btk3awVzE4GmkV-b9ligVxZGyMAb8uEI';
    const mockJwtHelper = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);
    const decodedToken = { 
      sub: '123', 
      exp: Date.now() + 10000, 
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'User' 
    };

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    mockJwtHelper.isTokenExpired.and.returnValue(false);
    mockJwtHelper.decodeToken.and.returnValue(decodedToken);

    expect(service.isAdmin()).toBeFalse();
  });
});
