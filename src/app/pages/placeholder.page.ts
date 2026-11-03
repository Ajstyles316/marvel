import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../core/movies.service';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  template: `
    <section class="page container">
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-subtitle">
        Pestaña en construcción.
        @if (movies.loaded()) {
          Datos cargados: {{ movies.movies().length }} películas.
        } @else {
          Cargando datos...
        }
      </p>
    </section>
  `
})
export class PlaceholderPage {
  readonly movies = inject(MoviesService);
  readonly title = inject(ActivatedRoute).snapshot.data['title'] as string;
}