import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface Tab {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <div class="container topbar__inner">
        <a routerLink="/inicio" class="brand">
          <span class="brand__top">Camino a</span>
          <span class="brand__main">Avengers: <b>Doomsday</b></span>
        </a>

        <nav class="tabs" aria-label="Secciones">
          @for (tab of tabs; track tab.path) {
            <a
              class="tab"
              [routerLink]="'/' + tab.path"
              routerLinkActive="tab--active"
            >
              {{ tab.label }}
            </a>
          }
        </nav>
      </div>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="container">
        Ranking personal del UCM · Hecho con Angular
      </div>
    </footer>
  `,
  styles: [
    `
      .topbar {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(11, 11, 16, 0.82);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
      }

      .topbar__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
      }

      .brand {
        display: flex;
        flex-direction: column;
        line-height: 1;
        flex-shrink: 0;
      }

      .brand__top {
        font-size: 0.7rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .brand__main {
        font-family: var(--font-title);
        font-size: 1.7rem;
        letter-spacing: 0.05em;
      }

      .brand__main b {
        font-weight: 400;
        color: var(--marvel-red);
      }

      .tabs {
        display: flex;
        gap: 0.25rem;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .tabs::-webkit-scrollbar {
        display: none;
      }

      .tab {
        position: relative;
        padding: 0.55rem 0.9rem;
        border-radius: 999px;
        font-size: 0.88rem;
        font-weight: 500;
        color: var(--text-muted);
        white-space: nowrap;
        transition: color 0.2s, background 0.2s;
      }

      .tab:hover {
        color: var(--text);
        background: rgba(255, 255, 255, 0.05);
      }

      .tab--active {
        color: #fff;
        background: var(--marvel-red);
        box-shadow: 0 4px 18px rgba(230, 36, 41, 0.4);
      }

      .footer {
        border-top: 1px solid var(--border);
        padding: 1.5rem 0;
        text-align: center;
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      @media (max-width: 820px) {
        .topbar__inner {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .tabs {
          width: 100%;
        }
      }
    `
  ]
})
export class AppComponent {
  readonly tabs: Tab[] = [
    { path: 'inicio', label: 'Inicio' },
    { path: 'ranking', label: 'Ranking' },
    { path: 'top-5', label: 'Top 5' },
    { path: 'fases', label: 'Fases' },
    { path: 'villanos', label: 'Villanos' },
    { path: 'mi-ranking', label: 'Arma tu ranking' }
  ];
}