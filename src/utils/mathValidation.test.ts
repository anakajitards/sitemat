import { describe, it, expect } from 'vitest';
import { runFullValidation, validateSingleFormula } from './mathValidation';
import { ALL_FORMULAS } from '../data/formulas';

describe('Sistema de Validação Matemática - Matemática Fácil', () => {
  it('todas as fórmulas devem possuir dados obrigatórios e variáveis completas', () => {
    expect(ALL_FORMULAS.length).toBeGreaterThan(0);
    ALL_FORMULAS.forEach(f => {
      expect(f.id).toBeDefined();
      expect(f.name).toBeTruthy();
      expect(f.latex).toBeTruthy();
      expect(f.variables.length).toBeGreaterThan(0);
      f.variables.forEach(v => {
        expect(v.symbol).toBeTruthy();
        expect(v.meaning).toBeTruthy();
      });
      expect(f.example.steps.length).toBeGreaterThan(0);
      expect(f.whenToUse.length).toBeGreaterThan(0);
    });
  });

  it('deve passar em 100% dos testes unitários das fórmulas e calculadoras', () => {
    const report = runFullValidation();
    expect(report.totalFailed).toBe(0);
    expect(report.overallSuccess).toBe(true);
    expect(report.totalPassed).toBe(report.totalTests);
  });

  describe('Casos específicos exigidos no prompt', () => {
    it('Teorema de Pitágoras: ternos pitagóricos 3,4->5 e 5,12->13 e 8,15->17', () => {
      const pit = ALL_FORMULAS.find(f => f.id === 'teorema-de-pitagoras')!;
      expect(pit).toBeDefined();
      const r1 = pit.calculatorConfig.compute({ b: 3, c: 4 });
      expect(r1.success).toBe(true);
      expect(r1.value).toBe(5);

      const r2 = pit.calculatorConfig.compute({ b: 5, c: 12 });
      expect(r2.success).toBe(true);
      expect(r2.value).toBe(13);

      const r3 = pit.calculatorConfig.compute({ b: 8, c: 15 });
      expect(r3.success).toBe(true);
      expect(r3.value).toBe(17);

      // Rejeitar valores inválidos
      const rInv = pit.calculatorConfig.compute({ b: 0, c: 4 });
      expect(rInv.success).toBe(false);
    });

    it('Fórmula de Bhaskara: x² - 5x + 6 = 0 produz raízes 2 e 3 e rejeita a = 0', () => {
      const bhas = ALL_FORMULAS.find(f => f.id === 'formula-de-bhaskara')!;
      expect(bhas).toBeDefined();
      const r = bhas.calculatorConfig.compute({ a: 1, b: -5, c: 6 });
      expect(r.success).toBe(true);
      expect(r.formattedResult).toContain('3');
      expect(r.formattedResult).toContain('2');

      const rZeroA = bhas.calculatorConfig.compute({ a: 0, b: 2, c: 3 });
      expect(rZeroA.success).toBe(false);
    });

    it('Área do Círculo: raio 5 produz aprox 78,54 e rejeita raio <= 0', () => {
      const circ = ALL_FORMULAS.find(f => f.id === 'area-do-circulo')!;
      expect(circ).toBeDefined();
      const r = circ.calculatorConfig.compute({ r: 5 });
      expect(r.success).toBe(true);
      expect(Math.abs(r.value! - 78.54)).toBeLessThan(0.01);
      expect(r.isApproximation).toBe(true);

      const rNeg = circ.calculatorConfig.compute({ r: -5 });
      expect(rNeg.success).toBe(false);
    });
  });
});
