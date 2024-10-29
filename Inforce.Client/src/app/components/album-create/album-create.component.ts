import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { AuthorizationService } from '../../services/authorization.service';
import { AlbumRequest } from '../../interfaces/album.interface';

@Component({
  selector: 'app-album-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.scss'
})
export class AlbumCreateComponent {
  albumService = inject(AlbumService);
  authService = inject(AuthorizationService);

  creationForm = new FormGroup({
      title: new FormControl(null)
    });

  onSubmit() {
    const request: AlbumRequest = {
      title: this.creationForm.value.title,
      imageIds: [],
      userId: this.authService.getCurrentUserId
    };

    this.albumService.addAlbum(request);
  }
}
