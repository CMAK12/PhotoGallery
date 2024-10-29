import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumTableComponent } from './album-table.component';
import { AlbumService } from '../../services/album.service';
import { AuthorizationService } from '../../services/authorization.service';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AlbumTableComponent', () => {
  let component: AlbumTableComponent;
  let fixture: ComponentFixture<AlbumTableComponent>;
  let mockAlbumService: jasmine.SpyObj<AlbumService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockAuthService: jasmine.SpyObj<AuthorizationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockAlbumService = jasmine.createSpyObj('AlbumService', ['getAlbums', 'deleteAlbum']);
    mockImageService = jasmine.createSpyObj('ImageService', ['getImages']);
    mockAuthService = jasmine.createSpyObj('AuthorizationService', ['getCurrentUserId']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AlbumTableComponent],
      providers: [
        { provide: AlbumService, useValue: mockAlbumService },
        { provide: ImageService, useValue: mockImageService },
        { provide: AuthorizationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumTableComponent);
    component = fixture.componentInstance;

    mockAlbumService.getAlbums.and.returnValue(of([]));
    mockImageService.getImages.and.returnValue(of([]));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call reloadPage on ngOnInit', () => {
    spyOn(component as any, 'reloadPage').and.callThrough(); // Cast to any to access private method

    component.ngOnInit();

    expect((component as any).reloadPage).toHaveBeenCalled();
  });

  it('should call deleteAlbum and reloadPage on deleteAlbum', async () => {
    const mockAlbumId = 'albumId123';
  
    mockAlbumService.deleteAlbum.and.returnValue(Promise.resolve());
  
    const reloadPageSpy = spyOn<any>(component, 'reloadPage').and.callThrough();
  
    await component.deleteAlbum(mockAlbumId);
  
    expect(mockAlbumService.deleteAlbum).toHaveBeenCalledWith(mockAlbumId);
    expect(reloadPageSpy).toHaveBeenCalled();
  });
  
});
