import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { VERDICTS, VillainVerdict } from '../core/movie.model';
import { MoviesService } from '../core/movies.service';
import { MoviePoster } from '../shared/movie-poster';

export const routeMeta = { title: 'Villanos del UCM' } satisfies RouteMeta;

@Component({
  selector: 'app-villanos-page',
  standalone: true,
  imports: [RouterLink, MoviePoster],
  template: `
    <section class="page container">
      <p class="kicker">Antagonistas</p>
      <h1 class="page-title">Villanos</h1>
      <p class="page-subtitle">El veredicto: desperdiciado, correcto o brillante. Filtrá y leé por qué.</p>

      <div class="stat-grid">
        <div class="card stat"><b>{{ stats().verdicts.brillante }}</b>brillantes</div>
        <div class="card stat"><b>{{ stats().verdicts.correcto }}</b>correctos</div>
        <div class="card stat"><b>{{ stats().verdicts.desperdiciado }}</b>desperdiciados</div>
      </div>

      <div class="toolbar">
        @for (v of verdicts; track v.id) {
          <button type="button" class="chip" [class.chip--on]="filter() === v.id" (click)="filter.set(filter() === v.id ? 'all' : v.id)">
            {{ v.label }}
          </button>
        }
      </div>

      <div class="villain-grid">
        @for (m of list(); track m.slug) {
          <a class="card villain" [routerLink]="['/pelicula', m.slug]">
            <div class="villain__poster"><app-movie-poster [movie]="m" [badge]="false" /></div>
            <div>
              <p class="verdict" [class]="'verdict-' + m.villainVerdict">{{ m.villainVerdict }}</p>
              <h3>{{ m.villain }}</h3>
              <p>{{ m.title }}</p>
              <p>{{ m.villainNote || 'Sin nota extra.' }}</p>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .villain-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.9rem; }
    .villain { display: grid; grid-template-columns: 84px 1fr; gap: 0.9rem; align-items: start; }
    .villain h3 { font-size: 1.5rem; margin: 0.2rem 0; }
    .villain p { margin: 0; color: var(--text-muted); font-size: 0.88rem; }
  `
})
export default class VillanosPage {
  readonly movies = inject(MoviesService);
  readonly verdicts = VERDICTS;
  readonly filter = signal<'all' | VillainVerdict>('all');
  readonly stats = computed(() => this.movies.stats());
  readonly list = computed(() => {
    const f = this.filter();
    const rows = this.movies.countdown();
    return f === 'all' ? rows : rows.filter(m => m.villainVerdict === f);
  });
}
