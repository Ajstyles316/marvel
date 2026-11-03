import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { CustomDraft, UserLibraryService } from '../core/user-library.service';
import { VERDICTS } from '../core/movie.model';
import { MoviePoster } from '../shared/movie-poster';
import { MoviesService } from '../core/movies.service';

export const routeMeta = { title: 'Tu colección' } satisfies RouteMeta;

const EMPTY: CustomDraft = {
  title: '',
  villain: '',
  villainVerdict: 'correcto',
  phase: 3,
  review: ''
};

@Component({
  selector: 'app-coleccion-page',
  standalone: true,
  imports: [FormsModule, RouterLink, MoviePoster],
  template: `
    <section class="page container">
      <p class="kicker">Expandí el canon</p>
      <h1 class="page-title">Colección</h1>
      <p class="page-subtitle">
        Sumá series, especiales, películas que falten o lo que se te ocurra: villano, tags, pros, contras, póster por URL y tu crítica.
      </p>

      <div class="stat-grid">
        <div class="card stat"><b>{{ lib.custom().length }}</b>entradas tuyas</div>
        <div class="card stat"><b>{{ lib.favorites().length }}</b>favoritas</div>
        <div class="card stat"><b>{{ lib.watchlist().length }}</b>ver después</div>
      </div>

      <article class="card" style="margin-top:1.4rem">
        <h2>Agregar algo nuevo</h2>
        <form class="form-grid" (ngSubmit)="save()">
          <label>Título *
            <input class="field" name="title" [(ngModel)]="draft.title" required />
          </label>
          <label>Año
            <input class="field" type="number" name="year" [(ngModel)]="draft.year" />
          </label>
          <label>Héroe / protagonista
            <input class="field" name="hero" [(ngModel)]="draft.hero" />
          </label>
          <label>Director
            <input class="field" name="director" [(ngModel)]="draft.director" />
          </label>
          <label>Villano *
            <input class="field" name="villain" [(ngModel)]="draft.villain" required />
          </label>
          <label>Veredicto
            <select class="select" name="verdict" [(ngModel)]="draft.villainVerdict">
              @for (v of verdicts; track v.id) {
                <option [value]="v.id">{{ v.label }}</option>
              }
            </select>
          </label>
          <label>Nota del villano
            <input class="field" name="villainNote" [(ngModel)]="draft.villainNote" />
          </label>
          <label>Piso del ranking
            <select class="select" name="phase" [(ngModel)]="draft.phase">
              <option [ngValue]="1">1 Fondo de olla</option>
              <option [ngValue]="2">2 Zona meh</option>
              <option [ngValue]="3">3 Decentes</option>
              <option [ngValue]="4">4 Respect</option>
              <option [ngValue]="5">5 All Elite</option>
            </select>
          </label>
          <label>Duración (min)
            <input class="field" type="number" name="runtime" [(ngModel)]="draft.runtime" />
          </label>
          <label>URL del póster
            <input class="field" name="poster" [(ngModel)]="draft.poster" placeholder="https://…" />
          </label>
          <label class="full">Tags (separados por coma)
            <input class="field" name="tags" [(ngModel)]="draft.tags" placeholder="disney+, especial, what if…" />
          </label>
          <label class="full">Frase / quote
            <input class="field" name="quote" [(ngModel)]="draft.quote" />
          </label>
          <label class="full">Crítica *
            <textarea class="textarea" name="review" [(ngModel)]="draft.review" required></textarea>
          </label>
          <label>Pros (uno por línea)
            <textarea class="textarea" name="pros" [(ngModel)]="draft.pros"></textarea>
          </label>
          <label>Contras (uno por línea)
            <textarea class="textarea" name="cons" [(ngModel)]="draft.cons"></textarea>
          </label>
          <div class="full">
            <button class="btn btn--primary" type="submit">Agregar a la colección</button>
            @if (flash()) { <span class="ok"> {{ flash() }}</span> }
          </div>
        </form>
      </article>

      <div class="section-head">
        <h2>Lo que agregaste</h2>
      </div>
      <div class="stack">
        @for (m of lib.custom(); track m.slug) {
          <article class="list-row">
            <a [routerLink]="['/pelicula', m.slug]"><app-movie-poster [movie]="m" [badge]="false" /></a>
            <div>
              <a [routerLink]="['/pelicula', m.slug]"><h3>{{ m.title }}</h3></a>
              <p>{{ m.year }} · {{ m.villain }} · {{ m.hero }}</p>
            </div>
            <button type="button" class="btn" (click)="lib.removeCustom(m.slug)">Borrar</button>
          </article>
        } @empty {
          <p class="empty">Todavía no hay entradas custom. El formulario de arriba es el camino.</p>
        }
      </div>

      <div class="section-head"><h2>Ver después</h2></div>
      <div class="grid-movies">
        @for (slug of lib.watchlist(); track slug) {
          @if (movies.bySlug(slug); as m) {
            <a class="movie-card" [routerLink]="['/pelicula', m.slug]">
              <app-movie-poster [movie]="m" />
              <h3>{{ m.title }}</h3>
            </a>
          }
        } @empty {
          <p class="empty">Tu watchlist está vacía.</p>
        }
      </div>
    </section>
  `,
  styles: `
    h2 { font-size: 2rem; margin-bottom: 1rem; }
    .stack { display: grid; gap: 0.7rem; }
    .ok { color: var(--verdict-brillante); margin-left: 0.6rem; }
  `
})
export default class ColeccionPage {
  readonly lib = inject(UserLibraryService);
  readonly movies = inject(MoviesService);
  readonly verdicts = VERDICTS;
  draft: CustomDraft = { ...EMPTY };
  readonly flash = signal('');

  save() {
    if (!this.draft.title.trim() || !this.draft.villain.trim() || !this.draft.review.trim()) return;
    const movie = this.lib.addCustom(this.draft);
    this.draft = { ...EMPTY };
    this.flash.set(`Se agregó “${movie.title}”.`);
  }
}
