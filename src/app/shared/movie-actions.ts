import { Component, inject, input } from '@angular/core';
import { UserLibraryService } from '../core/user-library.service';

@Component({
  selector: 'app-movie-actions',
  standalone: true,
  template: `
    <div class="actions">
      <button type="button" class="chip" [class.chip--on]="lib.isFavorite(slug())" (click)="lib.toggleFavorite(slug()); $event.stopPropagation()">
        {{ lib.isFavorite(slug()) ? '♥ Guardada' : '♡ Guardar' }}
      </button>
      <button type="button" class="chip" [class.chip--on]="lib.isWatchlisted(slug())" (click)="lib.toggleWatchlist(slug()); $event.stopPropagation()">
        {{ lib.isWatchlisted(slug()) ? 'En lista' : '+ Ver después' }}
      </button>
      <button type="button" class="chip" [class.chip--on]="lib.inRanking(slug())" (click)="toggleRank(); $event.stopPropagation()">
        {{ lib.inRanking(slug()) ? 'En tu ranking' : 'A tu ranking' }}
      </button>
    </div>
  `,
  styles: `
    .actions { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  `
})
export class MovieActions {
  readonly lib = inject(UserLibraryService);
  readonly slug = input.required<string>();

  toggleRank() {
    if (this.lib.inRanking(this.slug())) this.lib.removeFromRanking(this.slug());
    else this.lib.addToRanking(this.slug());
  }
}
