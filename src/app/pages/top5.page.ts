import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { MoviesService } from '../core/movies.service';
import { MoviePoster } from '../shared/movie-poster';

export const routeMeta = { title: 'Top 5 All Elite' } satisfies RouteMeta;

@Component({
  selector: 'app-top5-page',
  standalone: true,
  imports: [RouterLink, MoviePoster],
  template: `
    <section class="page container">
      <p class="kicker">Fase 5</p>
      <h1 class="page-title">All Elite</h1>
      <p class="page-subtitle">Las cinco que cambian lo que se espera de Marvel. Tocá cada una para la crítica completa.</p>

      <div class="podium">
        @for (m of movies.top5(); track m.slug; let i = $index) {
          <a class="podium__item" [class]="'podium__item--' + (i + 1)" [routerLink]="['/pelicula', m.slug]">
            <app-movie-poster [movie]="m" size="lg" />
            <div class="podium__meta">
              <span>Puesto {{ m.rank }}</span>
              <h2>{{ m.title }}</h2>
              <p>{{ m.quote }}</p>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .podium { display: grid; gap: 1.2rem; margin-top: 1.8rem; }
    .podium__item {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 1.2rem;
      align-items: center;
      padding: 1rem;
      border-radius: 14px;
      border: 4px solid var(--ink);
      background: #fffdf6;
      box-shadow: 7px 7px 0 #0b63ce;
    }
    .podium__item--1 { background: #ffe14a; box-shadow: 7px 7px 0 #ed1c24; }
    .podium__item--2 { background: #7ec8ff; }
    .podium__item--3 { background: #9dffb5; box-shadow: 7px 7px 0 #1f8a4c; }
    .podium__item--4 { background: #ffc4dd; }
    .podium__item--5 { background: #ffd6a5; }
    .podium__meta span { color: var(--marvel-red); font-family: var(--font-title); font-size: 1.5rem; text-shadow: none; }
    .podium__meta h2 { font-size: 2.2rem; margin: 0.2rem 0 0.5rem; color: var(--cap-navy); }
    .podium__meta p { margin: 0; color: var(--muted); font-weight: 700; }
    @media (max-width: 700px) {
      .podium__item { grid-template-columns: 120px 1fr; }
    }
  `
})
export default class Top5Page {
  readonly movies = inject(MoviesService);
}
