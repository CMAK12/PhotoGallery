import { TestBed } from '@angular/core/testing';
import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Album } from '../models/album.model';
import { AlbumRequest } from '../interfaces/album.interface';

describe('AlbumService', () => {
  let service: AlbumService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    service = TestBed.inject(AlbumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve albums using getAlbums', () => {
    const mockAlbums: Album[] = [
      { id: '1', title: 'Album 1', imageIds: [], userId: 'user1' },
      { id: '2', title: 'Album 2', imageIds: [], userId: 'user1' }
    ];

    service.getAlbums().subscribe(albums => {
      expect(albums).toEqual(mockAlbums);
    });

    const req = httpTestingController.expectOne('http://localhost:5016/api/album');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbums);
  });

  it('should add an album using addAlbum', async () => {
    const request: AlbumRequest = { title: 'New Album', imageIds: [], userId: 'user1' };
    spyOn(window, 'fetch').and.resolveTo(new Response(null, { status: 201 }));

    await service.addAlbum(request);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5016/api/album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
  });

  it('should delete an album using deleteAlbum', async () => {
    const albumId = '1';
    spyOn(window, 'fetch').and.resolveTo(new Response(null, { status: 200 }));

    await service.deleteAlbum(albumId);

    expect(window.fetch).toHaveBeenCalledWith(`http://localhost:5016/api/album/${albumId}`, {
      method: 'DELETE'
    });
  });
});
