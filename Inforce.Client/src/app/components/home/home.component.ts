import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
