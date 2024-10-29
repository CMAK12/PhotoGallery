import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { Album } from '../../models/album.model';
import { Image } from '../../models/image.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-album-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-album-page.component.html',
  styleUrl: './my-album-page.component.scss'
})
export class MyAlbumPageComponent {
  authService = inject(AuthorizationService);
  albumService = inject(AlbumService);
  imageService = inject(ImageService);
  router = inject(Router);

  albums: Album[] = [];
  images: Image[] = [];

  ngOnInit() {
    this.reloadPage();
  }

  getThumbnail(album: Album): string {
    if (album.imageIds && album.imageIds.length > 0) {
      const firstImageId = album.imageIds[0];

      return this.images.find(image => image.id === firstImageId)?.url
    }
    return '';
  }

  viewAlbum(id: string): void {
    this.router.navigate([`/album/${id}`]);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albumService.deleteAlbum(id);

    this.reloadPage();
  }

  private reloadPage(): void {
    this.albumService.getAlbums().pipe(
      map(albums => albums.filter(album => 
        album.userId === this.authService.getCurrentUserId)
      )
    ).subscribe(albums => {
      this.albums = albums;
    });

    this.imageService.getImages().subscribe(images => {
      this.images = images;
    });
  }
}
