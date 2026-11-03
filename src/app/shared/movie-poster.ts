import { Component, input } from '@angular/core';
import { Movie } from '../core/movie.model';

@Component({
  selector: 'app-movie-poster',
  standalone: true,
  template: `
    <div class="poster" [class.poster--lg]="size() === 'lg'">
      @if (movie().poster) {
        <img [src]="movie().poster" [alt]="movie().title" loading="lazy" />
      } @else {
        <div class="poster__fallback">
          <span>{{ initials() }}</span>
        </div>
      }
      @if (badge()) {
        <span class="poster__rank">#{{ movie().rank || '—' }}</span>
      }
    </div>
  `,
  styles: `
    .poster {
      position: relative;
      aspect-ratio: 2 / 3;
      border-radius: 8px;
      overflow: hidden;
      background: #fff4cf;
      border: 3px solid #1a1208;
      box-shadow: 5px 5px 0 #1a1208;
    }
    .poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.35s ease;
    }
    :host-context(.movie-card:hover) img,
    :host-context(a:hover) img {
      transform: scale(1.05);
    }
    .poster__rank {
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
      background: #ffe14a;
      color: #1a1208;
      border: 2px solid #1a1208;
      font-family: var(--font-title);
      font-size: 1.15rem;
      letter-spacing: 0.04em;
      padding: 0.1rem 0.4rem;
      box-shadow: 2px 2px 0 #ed1c24;
    }
    .poster__fallback {
      height: 100%;
      display: grid;
      place-items: center;
      background: linear-gradient(160deg, #ed1c24, #0b63ce 55%, #1f8a4c);
      font-family: var(--font-title);
      font-size: 2.4rem;
      color: #ffe14a;
    }
  `
})
export class MoviePoster {
  readonly movie = input.required<Movie>();
  readonly badge = input(true);
  readonly size = input<'md' | 'lg'>('md');

  initials() {
    return this.movie()
      .title.split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();
  }
}
