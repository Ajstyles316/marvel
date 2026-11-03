import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { MoviesService } from '../core/movies.service';
import { PHASES, VERDICTS, VillainVerdict } from '../core/movie.model';
import { UserLibraryService } from '../core/user-library.service';
import { MoviePoster } from '../shared/movie-poster';
import { MovieActions } from '../shared/movie-actions';

export const routeMeta = { title: 'Ranking UCM' } satisfies RouteMeta;

@Component({
  selector: 'app-ranking-page',
  standalone: true,
  imports: [RouterLink, MoviePoster, MovieActions],
  template: `
    <section class="page container">
      <p class="kicker">Countdown 38 → 1</p>
      <h1 class="page-title">Ranking</h1>
      <p class="page-subtitle">Filtrá, buscá y abrí cada ficha. Guardá, anotá o meté una peli en tu ranking personal.</p>

      <div class="toolbar">
        <input class="search" type="search" placeholder="Buscar…" [value]="q()" (input)="q.set($any($event.target).value)" />
        <select class="select" [value]="phase()" (change)="phase.set($any($event.target).value)">
          <option value="all">Todas las fases</option>
          @for (p of phases; track p.id) {
            <option [value]="p.id">{{ p.id }}. {{ p.name }}</option>
          }
        </select>
        <select class="select" [value]="verdict()" (change)="verdict.set($any($event.target).value)">
          <option value="all">Todos los villanos</option>
          @for (v of verdicts; track v.id) {
            <option [value]="v.id">{{ v.label }}</option>
          }
        </select>
        <select class="select" [value]="sort()" (change)="sort.set($any($event.target).value)">
          <option value="rank-desc">Del 38 al 1</option>
          <option value="rank-asc">Del 1 al 38</option>
          <option value="year">Por año</option>
          <option value="title">A-Z</option>
        </select>
        <button type="button" class="chip" [class.chip--on]="onlyFav()" (click)="onlyFav.set(!onlyFav())">Solo guardadas</button>
        <button type="button" class="chip" [class.chip--on]="includeCustom()" (click)="includeCustom.set(!includeCustom())">Incluir las mías</button>
        <button type="button" class="chip" [class.chip--on]="view() === 'grid'" (click)="view.set('grid')">Grilla</button>
        <button type="button" class="chip" [class.chip--on]="view() === 'list'" (click)="view.set('list')">Lista</button>
      </div>

      <p class="page-subtitle">{{ filtered().length }} películas</p>

      @if (view() === 'grid') {
        <div class="grid-movies">
          @for (m of filtered(); track m.slug) {
            <a class="movie-card" [routerLink]="['/pelicula', m.slug]">
              <app-movie-poster [movie]="m" />
              <h3>{{ m.title }}</h3>
              <p>{{ m.year }} · {{ m.villain }}</p>
            </a>
          }
        </div>
      } @else {
        <div class="stack">
          @for (m of filtered(); track m.slug) {
            <article class="list-row list-row--wide">
              <a [routerLink]="['/pelicula', m.slug]"><app-movie-poster [movie]="m" /></a>
              <div>
                <a [routerLink]="['/pelicula', m.slug]"><h3>{{ m.title }}</h3></a>
                <p>{{ m.year }} · {{ m.director }} · {{ m.hero }}</p>
                <p class="verdict" [class]="'verdict-' + m.villainVerdict">{{ m.villain }}</p>
                <p>{{ m.quote || m.review.slice(0, 140) }}…</p>
                <app-movie-actions [slug]="m.slug" />
              </div>
              <span class="score">{{ movies.score(m) }}</span>
            </article>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .stack { display: grid; gap: 0.8rem; }
    .list-row--wide { grid-template-columns: 92px 1fr auto; align-items: start; }
    .score {
      font-family: var(--font-title);
      font-size: 2.2rem;
      color: var(--marvel-red);
      text-shadow: none;
      background: var(--comic-yellow);
      border: 3px solid var(--ink);
      padding: 0.15rem 0.45rem;
      box-shadow: 3px 3px 0 var(--cap-blue);
    }
  `
})
export default class RankingPage {
  readonly movies = inject(MoviesService);
  readonly lib = inject(UserLibraryService);
  readonly phases = PHASES;
  readonly verdicts = VERDICTS;
  readonly q = signal('');
  readonly phase = signal<'all' | string>('all');
  readonly verdict = signal<'all' | VillainVerdict | string>('all');
  readonly sort = signal('rank-desc');
  readonly onlyFav = signal(false);
  readonly includeCustom = signal(true);
  readonly view = signal<'grid' | 'list'>('list');

  readonly filtered = computed(() => {
    let list = this.includeCustom() ? [...this.movies.movies()] : [...this.movies.catalog()];
    const q = this.q().trim().toLowerCase();
    if (q) {
      list = list.filter(m =>
        [m.title, m.villain, m.hero, m.director, ...(m.tags ?? [])].join(' ').toLowerCase().includes(q)
      );
    }
    if (this.phase() !== 'all') list = list.filter(m => String(m.phase) === this.phase());
    if (this.verdict() !== 'all') list = list.filter(m => m.villainVerdict === this.verdict());
    if (this.onlyFav()) list = list.filter(m => this.lib.isFavorite(m.slug));
    switch (this.sort()) {
      case 'rank-asc':
        list.sort((a, b) => a.rank - b.rank);
        break;
      case 'year':
        list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        break;
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => b.rank - a.rank);
    }
    return list;
  });
}
