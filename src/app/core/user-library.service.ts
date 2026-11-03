import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Movie, VillainVerdict } from './movie.model';

const KEY = 'camino-doomsday-library-v1';

export interface CustomDraft {
  title: string;
  year?: number;
  villain: string;
  villainVerdict: VillainVerdict;
  villainNote?: string;
  phase: 1 | 2 | 3 | 4 | 5;
  hero?: string;
  director?: string;
  runtime?: number;
  tags?: string;
  review: string;
  pros?: string;
  cons?: string;
  poster?: string;
  quote?: string;
}

interface LibraryState {
  favorites: string[];
  watchlist: string[];
  notes: Record<string, string>;
  scores: Record<string, number>;
  ranking: string[];
  custom: Movie[];
}

const EMPTY: LibraryState = {
  favorites: [],
  watchlist: [],
  notes: {},
  scores: {},
  ranking: [],
  custom: []
};

@Injectable({ providedIn: 'root' })
export class UserLibraryService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly state = signal<LibraryState>(this.read());

  readonly favorites = computed(() => this.state().favorites);
  readonly watchlist = computed(() => this.state().watchlist);
  readonly notes = computed(() => this.state().notes);
  readonly scores = computed(() => this.state().scores);
  readonly ranking = computed(() => this.state().ranking);
  readonly custom = computed(() => this.state().custom);

  isFavorite(slug: string) {
    return this.favorites().includes(slug);
  }

  isWatchlisted(slug: string) {
    return this.watchlist().includes(slug);
  }

  inRanking(slug: string) {
    return this.ranking().includes(slug);
  }

  noteFor(slug: string) {
    return this.notes()[slug] ?? '';
  }

  scoreFor(slug: string) {
    return this.scores()[slug] ?? 0;
  }

  toggleFavorite(slug: string) {
    this.patch(s => ({
      ...s,
      favorites: s.favorites.includes(slug)
        ? s.favorites.filter(x => x !== slug)
        : [...s.favorites, slug]
    }));
  }

  toggleWatchlist(slug: string) {
    this.patch(s => ({
      ...s,
      watchlist: s.watchlist.includes(slug)
        ? s.watchlist.filter(x => x !== slug)
        : [...s.watchlist, slug]
    }));
  }

  setNote(slug: string, note: string) {
    this.patch(s => ({ ...s, notes: { ...s.notes, [slug]: note } }));
  }

  setScore(slug: string, score: number) {
    this.patch(s => ({ ...s, scores: { ...s.scores, [slug]: score } }));
  }

  addToRanking(slug: string) {
    this.patch(s => (s.ranking.includes(slug) ? s : { ...s, ranking: [...s.ranking, slug] }));
  }

  removeFromRanking(slug: string) {
    this.patch(s => ({ ...s, ranking: s.ranking.filter(x => x !== slug) }));
  }

  moveRanking(slug: string, dir: -1 | 1) {
    this.patch(s => {
      const list = [...s.ranking];
      const i = list.indexOf(slug);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= list.length) return s;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...s, ranking: list };
    });
  }

  clearRanking() {
    this.patch(s => ({ ...s, ranking: [] }));
  }

  addCustom(draft: CustomDraft) {
    const slug = 'custom-' + Date.now();
    const movie: Movie = {
      rank: 0,
      slug,
      title: draft.title.trim(),
      poster: draft.poster?.trim() || '',
      phase: draft.phase,
      villain: draft.villain.trim(),
      villainVerdict: draft.villainVerdict,
      villainNote: draft.villainNote?.trim(),
      pros: splitLines(draft.pros),
      cons: splitLines(draft.cons),
      review: draft.review.trim(),
      year: draft.year,
      director: draft.director?.trim(),
      hero: draft.hero?.trim(),
      runtime: draft.runtime,
      tags: splitComma(draft.tags),
      quote: draft.quote?.trim(),
      custom: true
    };
    this.patch(s => ({ ...s, custom: [movie, ...s.custom] }));
    return movie;
  }

  removeCustom(slug: string) {
    this.patch(s => ({
      ...s,
      custom: s.custom.filter(m => m.slug !== slug),
      favorites: s.favorites.filter(x => x !== slug),
      watchlist: s.watchlist.filter(x => x !== slug),
      ranking: s.ranking.filter(x => x !== slug)
    }));
  }

  private patch(fn: (s: LibraryState) => LibraryState) {
    const next = fn(this.state());
    this.state.set(next);
    this.write(next);
  }

  private read(): LibraryState {
    if (!this.browser) return EMPTY;
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
    } catch {
      return EMPTY;
    }
  }

  private write(state: LibraryState) {
    if (!this.browser) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }
}

function splitLines(value?: string): string[] {
  return (value ?? '')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
}

function splitComma(value?: string): string[] {
  return (value ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}
