import React from 'react';
import { Formula } from '../../types/math';
import { GRADE_LABELS } from '../../data/formulas';
import { MathRenderer } from '../common/MathRenderer';
import { Calculator, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface FormulaCardProps {
  formula: Formula;
  onSelect: (formula: Formula) => void;
  onOpenCalculator?: (formula: Formula) => void;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  formula,
  onSelect,
  onOpenCalculator
}) => {
  const gradeInfo = GRADE_LABELS[formula.grade];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      <div className="p-5 sm:p-6">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${gradeInfo.badgeColor}`}>
            {gradeInfo.short}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {formula.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(formula)}
          className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 cursor-pointer line-clamp-1"
        >
          {formula.name}
        </h3>

        {/* Mathematical Expression Box */}
        <div 
          onClick={() => onSelect(formula)}
          className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-3 my-3 cursor-pointer group-hover:bg-blue-50/40 transition-colors flex items-center justify-center min-h-[64px]"
        >
          <MathRenderer math={formula.latex} display={true} className="text-slate-900 font-medium" />
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {formula.description}
        </p>

      </div>

      {/* Card Actions Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        {onOpenCalculator && (
          <button
            onClick={() => onOpenCalculator(formula)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white"
            title="Abrir calculadora desta fórmula"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-500" />
            <span>Calcular</span>
          </button>
        )}

        <button
          onClick={() => onSelect(formula)}
          className="ml-auto flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 py-1.5 px-3 rounded-lg hover:bg-blue-100/60 transition-colors"
        >
          <span>Ver e Praticar</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
