import React, { useState, useMemo } from 'react';
import { ALL_FORMULAS, CATEGORIES } from '../../data/formulas';
import { Formula } from '../../types/math';
import { FormulaCalculator } from '../formulas/FormulaCalculator';
import { MathRenderer } from '../common/MathRenderer';
import { Calculator, ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface GlobalCalculatorProps {
  initialFormulaId?: string;
}

export const GlobalCalculator: React.FC<GlobalCalculatorProps> = ({ initialFormulaId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(
    initialFormulaId || ALL_FORMULAS[0].id
  );

  // Filter formulas by category
  const availableFormulas = useMemo(() => {
    if (selectedCategory === 'all') return ALL_FORMULAS;
    return ALL_FORMULAS.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  // Selected formula
  const currentFormula = useMemo(() => {
    const found = ALL_FORMULAS.find(f => f.id === selectedFormulaId);
    if (found) return found;
    return availableFormulas[0] || ALL_FORMULAS[0];
  }, [selectedFormulaId, availableFormulas]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const matching = cat === 'all' ? ALL_FORMULAS : ALL_FORMULAS.filter(f => f.category === cat);
    if (matching.length > 0 && !matching.some(f => f.id === selectedFormulaId)) {
      setSelectedFormulaId(matching[0].id);
    }
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Calculadora Matemática Integrada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Calculadora de Fórmulas com Passo a Passo
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Selecione a matéria e a fórmula, digite seus dados e veja a substituição algébrica detalhada etapa por etapa.
        </p>
      </div>

      {/* Selector Card (Category -> Formula) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
        
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>1. Escolha a Categoria e a Fórmula</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Categoria */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-700">
              Categoria / Matéria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-semibold text-slate-800 text-sm bg-white"
            >
              <option value="all">Todas as Categorias</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Fórmula */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-700">
              Fórmula a Calcular:
            </label>
            <select
              value={currentFormula.id}
              onChange={(e) => setSelectedFormulaId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold text-blue-700 text-sm bg-white"
            >
              {availableFormulas.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.shortFormula})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Formula summary badge */}
        <div className="mt-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700">
              Fórmula Selecionada:
            </span>
            <div className="font-bold text-slate-900 text-base mt-0.5">
              {currentFormula.name}
            </div>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
              {currentFormula.description}
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-2xs text-center shrink-0">
            <MathRenderer math={currentFormula.latex} display={false} className="font-bold text-slate-900" />
          </div>
        </div>

      </div>

      {/* Interactive Calculator Engine for the selected formula */}
      <div className="mb-10">
        <FormulaCalculator formula={currentFormula} />
      </div>

    </div>
  );
};
