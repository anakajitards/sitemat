import { ALL_FORMULAS } from '../data/formulas';
import { Formula, FormulaTestCase } from '../types/math';
import { isApproximatelyEqual } from './mathEngine';

export interface ValidationItemResult {
  testDescription: string;
  passed: boolean;
  actual?: string | number;
  expected?: string | number;
  errorDetails?: string;
}

export interface FormulaValidationReport {
  formulaId: string;
  formulaName: string;
  grade: string;
  category: string;
  testsPassed: number;
  testsTotal: number;
  hasErrors: boolean;
  items: ValidationItemResult[];
}

export interface FullValidationReport {
  timestamp: string;
  totalFormulas: number;
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  overallSuccess: boolean;
  formulaReports: FormulaValidationReport[];
}

export function validateSingleFormula(formula: Formula): FormulaValidationReport {
  const items: ValidationItemResult[] = [];
  let passedCount = 0;

  // 1. Validar Variáveis
  const hasValidVars = formula.variables.length > 0 && formula.variables.every(v => v.symbol && v.name && v.meaning);
  items.push({
    testDescription: 'Definição e integridade das variáveis',
    passed: hasValidVars,
    expected: 'Todas as variáveis com símbolo, nome e significado definidos',
    actual: hasValidVars ? 'Válido' : 'Faltando variáveis ou campos vazios'
  });
  if (hasValidVars) passedCount++;

  // 2. Validar Exercícios Cadastrados
  let exercisesValid = true;
  let exError = '';
  for (const ex of formula.exercises) {
    if (ex.type === 'multiple-choice' || ex.type === 'formula-choice') {
      if (!ex.options || ex.options.length < 2 || ex.correctIndex === undefined || ex.correctIndex < 0 || ex.correctIndex >= ex.options.length) {
        exercisesValid = false;
        exError = `Exercício "${ex.title}" com opções ou índice de resposta inválido.`;
        break;
      }
    } else if (ex.type === 'true-false') {
      if (typeof ex.isTrue !== 'boolean') {
        exercisesValid = false;
        exError = `Exercício V/F "${ex.title}" sem gabarito booleano.`;
        break;
      }
    } else if (ex.type === 'fill-in') {
      if (ex.numericAnswer === undefined || isNaN(ex.numericAnswer)) {
        exercisesValid = false;
        exError = `Exercício de preenchimento "${ex.title}" sem resposta numérica válida.`;
        break;
      }
    }
  }

  items.push({
    testDescription: `Validação dos exercícios cadastrados (${formula.exercises.length} questões)`,
    passed: exercisesValid,
    expected: 'Todos os exercícios com opções, gabarito e resolução consistente',
    actual: exercisesValid ? 'Exercícios 100% íntegros' : exError
  });
  if (exercisesValid) passedCount++;

  // 3. Executar casos de teste do Calculador
  const testCases = formula.calculatorConfig?.testCases || [];
  for (const tc of testCases) {
    try {
      const res = formula.calculatorConfig.compute(tc.inputs);

      if (tc.shouldFail) {
        // Deveria falhar (ex: rejeitar número negativo ou divisão por 0)
        const passed = !res.success && (!tc.expectedErrorMessage || res.error?.toLowerCase().includes(tc.expectedErrorMessage.toLowerCase()));
        items.push({
          testDescription: `[Caso Extremo/Inválido] ${tc.description}`,
          passed: !!passed,
          expected: `Erro esperado: "${tc.expectedErrorMessage || 'Falha na validação de entrada'}"`,
          actual: res.success ? 'Inesperadamente teve sucesso!' : `Rejeitou corretamente: "${res.error}"`
        });
        if (passed) passedCount++;
      } else {
        // Deveria calcular com sucesso
        if (!res.success) {
          items.push({
            testDescription: tc.description,
            passed: false,
            expected: `Resultado: ${tc.expectedOutput}`,
            actual: `Falhou com erro: ${res.error}`
          });
        } else {
          let isMatch = false;
          if (typeof tc.expectedOutput === 'number' && typeof res.value === 'number') {
            const tol = tc.tolerance || (tc.isApproximate ? 0.05 : 0.0001);
            isMatch = isApproximatelyEqual(res.value, tc.expectedOutput, tol);
          } else {
            isMatch = res.formattedResult?.includes(String(tc.expectedOutput)) || false;
          }

          items.push({
            testDescription: tc.description,
            passed: isMatch,
            expected: `${tc.expectedOutput}`,
            actual: `${res.value ?? res.formattedResult}`
          });
          if (isMatch) passedCount++;
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      items.push({
        testDescription: tc.description,
        passed: false,
        expected: 'Execução sem exceção',
        actual: `Exceção não tratada: ${msg}`
      });
    }
  }

  const testsTotal = items.length;
  return {
    formulaId: formula.id,
    formulaName: formula.name,
    grade: formula.grade,
    category: formula.category,
    testsPassed: passedCount,
    testsTotal,
    hasErrors: passedCount < testsTotal,
    items
  };
}

export function runFullValidation(): FullValidationReport {
  const reports = ALL_FORMULAS.map(validateSingleFormula);
  const totalTests = reports.reduce((acc, r) => acc + r.testsTotal, 0);
  const totalPassed = reports.reduce((acc, r) => acc + r.testsPassed, 0);
  const totalFailed = totalTests - totalPassed;

  return {
    timestamp: new Date().toISOString(),
    totalFormulas: ALL_FORMULAS.length,
    totalTests,
    totalPassed,
    totalFailed,
    overallSuccess: totalFailed === 0,
    formulaReports: reports
  };
}
