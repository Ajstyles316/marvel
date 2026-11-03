import { Injectable, computed, inject, signal } from '@angular/core';
import catalog from '../../assets/data/movies.json';
import { Movie, PHASES, VillainVerdict, rankScore } from './movie.model';
import { hydrateMovie } from './movie-catalog';
import { UserLibraryService } from './user-library.service';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private library = inject(UserLibraryService);

  readonly catalog = signal<Movie[]>((catalog as Movie[]).map(hydrateMovie));
  readonly loaded = signal(true);

  readonly movies = computed(() => [...this.library.custom(), ...this.catalog()]);
  readonly countdown = computed(() =>
    [...this.catalog()].sort((a, b) => b.rank - a.rank)
  );
  readonly byRank = computed(() => [...this.catalog()].sort((a, b) => a.rank - b.rank));
  readonly top5 = computed(() => this.byRank().slice(0, 5));
  readonly worst = computed(() => this.countdown().slice(0, 3));

  readonly stats = computed(() => {
    const list = this.catalog();
    const verdicts = list.reduce(
      (acc, m) => {
        acc[m.villainVerdict] += 1;
        return acc;
      },
      { desperdiciado: 0, correcto: 0, brillante: 0 } as Record<VillainVerdict, number>
    );
    return {
      total: list.length + this.library.custom().length,
      catalog: list.length,
      custom: this.library.custom().length,
      favorites: this.library.favorites().length,
      watchlist: this.library.watchlist().length,
      verdicts,
      phases: PHASES.map(p => ({ ...p, count: list.filter(m => m.phase === p.id).length }))
    };
  });

  bySlug(slug: string): Movie | undefined {
    return this.movies().find(m => m.slug === slug);
  }

  byPhase(phase: number) {
    return this.countdown().filter(m => m.phase === phase);
  }

  related(movie: Movie, limit = 4): Movie[] {
    return this.catalog()
      .filter(m => m.slug !== movie.slug && (m.phase === movie.phase || m.hero === movie.hero))
      .slice(0, limit);
  }

  score(movie: Movie) {
    return rankScore(movie.rank || 38);
  }
}
