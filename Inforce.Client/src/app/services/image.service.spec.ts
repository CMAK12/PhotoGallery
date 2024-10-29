import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Image } from '../models/image.model';
import { ImageRequest } from '../interfaces/image.interface';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve images using getImages', () => {
    const mockImages: Image[] = [
      { id: '1', url: 'http://example.com/image1.jpg', likesCount: 10, dislikesCount: 2, albumId: 'album1', userId: 'user1' },
      { id: '2', url: 'http://example.com/image2.jpg', likesCount: 5, dislikesCount: 1, albumId: 'album1', userId: 'user1' }
    ];

    service.getImages().subscribe(images => {
      expect(images).toEqual(mockImages);
    });

    const req = httpTestingController.expectOne('http://localhost:5016/api/image');
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });
});
