import { Routes } from '@angular/router';
import { AuthGuard } from './core/guarde/auth.guard';
import { Album } from './pages/album/album';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { TradeForm } from './pages/trade-form/trade-form';

export const routes: Routes = [
    { path: '', redirectTo: '/album', pathMatch: 'full' },
    { path: 'album', component: Album },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'trade', component: TradeForm },
];
