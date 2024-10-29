import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../interfaces/auth.interface';
import { User } from '../models/user.model';
import { UserFeedback } from '../interfaces/user-feedback.interface';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve user data using getUser', () => {
    const mockUser: User = { 
      id: '73e9eb26-ae2b-4faa-b602-a2c25d535a2b', 
      username: 'John Doe', 
      password: '$2a$11$Jt1Qkdk0UrSYOTh0vcFmVuL5rbJjOD.NLpXx33U0B1L70zedDPw0m',
      role: 'User',
      albumIds: [],
      likedImagesIds: [], 
      dislikedImagesIds: []  
    };

    service.getUser('123').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('http://localhost:5016/api/user/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should add a user using addUser', async () => {
    const request: AuthRequest = { username: 'newuser', password: 'password123' };
    spyOn(window, 'fetch').and.resolveTo(new Response(null, { status: 201 }));

    await service.addUser(request);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5016/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  });
});
