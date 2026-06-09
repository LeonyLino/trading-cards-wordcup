import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Album } from './pages/album/album';
import { TradeForm } from './pages/trade-form/trade-form';

export const routes: Routes = [
    { path: '', redirectTo: '/album', pathMatch: 'full' },
    { path: 'album', component: Album },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'trade', component: TradeForm },
];
