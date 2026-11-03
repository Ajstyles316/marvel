import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { MoviesService } from '../core/movies.service';
import { MoviePoster } from '../shared/movie-poster';

export const routeMeta = {
  title: 'Camino a Doomsday'
} satisfies RouteMeta;

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [RouterLink, MoviePoster],
  template: `
    <section class="page container">
      @if (featured(); as movie) {
        <div class="hero">
          <div class="hero__mosaic" aria-hidden="true">
            @for (p of mosaic(); track p.slug) {
              <img [src]="p.poster" [alt]="" />
            }
          </div>
          <div class="hero__copy">
            <p class="kicker">Ranking personal · UCM</p>
            <h1 class="page-title">De The Marvels a Infinity War.</h1>
            <p class="page-subtitle">
              Un recuento a todo color hacia Avengers: Doomsday, con los pósters de assets, críticas, villanos y espacio para sumar lo que falte.
            </p>
            <div class="hero__cta">
              <a routerLink="/ranking" class="btn btn--primary">Explorar el ranking</a>
              <a routerLink="/coleccion" class="btn btn--gold">Sumar una película</a>
              <button type="button" class="btn" (click)="shuffle()">Película al azar</button>
            </div>
          </div>
          <a class="hero__poster" [routerLink]="['/pelicula', movie.slug]">
            <app-movie-poster [movie]="movie" />
            <span class="hero__caption">#{{ movie.rank }} · {{ movie.title }}</span>
          </a>
        </div>
      }

      <div class="stat-grid">
        <div class="card stat"><b>{{ stats().catalog }}</b>en el ranking</div>
        <div class="card stat"><b>{{ stats().custom }}</b>agregadas por vos</div>
        <div class="card stat"><b>{{ stats().verdicts.brillante }}</b>villanos brillantes</div>
        <div class="card stat"><b>{{ stats().favorites }}</b>favoritas</div>
      </div>

      <div class="toolbar">
        <input class="search" type="search" placeholder="Buscar título, villano, héroe o tag…" [value]="q()" (input)="q.set($any($event.target).value)" />
      </div>

      @if (q().trim()) {
        <div class="results">
          @for (m of filtered(); track m.slug) {
            <a class="list-row" [routerLink]="['/pelicula', m.slug]">
              <app-movie-poster [movie]="m" [badge]="false" />
              <div>
                <h3>{{ m.title }}</h3>
                <p>#{{ m.rank || 'custom' }} · {{ m.villain }} · {{ m.year }}</p>
              </div>
            </a>
          } @empty {
            <p class="empty">Nada coincide con “{{ q() }}”.</p>
          }
        </div>
      }

      <div class="section-head">
        <div>
          <p class="kicker">Cima</p>
          <h2>Top 5 All Elite</h2>
        </div>
        <a routerLink="/top-5" class="btn btn--ghost">Ver podium</a>
      </div>
      <div class="grid-movies">
        @for (m of movies.top5(); track m.slug) {
          <a class="movie-card" [routerLink]="['/pelicula', m.slug]">
            <app-movie-poster [movie]="m" />
            <h3>{{ m.title }}</h3>
            <p>{{ m.quote }}</p>
          </a>
        }
      </div>

      <div class="section-head">
        <div>
          <p class="kicker">El fondo</p>
          <h2>Las tres peores</h2>
        </div>
        <a routerLink="/fases" class="btn btn--ghost">Ver fases</a>
      </div>
      <div class="grid-movies">
        @for (m of movies.worst(); track m.slug) {
          <a class="movie-card" [routerLink]="['/pelicula', m.slug]">
            <app-movie-poster [movie]="m" />
            <h3>{{ m.title }}</h3>
            <p>{{ m.villain }}</p>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      display: grid;
      grid-template-columns: 1.3fr 260px;
      gap: 2rem;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.4rem;
      border: 4px solid #1a1208;
      border-radius: 16px;
      overflow: hidden;
      background: #fffdf6;
      box-shadow: 8px 8px 0 #ed1c24;
    }
    .hero__mosaic {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      opacity: 0.22;
      pointer-events: none;
    }
    .hero__mosaic img { width: 100%; height: 160px; object-fit: cover; }
    .hero__copy, .hero__poster { position: relative; z-index: 1; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.3rem; }
    .hero__poster { max-width: 260px; }
    .hero__caption {
      display: block;
      margin-top: 0.6rem;
      color: var(--marvel-red);
      font-family: var(--font-title);
      font-size: 1.4rem;
      text-shadow: none;
    }
    .results { display: grid; gap: 0.7rem; margin-bottom: 1.5rem; }
    @media (max-width: 800px) {
      .hero { grid-template-columns: 1fr; }
      .hero__poster { max-width: 200px; }
    }
  `
})
export default class InicioPage {
  readonly movies = inject(MoviesService);
  private readonly router = inject(Router);
  readonly q = signal('');
  readonly stats = computed(() => this.movies.stats());
  readonly featured = computed(() => this.movies.byRank()[0]);
  readonly mosaic = computed(() => this.movies.countdown().filter(m => m.poster).slice(0, 12));
  readonly filtered = computed(() => {
    const q = this.q().trim().toLowerCase();
    if (!q) return [];
    return this.movies.movies().filter(m =>
      [m.title, m.villain, m.hero, m.director, ...(m.tags ?? [])].join(' ').toLowerCase().includes(q)
    );
  });

  shuffle() {
    const list = this.movies.movies();
    if (!list.length) return;
    const pick = list[Math.floor(Math.random() * list.length)];
    this.router.navigate(['/pelicula', pick.slug]);
  }
}
