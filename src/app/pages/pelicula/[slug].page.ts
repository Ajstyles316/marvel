import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RouteMeta } from '@analogjs/router';
import { MoviesService } from '../../core/movies.service';
import { UserLibraryService } from '../../core/user-library.service';
import { MoviePoster } from '../../shared/movie-poster';
import { MovieActions } from '../../shared/movie-actions';
import { PHASES } from '../../core/movie.model';

export const routeMeta = {
  title: 'Película'
} satisfies RouteMeta;

@Component({
  selector: 'app-pelicula-page',
  standalone: true,
  imports: [RouterLink, MoviePoster, MovieActions],
  template: `
    <section class="page container">
      @if (movie(); as m) {
        <a routerLink="/ranking" class="back">← Ranking</a>
        <div class="detail">
          <app-movie-poster [movie]="m" size="lg" />
          <div>
            <p class="kicker">{{ m.saga }} · MCU Fase {{ m.mcuPhase || '—' }}</p>
            <h1 class="page-title">{{ m.title }}</h1>
            <p class="page-subtitle">{{ m.quote || m.review.slice(0, 160) }}</p>
            <div class="meta">
              @if (m.rank) { <span class="chip chip--on">#{{ m.rank }}</span> }
              @if (m.custom) { <span class="chip chip--on">Tuya</span> }
              <span class="chip">{{ m.year || 's/año' }}</span>
              <span class="chip">{{ m.runtime ? m.runtime + ' min' : 'duración n/d' }}</span>
              <span class="chip">{{ m.director || 'Director n/d' }}</span>
              <span class="chip">{{ m.hero || 'Héroe n/d' }}</span>
              <span class="phase-pill" [style.color]="phaseColor(m.phase)">Piso {{ m.phase }}</span>
            </div>
            <p class="verdict" [class]="'verdict-' + m.villainVerdict">{{ m.villain }} · {{ m.villainVerdict }}</p>
            @if (m.villainNote) { <p class="note">{{ m.villainNote }}</p> }
            <app-movie-actions [slug]="m.slug" />

            <div class="score-row">
              <span>Tu puntaje</span>
              @for (n of stars; track n) {
                <button type="button" class="star" [class.star--on]="lib.scoreFor(m.slug) >= n" (click)="lib.setScore(m.slug, n)">★</button>
              }
            </div>
            <label>Tu nota
              <textarea class="textarea" [value]="lib.noteFor(m.slug)" (input)="lib.setNote(m.slug, $any($event.target).value)" placeholder="Lo que no querés olvidar…"></textarea>
            </label>
          </div>
        </div>

        <article class="card review">
          <h2>La crítica</h2>
          <p>{{ m.review }}</p>
          <div class="proscons">
            <div>
              <h3>Pros</h3>
              <ul>
                @for (p of m.pros; track p) { <li>{{ p }}</li> }
                @empty { <li>Sin pros cargados.</li> }
              </ul>
            </div>
            <div>
              <h3>Contras</h3>
              <ul>
                @for (c of m.cons; track c) { <li>{{ c }}</li> }
                @empty { <li>Sin contras. Rara avis.</li> }
              </ul>
            </div>
          </div>
          @if (m.tags?.length) {
            <div class="meta">
              @for (t of m.tags; track t) { <span class="chip">{{ t }}</span> }
            </div>
          }
        </article>

        @if (related().length) {
          <div class="section-head"><h2>Cerca en el ranking</h2></div>
          <div class="grid-movies">
            @for (r of related(); track r.slug) {
              <a class="movie-card" [routerLink]="['/pelicula', r.slug]">
                <app-movie-poster [movie]="r" />
                <h3>{{ r.title }}</h3>
              </a>
            }
          </div>
        }
      } @else if (movies.loaded()) {
        <h1 class="page-title">No está en el archivo</h1>
        <p class="page-subtitle">Esa ficha no existe. Volvé al ranking o agregala en Colección.</p>
        <a routerLink="/coleccion" class="btn btn--primary">Ir a colección</a>
      } @else {
        <p class="page-subtitle">Cargando…</p>
      }
    </section>
  `,
  styles: `
    .back { color: var(--text-muted); display: inline-block; margin-bottom: 1rem; }
    .detail { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; align-items: start; }
    .meta { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1rem 0; }
    .note { color: var(--text-muted); }
    .score-row { display: flex; align-items: center; gap: 0.35rem; margin: 1rem 0; }
    .star { background: none; border: 0; font-size: 1.4rem; cursor: pointer; color: #c4b48a; }
    .star--on { color: var(--marvel-red); }
    .review { margin-top: 1.6rem; }
    .review h2, .review h3 { font-size: 1.8rem; margin-bottom: 0.6rem; }
    .proscons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
    @media (max-width: 800px) {
      .detail, .proscons { grid-template-columns: 1fr; }
    }
  `
})
export default class PeliculaPage {
  private route = inject(ActivatedRoute);
  readonly movies = inject(MoviesService);
  readonly lib = inject(UserLibraryService);
  readonly stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug') ?? '')), { initialValue: '' });
  readonly movie = computed(() => this.movies.bySlug(this.slug()));
  readonly related = computed(() => {
    const m = this.movie();
    return m ? this.movies.related(m) : [];
  });

  phaseColor(id: number) {
    return PHASES.find(p => p.id === id)?.color ?? '#0a2a6b';
  }
}
