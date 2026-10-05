import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onFilterGrade?: (grade: '9ef' | '1em' | '2em') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onFilterGrade }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                f(x)
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Matemática Fácil
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Plataforma interativa projetada para estudantes do 9º ano do Ensino Fundamental ao 2º ano do Ensino Médio. 
              Entenda as variáveis, descubra quando usar cada fórmula, calcule com passo a passo e teste seus conhecimentos.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-2.5 max-w-md">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>
                <strong>Garantia de Rigor Matemático:</strong> Cálculos testados contra casos extremos, tolerâncias e erros algébricos conhecidos.
              </span>
            </div>
          </div>

          {/* Anos Escolares */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Anos Escolares
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => { onSelectTab('formulas'); onFilterGrade?.('9ef'); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  9º ano do Ensino Fundamental
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('formulas'); onFilterGrade?.('1em'); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  1º ano do Ensino Médio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('formulas'); onFilterGrade?.('2em'); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  2º ano do Ensino Médio
                </button>
              </li>
            </ul>
          </div>

          {/* Ferramentas */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Ferramentas
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onSelectTab('calculator')} className="hover:text-blue-400 transition-colors">
                  Calculadora com Passo a Passo
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('practice')} className="hover:text-blue-400 transition-colors">
                  Exercícios Dinâmicos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('simulado')} className="hover:text-blue-400 transition-colors">
                  Simulados com Diagnóstico
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('progress')} className="hover:text-blue-400 transition-colors">
                  Painel de Domínio do Aluno
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('validation')} className="hover:text-blue-400 transition-colors">
                  Central de Validação Matemática
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Matemática Fácil • Desenvolvido para o aprendizado real de Matemática no Brasil.</p>
          <p className="flex items-center gap-1">
            Didática simples <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Precisão rigorosa
          </p>
        </div>
      </div>
    </footer>
  );
};
