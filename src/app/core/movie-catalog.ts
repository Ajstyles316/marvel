import { Movie } from './movie.model';

function img(file: string): string {
  return '/assets/img/' + encodeURIComponent(file);
}

export const POSTERS: Record<string, string> = {
  'the-marvels': img('THE MARVELS (2023).jpg'),
  quantumania: img('Ant man quantaminia trailer on 7pm.jpg'),
  'brave-new-world': img('801640802460778686.jpg'),
  'love-and-thunder': img('thor love.jpg'),
  'capitana-marvel': img('Capitana Marvel (FEBRER).jpg'),
  'far-from-home': img('#movieposters #2019s #spiderman #farfromhome.jpg'),
  'iron-man-3': img('iron man 3.jpg'),
  'thor-dark-world': img('Thor 2_ The Dark World (2013) Watch Online Full Movie Hindi English Dual Audio HDRip, MKV 720p, 480p.jpg'),
  'thor-ragnarok': img('Thor_ Ragnarok (2017) Movie Poster_.jpg'),
  'ant-man-wasp': img('801640802446081520.jpg'),
  eternals: img('Eternals.jpg'),
  'black-widow': img('black widow.jpg'),
  'doctor-strange-mom': img('Doctor Strange in the Multiverse of Madness (2022).jpg'),
  'wakanda-forever': img('801640802446081729.jpg'),
  'iron-man-2': img('801640802446081335.jpg'),
  'fantastic-four': img('f4.jpg'),
  'age-of-ultron': img("Avengers,_ l'Ère d'Ultron- Josh Whedon-2015_.jpg"),
  thunderbolts: img('801640802460778703.jpg'),
  'doctor-strange': img('Doctor Strange.jpg'),
  'first-avenger': img('Captain America _ The First Avenger (2011).jpg'),
  'ant-man': img('Ant-Man (2015).jpg'),
  homecoming: img('Spider-Man_ Homecoming.jpg'),
  'iron-man': img('Iron Man 1.jpg'),
  thor: img('801640802446081342.jpg'),
  'incredible-hulk': img('801640802446081323.jpg'),
  'black-panther': img('Black Panther.jpg'),
  'no-way-home': img('SPIDER-MAN_ NO WAY HOME (2021).jpg'),
  'deadpool-wolverine': img('Elegant DEADPOOL AND WOLVERINE 2024 & ORIGINAL CINEMA MOVIE FILM PRINT PREMIUM POSTER 2024.jpg'),
  'brand-new-day': img('spiderman bnd.jpg'),
  'guardianes-galaxia': img('Guardianes de la Galaxia.jpg'),
  'civil-war': img('Capitão América 3 - Guerra Cívil (2016).jpg'),
  avengers: img('_The avengers_ (2012)_.jpg'),
  endgame: img("'Avengers_ Endgame' Poster 2.jpg"),
  'gotg-3': img('Guardians of the Galaxy Vol_ 3.jpg'),
  'winter-soldier': img('Capitán América y el Soldado del Invierno.jpg'),
  'infinity-war': img('801640802446081499.jpg')
};

type Extra = Pick<Movie, 'year' | 'director' | 'hero' | 'mcuPhase' | 'saga' | 'runtime' | 'tags' | 'quote'>;

export const EXTRAS: Record<string, Extra> = {
  'the-marvels': { year: 2023, director: 'Nia DaCosta', hero: 'Carol / Kamala / Monica', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 105, tags: ['espacio', 'equipo', 'humor'], quote: 'El punto más bajo del UCM.' },
  quantumania: { year: 2023, director: 'Peyton Reed', hero: 'Scott Lang', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 125, tags: ['reino cuántico', 'kang', 'cgi'], quote: 'Kang habla mucho y logra poco.' },
  'brave-new-world': { year: 2025, director: 'Julius Onah', hero: 'Sam Wilson', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 118, tags: ['política', 'thriller', 'sucesor'], quote: 'Una premisa política que se diluye.' },
  'love-and-thunder': { year: 2022, director: 'Taika Waititi', hero: 'Thor', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 119, tags: ['comedia', 'dioses', 'jane foster'], quote: 'Dos películas peleando entre sí.' },
  'capitana-marvel': { year: 2019, director: 'Anna Boden, Ryan Fleck', hero: 'Carol Danvers', mcuPhase: 3, saga: 'Infinity Saga', runtime: 123, tags: ['origen', 'skrulls', '90s'], quote: 'Funcional, sin riesgos.' },
  'far-from-home': { year: 2019, director: 'Jon Watts', hero: 'Peter Parker', mcuPhase: 3, saga: 'Infinity Saga', runtime: 129, tags: ['ilusión', 'viaje', 'epílogo'], quote: 'Villano genial, giro flojo.' },
  'iron-man-3': { year: 2013, director: 'Shane Black', hero: 'Tony Stark', mcuPhase: 2, saga: 'Infinity Saga', runtime: 130, tags: ['navidad', 'mandarín', 'trauma'], quote: 'Años de hype para un actor contratado.' },
  'thor-dark-world': { year: 2013, director: 'Alan Taylor', hero: 'Thor', mcuPhase: 2, saga: 'Infinity Saga', runtime: 112, tags: ['asgard', 'éter', 'loki'], quote: 'La típica peli de relleno.' },
  'thor-ragnarok': { year: 2017, director: 'Taika Waititi', hero: 'Thor', mcuPhase: 3, saga: 'Infinity Saga', runtime: 130, tags: ['comedia', 'hela', 'gladiador'], quote: 'Divertida no es lo mismo que buena.' },
  'ant-man-wasp': { year: 2018, director: 'Peyton Reed', hero: 'Scott y Hope', mcuPhase: 3, saga: 'Infinity Saga', runtime: 118, tags: ['atraco', 'familia', 'cuántico'], quote: 'Si la sacas del calendario, nadie la extraña.' },
  eternals: { year: 2021, director: 'Chloé Zhao', hero: 'Los Eternos', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 156, tags: ['mitología', 'celestiales', 'indie'], quote: 'Ambiciosa, atropellada, olvidable.' },
  'black-widow': { year: 2021, director: 'Cate Shortland', hero: 'Natasha Romanoff', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 134, tags: ['espías', 'familia', 'yelena'], quote: 'Yelena se roba cada escena.' },
  'doctor-strange-mom': { year: 2022, director: 'Sam Raimi', hero: 'Stephen Strange', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 126, tags: ['terror', 'multiverso', 'wanda'], quote: 'Raimi salva lo que WandaVision perdió.' },
  'wakanda-forever': { year: 2022, director: 'Ryan Coogler', hero: 'Shuri', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 161, tags: ['duelo', 'namor', 'wakanda'], quote: 'Funciona como duelo, no como epopeya.' },
  'iron-man-2': { year: 2010, director: 'Jon Favreau', hero: 'Tony Stark', mcuPhase: 1, saga: 'Infinity Saga', runtime: 124, tags: ['whiplash', 'expo', 'paladio'], quote: 'Existe para servir al universo, no al personaje.' },
  'fantastic-four': { year: 2025, director: 'Matt Shakman', hero: 'Los 4 Fantásticos', mcuPhase: 6, saga: 'Multiverse Saga', runtime: 115, tags: ['retro', 'familia', 'galactus'], quote: 'Más inicio de Doomsday que cierre propio.' },
  'shang-chi': { year: 2021, director: 'Destin Daniel Cretton', hero: 'Shang-Chi', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 132, tags: ['artes marciales', 'familia', 'anillos'], quote: 'Wenwu eleva la película entera.' },
  'age-of-ultron': { year: 2015, director: 'Joss Whedon', hero: 'Los Vengadores', mcuPhase: 2, saga: 'Infinity Saga', runtime: 141, tags: ['equipo', 'ultrón', 'sokovia'], quote: 'Seguir a Avengers era casi imposible.' },
  thunderbolts: { year: 2025, director: 'Jake Schreier', hero: 'Yelena Belova', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 126, tags: ['antiheroes', 'salud mental', 'equipo'], quote: 'El enemigo es la depresión encarnada.' },
  'doctor-strange': { year: 2016, director: 'Scott Derrickson', hero: 'Stephen Strange', mcuPhase: 3, saga: 'Infinity Saga', runtime: 115, tags: ['origen', 'magia', 'kármico'], quote: 'Visualmente de las más originales.' },
  'first-avenger': { year: 2011, director: 'Joe Johnston', hero: 'Steve Rogers', mcuPhase: 1, saga: 'Infinity Saga', runtime: 124, tags: ['origen', 'guerra', 'peggy'], quote: 'El corazón moral de la saga.' },
  'ant-man': { year: 2015, director: 'Peyton Reed', hero: 'Scott Lang', mcuPhase: 2, saga: 'Infinity Saga', runtime: 117, tags: ['atraco', 'familia', 'humor'], quote: 'Pequeña, ágil y con encanto.' },
  homecoming: { year: 2017, director: 'Jon Watts', hero: 'Peter Parker', mcuPhase: 3, saga: 'Infinity Saga', runtime: 133, tags: ['instituto', 'buitre', 'queens'], quote: 'Por fin un Spider-Man adolescente de verdad.' },
  'iron-man': { year: 2008, director: 'Jon Favreau', hero: 'Tony Stark', mcuPhase: 1, saga: 'Infinity Saga', runtime: 126, tags: ['origen', 'industria', 'rdj'], quote: 'La que arrancó todo.' },
  thor: { year: 2011, director: 'Kenneth Branagh', hero: 'Thor', mcuPhase: 1, saga: 'Infinity Saga', runtime: 115, tags: ['asgard', 'loki', 'teatro'], quote: 'Loki se roba la función desde el minuto uno.' },
  'incredible-hulk': { year: 2008, director: 'Louis Leterrier', hero: 'Bruce Banner', mcuPhase: 1, saga: 'Infinity Saga', runtime: 112, tags: ['fugitivo', 'monstruo', 'harlem'], quote: 'La que casi nadie cuenta como canon.' },
  'gotg-2': { year: 2017, director: 'James Gunn', hero: 'Peter Quill', mcuPhase: 3, saga: 'Infinity Saga', runtime: 136, tags: ['familia', 'ego', 'yondu'], quote: 'Más emotiva que la primera.' },
  'black-panther': { year: 2018, director: 'Ryan Coogler', hero: "T'Challa", mcuPhase: 3, saga: 'Infinity Saga', runtime: 134, tags: ['wakanda', 'killmonger', 'legado'], quote: 'El corazón emocional es Killmonger.' },
  'no-way-home': { year: 2021, director: 'Jon Watts', hero: 'Peter Parker', mcuPhase: 4, saga: 'Multiverse Saga', runtime: 148, tags: ['multiverso', 'nostalgia', 'sacrificio'], quote: 'Fan service que sí crece al héroe.' },
  'deadpool-wolverine': { year: 2024, director: 'Shawn Levy', hero: 'Deadpool y Wolverine', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 128, tags: ['r-rated', 'fox', 'cameos'], quote: 'El cierre que Logan merecía.' },
  'brand-new-day': { year: 2026, director: 'Destin Daniel Cretton', hero: 'Peter Parker', mcuPhase: 6, saga: 'Multiverse Saga', runtime: 130, tags: ['solo', 'mutación', 'punisher'], quote: 'Un Peter que ya perdió a todos.' },
  'guardianes-galaxia': { year: 2014, director: 'James Gunn', hero: 'Los Guardianes', mcuPhase: 2, saga: 'Infinity Saga', runtime: 121, tags: ['mixtape', 'familia', 'espacio'], quote: 'Reinventó lo que Marvel podía ser.' },
  'civil-war': { year: 2016, director: 'Anthony y Joe Russo', hero: 'Steve Rogers', mcuPhase: 3, saga: 'Infinity Saga', runtime: 147, tags: ['ideología', 'zemo', 'aeropuerto'], quote: 'Más Avengers 2.5, y funciona increíble.' },
  avengers: { year: 2012, director: 'Joss Whedon', hero: 'Los Vengadores', mcuPhase: 1, saga: 'Infinity Saga', runtime: 143, tags: ['equipo', 'loki', 'nueva york'], quote: 'Demostró que el universo compartido podía funcionar.' },
  endgame: { year: 2019, director: 'Anthony y Joe Russo', hero: 'Los Vengadores', mcuPhase: 3, saga: 'Infinity Saga', runtime: 181, tags: ['cierre', 'tiempo', 'sacrificio'], quote: 'El pago de una década de inversión emocional.' },
  'gotg-3': { year: 2023, director: 'James Gunn', hero: 'Rocket', mcuPhase: 5, saga: 'Multiverse Saga', runtime: 150, tags: ['rocket', 'cierre', 'animalia'], quote: 'El mejor cierre de trilogía del UCM.' },
  'winter-soldier': { year: 2014, director: 'Anthony y Joe Russo', hero: 'Steve Rogers', mcuPhase: 2, saga: 'Infinity Saga', runtime: 136, tags: ['thriller', 'hydra', 'bucky'], quote: 'Cambió lo que se esperaba del género.' },
  'infinity-war': { year: 2018, director: 'Anthony y Joe Russo', hero: 'Thanos', mcuPhase: 3, saga: 'Infinity Saga', runtime: 149, tags: ['thanos', 'gemas', 'chasquido'], quote: 'La cima absoluta del UCM.' }
};

function encodeAsset(path: string): string {
  if (!path || path.includes('/posters/')) return '';
  if (path.startsWith('http')) return path;
  const clean = path.replace(/^\//, '');
  const slash = clean.lastIndexOf('/');
  if (slash < 0) return '/' + encodeURIComponent(clean);
  return '/' + clean.slice(0, slash + 1) + encodeURIComponent(clean.slice(slash + 1));
}

export function hydrateMovie(movie: Movie): Movie {
  const extra = EXTRAS[movie.slug] ?? {};
  return {
    ...movie,
    ...extra,
    poster: POSTERS[movie.slug] ?? encodeAsset(movie.poster)
  };
}
