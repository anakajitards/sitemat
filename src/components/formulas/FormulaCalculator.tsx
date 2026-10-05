import React, { useState, useEffect } from 'react';
import { Formula, CalculationResult } from '../../types/math';
import { MathRenderer } from '../common/MathRenderer';
import { Calculator, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, Info } from 'lucide-react';

interface FormulaCalculatorProps {
  formula: Formula;
  compact?: boolean;
}

export const FormulaCalculator: React.FC<FormulaCalculatorProps> = ({ formula, compact = false }) => {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Initialize default values when formula changes
  useEffect(() => {
    const initial: Record<string, number> = {};
    formula.calculatorConfig?.inputs.forEach(inp => {
      initial[inp.key] = inp.defaultValue ?? 0;
    });
    setInputs(initial);
    // Auto compute initial default
    if (formula.calculatorConfig) {
      setResult(formula.calculatorConfig.compute(initial));
    }
  }, [formula]);

  const handleInputChange = (key: string, value: string) => {
    const num = parseFloat(value);
    setInputs(prev => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num
    }));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formula.calculatorConfig) return;
    const res = formula.calculatorConfig.compute(inputs);
    setResult(res);
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    formula.calculatorConfig?.inputs.forEach(inp => {
      initial[inp.key] = inp.defaultValue ?? 0;
    });
    setInputs(initial);
    if (formula.calculatorConfig) {
      setResult(formula.calculatorConfig.compute(initial));
    }
  };

  if (!formula.calculatorConfig) {
    return <p className="text-sm text-slate-500">Calculadora em breve para esta fórmula.</p>;
  }

  return (
    <div className={`bg-white rounded-2xl border border-blue-200/80 shadow-md shadow-blue-500/5 ${compact ? 'p-4' : 'p-6 sm:p-7'}`}>
      
      {/* Title */}
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-blue-700">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
            Teste a Fórmula: {formula.name}
          </h4>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors"
          title="Restaurar valores padrão"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className={`grid gap-4 ${formula.calculatorConfig.inputs.length > 2 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {formula.calculatorConfig.inputs.map(inp => (
            <div key={inp.key} className="space-y-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-700">
                {inp.label} {inp.unit && <span className="text-slate-400 font-normal">({inp.unit})</span>}:
              </label>
              <div className="relative">
                <input
                  type="number"
                  step={inp.step || 'any'}
                  min={inp.min}
                  max={inp.max}
                  value={inputs[inp.key] ?? ''}
                  onChange={(e) => handleInputChange(inp.key, e.target.value)}
                  placeholder={inp.placeholder || '0'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                />
                <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-400 pointer-events-none">
                  {inp.symbol}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          <span>CALCULAR</span>
        </button>
      </form>

      {/* Calculation Output Box */}
      {result && (
        <div className="mt-6 border-t border-slate-100 pt-5 animate-in fade-in duration-300">
          
          {result.success ? (
            <div className="space-y-4">
              
              {/* Highlighted Result Display */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700">
                    Resultado Obtido:
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {result.formattedResult}
                  </div>
                </div>

                {result.isApproximation && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold self-start sm:self-center">
                    <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Resultado aproximado (dízima / irracional)</span>
                  </div>
                )}
              </div>

              {/* Step by step derivation */}
              {result.steps && result.steps.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Passo a Passo da Resolução:</span>
                  </h5>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-700 font-mono">
                    {result.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/60">
                        <span className="font-sans font-bold text-blue-600 shrink-0 select-none">
                          Passo {i + 1}:
                        </span>
                        <span className="text-slate-800 break-words font-medium font-sans">
                          {st}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 text-rose-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-rose-800">
                  Entrada Inválida ou Impossível
                </h5>
                <p className="text-xs sm:text-sm text-rose-700 mt-1">
                  {result.error || 'Verifique os valores informados.'}
                </p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
