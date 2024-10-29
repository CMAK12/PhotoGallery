import { Component, inject } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';
import { AuthorizationService } from '../../services/authorization.service';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';
import { Image } from '../../models/image.model';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-album-table',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './album-table.component.html',
  styleUrl: './album-table.component.scss'
})
export class AlbumTableComponent {
  authService = inject(AuthorizationService);
  albumService = inject(AlbumService);
  imageService = inject(ImageService);
  router = inject(Router);

  albums: Album[] = [];
  images: Image[] = [];
  page: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.reloadPage();
    setInterval(() => {
      this.reloadPage();
    }, 5000);
  }

  getThumbnail(album: Album): string {
    const firstImageId = album.imageIds[0];

    return this.images.find(image => image.id === firstImageId)?.url
  }

  viewAlbum(id: string): void {
    this.router.navigate([`/album/${id}`]);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albumService.deleteAlbum(id);

    this.reloadPage();
  }

  private reloadPage(): void {
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums;
    });

    this.imageService.getImages().subscribe(images => {
      this.images = images;
    });
  }
}
