import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Analog no usa este archivo como shell; el layout vive en src/app/app.ts */
@Component({
  selector: 'app-pages-shell',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class App {}
