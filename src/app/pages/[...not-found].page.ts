import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta = { title: 'No encontrado' } satisfies RouteMeta;

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page container">
      <p class="kicker">404</p>
      <h1 class="page-title">Esta línea temporal no existe.</h1>
      <p class="page-subtitle">Volvé al ranking o armá tu propia entrada en Colección.</p>
      <a routerLink="/" class="btn btn--primary">Inicio</a>
    </section>
  `
})
export default class NotFoundPage {}
