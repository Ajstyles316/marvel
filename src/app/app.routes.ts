import { Routes } from '@angular/router';
import { PlaceholderPage } from './pages/placeholder.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: PlaceholderPage, data: { title: 'Inicio' } },
  { path: 'ranking', component: PlaceholderPage, data: { title: 'Ranking' } },
  { path: 'top-5', component: PlaceholderPage, data: { title: 'Top 5' } },
  { path: 'fases', component: PlaceholderPage, data: { title: 'Fases' } },
  { path: 'villanos', component: PlaceholderPage, data: { title: 'Villanos' } },
  { path: 'mi-ranking', component: PlaceholderPage, data: { title: 'Arma tu ranking' } },
  { path: '**', redirectTo: 'inicio' }
];