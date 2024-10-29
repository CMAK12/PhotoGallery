import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthorizationService);
  
  loginForm = new FormGroup({
      login: new FormControl(null),
      password: new FormControl(null)
    });

  onSubmit() {
    const request: AuthRequest = {
      username: this.loginForm.value.login,
      password: this.loginForm.value.password
    }

    this.auth.login(request)
  }
}
