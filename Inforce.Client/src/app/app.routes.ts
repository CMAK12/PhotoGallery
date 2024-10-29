import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AlbumTableComponent } from './components/album-table/album-table.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { AlbumCreateComponent } from './components/album-create/album-create.component';
import { ImageCreateComponent } from './components/image-create/image-create.component';
import { MyAlbumPageComponent } from './components/my-album-page/my-album-page.component';
import { AuthGuard } from './guard/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'albums',
        component: AlbumTableComponent
    },
    {
        path: 'album/:id',
        component: AlbumViewComponent
    },
    {
        path: 'album-create',
        component: AlbumCreateComponent
    },
    {
        path: 'image-create/:id',
        component: ImageCreateComponent
    },
    {
        path: 'user_albums/:id',
        component: MyAlbumPageComponent,
        canActivate: [AuthGuard]
    }
];
