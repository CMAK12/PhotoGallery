import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  userService = inject(UserService);
  authService = inject(AuthorizationService);

  registrationForm = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null)
  })

  async onSubmit() {
    const request: AuthRequest = {
      username: this.registrationForm.value.login,
      password: this.registrationForm.value.password
    }

    await this.userService.addUser(request);
    await this.authService.login(request)
  }
}
