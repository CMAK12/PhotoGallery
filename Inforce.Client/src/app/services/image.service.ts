import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly baseUrl = 'http://localhost:5016/api/image';

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl);
  }

  getImage(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.baseUrl}/${id}`);
  }

  async updateImage(image: Image): Promise<void> {
    await fetch(`${this.baseUrl}/${image.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(image)
    })
    
  }

  async addImage(image: File, albumId: string, userId: string): Promise<Observable<any>> {

    const formData = new FormData();
    formData.append('Image', image);
    formData.append('AlbumId', albumId);
    formData.append('UserId', userId);

    return this.http.post(this.baseUrl, formData);
  }

  async deleteImage(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
  }
}
