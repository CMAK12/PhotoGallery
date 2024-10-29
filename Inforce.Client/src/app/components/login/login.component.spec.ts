import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthorizationService } from '../../services/authorization.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthorizationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthorizationService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthorizationService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method of AuthorizationService on form submit', () => {
    component.loginForm.controls['login'].setValue('testUser');
    component.loginForm.controls['password'].setValue('testPass');

    component.onSubmit();

    const request = {
      username: 'testUser',
      password: 'testPass'
    };

    expect(authService.login).toHaveBeenCalledWith(request);
  });
});
