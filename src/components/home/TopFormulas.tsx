import React from 'react';
import { Formula } from '../../types/math';
import { FormulaCard } from '../formulas/FormulaCard';
import { Flame, ArrowRight } from 'lucide-react';

interface TopFormulasProps {
  formulas: Formula[];
  onSelectFormula: (formula: Formula) => void;
  onOpenCalculator: (formula: Formula) => void;
  onViewAll: () => void;
}

export const TopFormulas: React.FC<TopFormulasProps> = ({
  formulas,
  onSelectFormula,
  onOpenCalculator,
  onViewAll
}) => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Fórmulas mais acessadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Os Fundamentos Mais Cobrados
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Fórmulas indispensáveis com resoluções explicadas e calculadoras interativas.
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
        >
          <span>Ver biblioteca completa ({formulas.length}+ fórmulas)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {formulas.slice(0, 8).map(formula => (
          <FormulaCard
            key={formula.id}
            formula={formula}
            onSelect={onSelectFormula}
            onOpenCalculator={onOpenCalculator}
          />
        ))}
      </div>

    </section>
  );
};
