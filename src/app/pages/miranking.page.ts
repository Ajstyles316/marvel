import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Movie } from '../core/movie.model';
import { MoviesService } from '../core/movies.service';
import { UserLibraryService } from '../core/user-library.service';
import { MoviePoster } from '../shared/movie-poster';

export const routeMeta = { title: 'Tu ranking' } satisfies RouteMeta;

@Component({
  selector: 'app-mi-ranking-page',
  standalone: true,
  imports: [RouterLink, MoviePoster],
  template: `
    <section class="page container">
      <p class="kicker">Armalo vos</p>
      <h1 class="page-title">Tu ranking</h1>
      <p class="page-subtitle">Elegí películas, reordenalas y dejá una nota. Se guarda en este navegador.</p>

      <div class="toolbar">
        <input class="search" type="search" placeholder="Buscar para agregar…" [value]="q()" (input)="q.set($any($event.target).value)" />
        <button type="button" class="btn" (click)="copy()">Copiar lista</button>
        <button type="button" class="btn" (click)="lib.clearRanking()">Vaciar</button>
      </div>

      <div class="split">
        <div>
          <h2>Disponibles</h2>
          <div class="stack">
            @for (m of available(); track m.slug) {
              <div class="list-row">
                <app-movie-poster [movie]="m" [badge]="false" />
                <div>
                  <h3>{{ m.title }}</h3>
                  <p>{{ m.year }} · {{ m.villain }}</p>
                </div>
                <button type="button" class="btn btn--primary" (click)="lib.addToRanking(m.slug)">Agregar</button>
              </div>
            }
          </div>
        </div>
        <div>
          <h2>Tu orden ({{ mine().length }})</h2>
          <div class="stack">
            @for (m of mine(); track m.slug; let i = $index) {
              <article class="card ranked">
                <span class="pos">{{ i + 1 }}</span>
                <app-movie-poster [movie]="m" [badge]="false" />
                <div>
                  <a [routerLink]="['/pelicula', m.slug]"><h3>{{ m.title }}</h3></a>
                  <div class="row-btns">
                    <button type="button" class="chip" (click)="lib.moveRanking(m.slug, -1)">↑</button>
                    <button type="button" class="chip" (click)="lib.moveRanking(m.slug, 1)">↓</button>
                    <button type="button" class="chip" (click)="lib.removeFromRanking(m.slug)">Quitar</button>
                  </div>
                  <textarea class="textarea" [value]="lib.noteFor(m.slug)" (input)="lib.setNote(m.slug, $any($event.target).value)" placeholder="Tu nota…"></textarea>
                </div>
              </article>
            } @empty {
              <p class="empty">Todavía no agregaste nada. Empezá por la izquierda o desde cualquier ficha.</p>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: 2rem; margin: 0 0 0.8rem; }
    .split { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
    .stack { display: grid; gap: 0.7rem; }
    .ranked { display: grid; grid-template-columns: auto 72px 1fr; gap: 0.8rem; align-items: start; }
    .pos { font-family: var(--font-title); font-size: 2rem; color: var(--gold); }
    .row-btns { display: flex; gap: 0.35rem; margin: 0.4rem 0; }
    @media (max-width: 900px) { .split { grid-template-columns: 1fr; } }
  `
})
export default class MiRankingPage {
  readonly movies = inject(MoviesService);
  readonly lib = inject(UserLibraryService);
  readonly q = signal('');

  readonly mine = computed(() =>
    this.lib
      .ranking()
      .map(slug => this.movies.bySlug(slug))
      .filter((m): m is Movie => !!m)
  );

  readonly available = computed(() => {
    const q = this.q().trim().toLowerCase();
    return this.movies.movies().filter(m => {
      if (this.lib.inRanking(m.slug)) return false;
      if (!q) return true;
      return m.title.toLowerCase().includes(q);
    });
  });

  copy() {
    const text = this.mine()
      .map((m, i) => `${i + 1}. ${m!.title}`)
      .join('\n');
    navigator.clipboard?.writeText(text || 'Ranking vacío');
  }
}
