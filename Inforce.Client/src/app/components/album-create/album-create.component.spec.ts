import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCreateComponent } from './album-create.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCreateComponent],
      providers: [
        HttpClient,
        HttpHandler,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: { tokenGetter: () => null } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a title control', () => {
    expect(component.creationForm.contains('title')).toBeTrue();
  });
});
