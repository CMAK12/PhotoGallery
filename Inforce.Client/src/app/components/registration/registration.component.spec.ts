import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthorizationService } from '../../services/authorization.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authService: jasmine.SpyObj<AuthorizationService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['addUser']);
    authService = jasmine.createSpyObj('AuthorizationService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistrationComponent], // Import the standalone component
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthorizationService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser and login methods on form submit', async () => {
    component.registrationForm.controls['login'].setValue('testUser');
    component.registrationForm.controls['password'].setValue('testPass');

    await component.onSubmit();

    const request = {
      username: 'testUser',
      password: 'testPass'
    };

    expect(userService.addUser).toHaveBeenCalledWith(request);
    expect(authService.login).toHaveBeenCalledWith(request);
  });
});
