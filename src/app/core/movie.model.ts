export type VillainVerdict = 'desperdiciado' | 'correcto' | 'brillante';
export type Saga = 'Infinity Saga' | 'Multiverse Saga';

export interface Movie {
  rank: number;
  slug: string;
  title: string;
  poster: string;
  phase: 1 | 2 | 3 | 4 | 5;
  villain: string;
  villainVerdict: VillainVerdict;
  villainNote?: string;
  pros: string[];
  cons: string[];
  review: string;
  year?: number;
  director?: string;
  hero?: string;
  mcuPhase?: number;
  saga?: Saga;
  runtime?: number;
  tags?: string[];
  quote?: string;
  custom?: boolean;
}

export interface PhaseInfo {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  range: string;
  color: string;
  blurb: string;
}

export const PHASES: PhaseInfo[] = [
  {
    id: 1,
    name: 'El fondo de olla',
    range: '38-30',
    color: '#4b5563',
    blurb: 'Las que duelen. Taquilla floja, villanos vacíos o un tono que nunca aterriza.'
  },
  {
    id: 2,
    name: 'Zona meh',
    range: '29-21',
    color: '#f97316',
    blurb: 'Se ven, se olvidan. Hay ideas, pero el UCM las usa como puente.'
  },
  {
    id: 3,
    name: 'Decentes',
    range: '20-12',
    color: '#0b63ce',
    blurb: 'Cumplen. Orígenes sólidos, diversión y algún villano que sí se sostiene.'
  },
  {
    id: 4,
    name: 'Respect',
    range: '11-6',
    color: '#6d28d9',
    blurb: 'Las que importan. Identidad propia, emoción y peso dentro de la saga.'
  },
  {
    id: 5,
    name: 'All Elite',
    range: '5-1',
    color: '#ed1c24',
    blurb: 'El Olimpo. Las que cambian lo que se espera de Marvel.'
  }
];

export const VERDICTS: { id: VillainVerdict; label: string }[] = [
  { id: 'desperdiciado', label: 'Desperdiciado' },
  { id: 'correcto', label: 'Correcto' },
  { id: 'brillante', label: 'Brillante' }
];

export function rankScore(rank: number): number {
  return Math.round(((39 - rank) / 37) * 100) / 10;
}
