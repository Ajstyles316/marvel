import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface Tab {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <div class="stripe stripe--blue"></div>
      <div class="container topbar__inner">
        <a routerLink="/" class="brand">
          <span class="brand__top">Camino a</span>
          <span class="brand__main">Avengers: <b>Doomsday</b></span>
        </a>
        <nav class="tabs" aria-label="Secciones">
          @for (tab of tabs; track tab.path) {
            <a
              class="tab"
              [routerLink]="tab.path"
              routerLinkActive="tab--active"
              [routerLinkActiveOptions]="{ exact: tab.exact === true }"
            >
              {{ tab.label }}
            </a>
          }
        </nav>
      </div>
      <div class="stripe stripe--green"></div>
    </header>
    <main>
      <router-outlet />
    </main>
    <footer class="footer">
      <div class="container">Ranking personal del UCM · Hecho con los pósters y datos de assets</div>
    </footer>
  `,
  styles: `
    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: var(--marvel-red);
      border-bottom: 4px solid var(--ink);
    }
    .stripe { height: 8px; }
    .stripe--blue { background: linear-gradient(90deg, #0b63ce, #7ec8ff, #ffe14a, #ed1c24); }
    .stripe--green { background: linear-gradient(90deg, #1f8a4c, #ffe14a, #0b63ce); }
    .topbar__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding: 0.75rem 0;
    }
    .brand { display: flex; flex-direction: column; line-height: 1; flex-shrink: 0; color: #fff; }
    .brand__top { font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.9; }
    .brand__main { font-family: var(--font-title); font-size: 2rem; letter-spacing: 0.04em; text-shadow: 3px 3px 0 #0a2a6b; }
    .brand__main b { font-weight: 400; color: #9dffb5; }
    .tabs { display: flex; gap: 0.35rem; overflow-x: auto; scrollbar-width: none; }
    .tabs::-webkit-scrollbar { display: none; }
    .tab {
      padding: 0.45rem 0.85rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 800;
      color: #fff;
      white-space: nowrap;
      border: 2px solid transparent;
    }
    .tab:hover { background: rgba(255,255,255,0.14); }
    .tab--active {
      color: var(--ink);
      background: var(--comic-yellow);
      border-color: var(--ink);
      box-shadow: 3px 3px 0 #0a2a6b;
    }
    .footer {
      border-top: 4px solid var(--ink);
      background: var(--cap-navy);
      color: #ffe14a;
      padding: 1.3rem 0;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 800;
    }
    @media (max-width: 900px) {
      .topbar__inner { flex-direction: column; align-items: flex-start; gap: 0.65rem; }
      .tabs { width: 100%; }
    }
  `
})
export class App {
  readonly tabs: Tab[] = [
    { path: '/', label: 'Inicio', exact: true },
    { path: '/ranking', label: 'Ranking' },
    { path: '/top-5', label: 'Top 5' },
    { path: '/fases', label: 'Fases' },
    { path: '/villanos', label: 'Villanos' },
    { path: '/mi-ranking', label: 'Tu ranking' },
    { path: '/coleccion', label: 'Colección' }
  ];
}
