import React, { useState } from 'react';
import { GradeLevel } from '../../types/math';
import { CheckCircle2, Clock, Award, Sparkles, BookOpen, Layers } from 'lucide-react';

interface SimuladoSetupProps {
  onStart: (count: 10 | 20 | 30, grade: GradeLevel | 'all') => void;
}

export const SimuladoSetup: React.FC<SimuladoSetupProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30>(10);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');

  return (
    <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>Modo Simulado Oficial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Simulado de Matemática
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Teste seus conhecimentos em condições reais de prova. Ao final, receba sua nota, diagnóstico por matéria e plano de estudo personalizado.
        </p>
      </div>

      {/* Setup Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/50 space-y-6">
        
        {/* Choose question count */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
            1. Escolha a Quantidade de Questões:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[10, 20, 30].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num as 10 | 20 | 30)}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  questionCount === num
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black block">
                  {num}
                </span>
                <span className="text-xs font-bold block mt-1">
                  questões
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  ~{num * 2} minutos
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Choose grade / scope */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
            2. Escolha o Escopo do Simulado:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedGrade('all')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedGrade === 'all'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="font-bold text-sm">Simulado Geral (Misto)</div>
              <div className="text-xs text-slate-500 mt-0.5">Mistura 9º ano, 1º EM e 2º EM</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedGrade('9ef')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedGrade === '9ef'
                  ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="font-bold text-sm">9º ano Fundamental</div>
              <div className="text-xs text-slate-500 mt-0.5">Álgebra, Pitágoras, Áreas e Proporção</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedGrade('1em')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedGrade === '1em'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="font-bold text-sm">1º ano do Ensino Médio</div>
              <div className="text-xs text-slate-500 mt-0.5">Funções Afim/Quad, PA, PG, Logaritmos</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedGrade('2em')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                selectedGrade === '2em'
                  ? 'border-purple-600 bg-purple-50/60 text-purple-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="font-bold text-sm">2º ano do Ensino Médio</div>
              <div className="text-xs text-slate-500 mt-0.5">Geometria Espacial, Combinatória, Matrizes</div>
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Como funciona:</span>
          </div>
          <p>• Um cronômetro medirá seu tempo de resolução sem pressão de encerramento forçado.</p>
          <p>• Você pode navegar livremente entre as questões e mudar suas respostas antes de finalizar.</p>
          <p>• Ao terminar, veja seu gabarito comentado, nota de 0 a 10 e recomendações de estudo.</p>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onStart(questionCount, selectedGrade)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Iniciar Simulado Agora ({questionCount} Questões)</span>
        </button>

      </div>

    </div>
  );
};
