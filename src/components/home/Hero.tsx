import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, BookOpen, CheckCircle2, Calculator, Lightbulb } from 'lucide-react';
import { GradeLevel } from '../../types/math';

interface HeroProps {
  onSearch: (query: string) => void;
  onSelectGrade: (grade: GradeLevel) => void;
  onGoToSimulado: () => void;
  onGoToFormulas: () => void;
  onGoToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onSelectGrade,
  onGoToSimulado,
  onGoToFormulas,
  onGoToCalculator
}) => {
  const [query, setQuery] = useState('');

  const quickSearchTags = [
    'Bhaskara',
    'Pitágoras',
    'Área do Círculo',
    'Função Afim',
    'PA Termo Geral',
    'Volume Cilindro',
    'Combinação',
    'Lei dos Cossenos'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    onSearch(tag);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      
      {/* Background soft geometric patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Biblioteca Interativa do 9º Fundamental ao 2º Médio</span>
        </div>

        {/* Site Name & Tagline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Matemática <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">Fácil</span>
        </h1>
        
        <p className="text-xl sm:text-2xl font-bold text-slate-700 max-w-2xl mx-auto mb-4 tracking-tight">
          "Entenda a fórmula. Pratique. Domine a Matemática."
        </p>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Não apenas decore fórmulas: saiba <strong>o que significa cada variável</strong>, 
          <strong> quando usar</strong> em cada situação, veja resoluções completas e teste na calculadora interativa.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-blue-500/10 border-2 border-blue-500/30 hover:border-blue-500 transition-all p-1.5 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-600">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite uma fórmula, assunto ou palavra-chave..."
              className="w-full px-3 py-3 text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base font-medium focus:outline-hidden"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 sm:px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-600/25 shrink-0 flex items-center gap-1.5"
            >
              <span>Buscar</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </form>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 max-w-3xl mx-auto text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Mais buscados:
          </span>
          {quickSearchTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-colors shadow-2xs font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grade Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto mb-10">
          <button
            onClick={() => onSelectGrade('9ef')}
            className="group p-4 rounded-2xl bg-white border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all text-left flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              9º
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                9º ano
              </h3>
              <p className="text-xs text-slate-500">
                Fundamental: Pitágoras, Bhaskara, Áreas, Proporção
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectGrade('1em')}
            className="group p-4 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:shadow-md transition-all text-left flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              1º EM
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">
                1º ano do EM
              </h3>
              <p className="text-xs text-slate-500">
                Funções Afim/Quad., PA, PG, Logaritmos, Trigonometria
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectGrade('2em')}
            className="group p-4 rounded-2xl bg-white border-2 border-purple-100 hover:border-purple-400 hover:shadow-md transition-all text-left flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 font-extrabold text-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              2º EM
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">
                2º ano do EM
              </h3>
              <p className="text-xs text-slate-500">
                Espacial, Matrizes, Combinatória, Lei dos Cossenos
              </p>
            </div>
          </button>
        </div>

        {/* Main CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoToSimulado}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Teste seus conhecimentos</span>
          </button>

          <button
            onClick={onGoToFormulas}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-300 hover:border-slate-400 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Biblioteca de Fórmulas</span>
          </button>

          <button
            onClick={onGoToCalculator}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center gap-2 border border-slate-200"
          >
            <Calculator className="w-4 h-4 text-slate-600" />
            <span>Calculadora com Passo a Passo</span>
          </button>
        </div>

      </div>
    </section>
  );
};
