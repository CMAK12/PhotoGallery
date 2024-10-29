import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { HttpClient } from '@angular/common/http';
import { AlbumRequest } from '../interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private readonly baseUrl = "http://localhost:5016/api/album";

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/${id}`);
  }

  async addAlbum(album: AlbumRequest): Promise<void> {
    await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(album)
    });
  }

  async updateAlbum(album: Album): Promise<Observable<void>> {
    return this.http.put<void>(`${this.baseUrl}/${album.id}`, album)
  }

  async deleteAlbum(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }
}
