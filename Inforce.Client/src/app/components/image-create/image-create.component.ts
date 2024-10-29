  import { Component, inject } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
  import { ImageService } from '../../services/image.service';
  import { ImageRequest } from '../../interfaces/image.interface';
  import { AuthorizationService } from '../../services/authorization.service';
  import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';
import { Guid } from 'guid-typescript';

  @Component({
    selector: 'app-image-create',
    standalone: true,
    imports: [
      ReactiveFormsModule
    ],
    styleUrl: './image-create.component.scss',
    templateUrl: './image-create.component.html'
  })
  export class ImageCreateComponent {
    authService = inject(AuthorizationService);
    imageService = inject(ImageService);
    albumService = inject(AlbumService);
    activatedRoute = inject(ActivatedRoute);
    route = inject(Router);

    selectedFile: File | null = null;

    onFileSelected(event: any): void {
      if (event.target.files && event.target.files[0]) {
        this.selectedFile = event.target.files[0] as File;
      }
    }  

    async uploadImage() {
      const albumId = this.activatedRoute.snapshot.paramMap.get('id')!;
      const userId = this.authService.getCurrentUserId;

      if (this.selectedFile) {
        (await this.imageService.addImage(this.selectedFile, albumId, userId)).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );

        this.route.navigate([`/album/${albumId}`]);
      }
    }
  }