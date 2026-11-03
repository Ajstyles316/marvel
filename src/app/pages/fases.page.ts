import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { PHASES } from '../core/movie.model';
import { MoviesService } from '../core/movies.service';
import { MoviePoster } from '../shared/movie-poster';

export const routeMeta = { title: 'Fases del ranking' } satisfies RouteMeta;

@Component({
  selector: 'app-fases-page',
  standalone: true,
  imports: [RouterLink, MoviePoster],
  template: `
    <section class="page container">
      <p class="kicker">Mapa del ranking</p>
      <h1 class="page-title">Fases</h1>
      <p class="page-subtitle">No son las fases oficiales de Marvel: son los cinco pisos de este ranking, del fondo de olla al Olimpo.</p>

      <div class="phase-nav">
        @for (p of phases; track p.id) {
          <button type="button" class="chip" [class.chip--on]="active() === p.id" [style.border-color]="p.color" (click)="active.set(p.id)">
            {{ p.id }}. {{ p.name }}
          </button>
        }
      </div>

      @for (p of phases; track p.id) {
        @if (active() === p.id) {
          <article class="card phase" [style.box-shadow]="'7px 7px 0 ' + p.color">
            <h2 [style.color]="p.color">{{ p.name }}</h2>
            <p>{{ p.blurb }} · Puestos {{ p.range }}</p>
            <div class="grid-movies">
              @for (m of movies.byPhase(p.id); track m.slug) {
                <a class="movie-card" [routerLink]="['/pelicula', m.slug]">
                  <app-movie-poster [movie]="m" />
                  <h3>{{ m.title }}</h3>
                  <p>{{ m.villain }}</p>
                </a>
              }
            </div>
          </article>
        }
      }
    </section>
  `,
  styles: `
    .phase-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.4rem 0; }
    .phase h2 { font-size: 2.6rem; margin-bottom: 0.4rem; }
    .phase p { color: var(--text-muted); margin: 0 0 1.2rem; }
  `
})
export default class FasesPage {
  readonly movies = inject(MoviesService);
  readonly phases = PHASES;
  readonly active = signal<1 | 2 | 3 | 4 | 5>(5);
}
