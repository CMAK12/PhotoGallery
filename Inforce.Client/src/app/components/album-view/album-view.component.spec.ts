import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumViewComponent } from './album-view.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumService } from '../../services/album.service';
import { of } from 'rxjs';

describe('AlbumViewComponent', () => {
  let component: AlbumViewComponent;
  let fixture: ComponentFixture<AlbumViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumViewComponent,
        RouterTestingModule,
      ],
      providers: [
        JwtHelperService, 
        HttpClient,
        HttpHandler,
        {
          provide: JWT_OPTIONS, useValue: { tokenGetter: null }
        },
        {
          provide: AlbumService, useValue: {getAlbum: () => of({
            title: 'Mock Album Title',
            description: 'Mock Album Description',
          })}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
