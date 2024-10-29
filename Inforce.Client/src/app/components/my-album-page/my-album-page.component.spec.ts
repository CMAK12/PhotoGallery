import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAlbumPageComponent } from './my-album-page.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MyAlbumPageComponent', () => {
  let component: MyAlbumPageComponent;
  let fixture: ComponentFixture<MyAlbumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAlbumPageComponent],
      providers: [
        JwtHelperService, 
        HttpClient,
        HttpHandler,
        {
          provide: JWT_OPTIONS, useValue: { tokenGetter: () => null }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAlbumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
