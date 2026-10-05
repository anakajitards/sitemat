/**
 * Matemática Fácil - Motor de Cálculos e Formatação Numérica
 * Garante precisão matemática, tratamento de arredondamentos e tolerâncias.
 */

export function round(value: number, decimals: number = 4): number {
  if (isNaN(value) || !isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function formatNumberBR(value: number, maxDecimals: number = 2): string {
  if (isNaN(value)) return 'Indefinido';
  if (!isFinite(value)) return value > 0 ? '+∞' : '-∞';
  
  // Se for inteiro exato, exibe sem decimais
  if (Math.abs(value - Math.round(value)) < 1e-9) {
    return Math.round(value).toLocaleString('pt-BR');
  }

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

export function isApproximatelyEqual(actual: number, expected: number, tolerance: number = 0.01): boolean {
  if (isNaN(actual) || isNaN(expected)) return false;
  return Math.abs(actual - expected) <= tolerance;
}

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Fatorial é definido apenas para números inteiros não negativos.');
  }
  if (n === 0 || n === 1) return 1;
  if (n > 170) throw new Error('Valor muito grande para cálculo em precisão de ponto flutuante.');
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

export function arrangement(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
    throw new Error('n e k devem ser números inteiros não negativos.');
  }
  if (k > n) {
    throw new Error('k não pode ser maior que n em arranjo simples.');
  }
  return factorial(n) / factorial(n - k);
}

export function combination(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
    throw new Error('n e k devem ser números inteiros não negativos.');
  }
  if (k > n) {
    throw new Error('k não pode ser maior que n em combinação simples.');
  }
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}
