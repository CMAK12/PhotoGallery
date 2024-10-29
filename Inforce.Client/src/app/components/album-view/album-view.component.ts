import { Component, inject } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';
import { Image } from '../../models/image.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-album-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-view.component.html',
  styleUrl: './album-view.component.scss'
})
export class AlbumViewComponent {
  authService = inject(AuthorizationService);
  userService = inject(UserService);
  albumService = inject(AlbumService);
  imageService = inject(ImageService);
  activatedRoute = inject(ActivatedRoute);

  album: Album;
  images: Image[] = [];

  async ngOnInit() {
    const albumId = this.activatedRoute.snapshot.paramMap.get('id');
    await this.loadPage(albumId);

    setInterval(() => this.loadPage(albumId), 5000)
  }

  async likeImage(userId: string, image: Image) {
    const user = await this.userService.getUser(userId).toPromise();

    if (user.likedImagesIds.includes(image.id)) { return; }
    else if (user.dislikedImagesIds.includes(image.id)) {
      user.dislikedImagesIds = user.dislikedImagesIds.filter(id => id !== image.id);
      image.dislikesCount -= 1;
      user.dislikedImagesIds.splice(user.dislikedImagesIds.indexOf(image.id), 1);
    }

    image.likesCount += 1;
    user.likedImagesIds.push(image.id);
    await this.imageService.updateImage(image);
    await this.userService.updateUser(user);
  }

  async dislikeImage(userId: string, image: Image) {
    const user = await this.userService.getUser(userId).toPromise();

    if (user.dislikedImagesIds.includes(image.id)) { return; } 
    else if (user.likedImagesIds.includes(image.id)) {
      user.likedImagesIds = user.likedImagesIds.filter(id => id !== image.id);
      image.likesCount -= 1;
      user.likedImagesIds.splice(user.likedImagesIds.indexOf(image.id), 1);
    }

    image.dislikesCount += 1;
    user.dislikedImagesIds.push(image.id);
    await this.imageService.updateImage(image);
    await this.userService.updateUser(user);
  }

  async deleteImage(id: string) {
    await this.imageService.deleteImage(id);

    await this.loadPage(id);
  }

  private async loadPage(albumId: string) {
    await this.albumService.getAlbum(albumId).subscribe(album => {
      this.album = album;
    });

    await this.imageService.getImages().pipe(
      map(images => images.filter(image => image.albumId === albumId))
    ).subscribe(images => {
      this.images = images;
    });
  }
}
