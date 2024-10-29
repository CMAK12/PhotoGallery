import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCreateComponent } from './image-create.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ImageCreateComponent', () => {
  let component: ImageCreateComponent;
  let fixture: ComponentFixture<ImageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCreateComponent,
        RouterTestingModule 
      ],
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

    fixture = TestBed.createComponent(ImageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
