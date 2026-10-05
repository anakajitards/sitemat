import { Formula, GradeLevel, MathCategory } from '../../types/math';
import { grade9Formulas } from './grade9';
import { grade10Formulas } from './grade10';
import { grade11Formulas } from './grade11';

export const ALL_FORMULAS: Formula[] = [
  ...grade9Formulas,
  ...grade10Formulas,
  ...grade11Formulas
];

export const GRADE_LABELS: Record<GradeLevel, { label: string; short: string; badgeColor: string }> = {
  '9ef': {
    label: '9º ano do Ensino Fundamental',
    short: '9º ano',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  '1em': {
    label: '1º ano do Ensino Médio',
    short: '1º ano EM',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  '2em': {
    label: '2º ano do Ensino Médio',
    short: '2º ano EM',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  }
};

export const CATEGORIES: MathCategory[] = [
  'Álgebra',
  'Geometria Plana',
  'Geometria Espacial',
  'Funções',
  'Progressões',
  'Trigonometria',
  'Análise Combinatória',
  'Matrizes e Determinantes',
  'Probabilidade e Estatística'
];

export const TOP_FORMULAS_IDS = [
  'teorema-de-pitagoras',
  'formula-de-bhaskara',
  'area-do-circulo',
  'funcao-afim',
  'pa-termo-geral',
  'volume-cilindro',
  'combinacao-simples',
  'lei-dos-cossenos'
];

export function getTopFormulas(): Formula[] {
  return TOP_FORMULAS_IDS
    .map(id => ALL_FORMULAS.find(f => f.id === id))
    .filter((f): f is Formula => f !== undefined);
}

export function getFormulaById(id: string): Formula | undefined {
  return ALL_FORMULAS.find(f => f.id === id);
}

export function searchFormulas(query: string, options?: {
  grade?: GradeLevel | 'all';
  category?: string | 'all';
}): Formula[] {
  const cleanQuery = query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return ALL_FORMULAS.filter(formula => {
    if (options?.grade && options.grade !== 'all' && formula.grade !== options.grade) {
      return false;
    }
    if (options?.category && options.category !== 'all' && formula.category !== options.category) {
      return false;
    }

    if (!cleanQuery) return true;

    const searchableText = [
      formula.name,
      formula.shortFormula,
      formula.description,
      formula.category,
      ...formula.tags,
      ...formula.whenToUse,
      ...formula.variables.map(v => `${v.symbol} ${v.name} ${v.meaning}`)
    ].join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return searchableText.includes(cleanQuery);
  });
}
