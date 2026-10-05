import React, { useState, useMemo } from 'react';
import { Formula, GradeLevel, MathCategory } from '../../types/math';
import { ALL_FORMULAS, CATEGORIES, searchFormulas } from '../../data/formulas';
import { FormulaCard } from './FormulaCard';
import { Search, Filter, BookOpen, Layers, X } from 'lucide-react';

interface FormulaListProps {
  initialGrade?: GradeLevel | 'all';
  initialSearch?: string;
  onSelectFormula: (formula: Formula) => void;
  onOpenCalculator: (formula: Formula) => void;
}

export const FormulaList: React.FC<FormulaListProps> = ({
  initialGrade = 'all',
  initialSearch = '',
  onSelectFormula,
  onOpenCalculator
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>(initialGrade);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const gradeOptions: Array<{ id: GradeLevel | 'all'; label: string }> = [
    { id: 'all', label: 'Todos os Anos' },
    { id: '9ef', label: '9º ano' },
    { id: '1em', label: '1º ano EM' },
    { id: '2em', label: '2º ano EM' }
  ];

  const filteredFormulas = useMemo(() => {
    return searchFormulas(searchQuery, {
      grade: selectedGrade,
      category: selectedCategory
    });
  }, [searchQuery, selectedGrade, selectedCategory]);

  const handleClearFilters = () => {
    setSelectedGrade('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Introduction */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca Interativa de Fórmulas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore as Fórmulas Matemáticas
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
          Fórmulas revisadas, com significado das variáveis, gatilhos de aplicação, exemplos passo a passo e calculadora interativa.
        </p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite uma fórmula, assunto ou palavra-chave (ex: bhaskara, pitágoras, circulo, pa)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base text-slate-800 placeholder-slate-400 font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grade Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Ano Escolar:
          </span>
          {gradeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedGrade(opt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedGrade === opt.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Matéria:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            Todas
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-xs sm:text-sm font-semibold text-slate-600">
          Mostrando <strong className="text-slate-900">{filteredFormulas.length}</strong> fórmula{filteredFormulas.length !== 1 ? 's' : ''}
        </p>

        {(selectedGrade !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {/* Formulas Grid */}
      {filteredFormulas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredFormulas.map(formula => (
            <FormulaCard
              key={formula.id}
              formula={formula}
              onSelect={onSelectFormula}
              onOpenCalculator={onOpenCalculator}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">
            Nenhuma fórmula encontrada
          </h3>
          <p className="text-sm text-slate-500 mt-1 mb-5">
            Tente buscar com outros termos ou altere o filtro de ano escolar.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Ver Todas as Fórmulas
          </button>
        </div>
      )}

    </div>
  );
};
