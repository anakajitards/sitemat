import React, { useState, useEffect } from 'react';
import { Formula, Exercise } from '../../types/math';
import { GRADE_LABELS } from '../../data/formulas';
import { MathRenderer } from '../common/MathRenderer';
import { FormulaCalculator } from './FormulaCalculator';
import { recordExerciseAttempt, recordFormulaView } from '../../utils/storage';
import { 
  X, 
  HelpCircle, 
  Variable, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Share2, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormulaDetailModalProps {
  formula: Formula;
  onClose: () => void;
  onRefreshStats?: () => void;
}

export const FormulaDetailModal: React.FC<FormulaDetailModalProps> = ({
  formula,
  onClose,
  onRefreshStats
}) => {
  const gradeInfo = GRADE_LABELS[formula.grade];
  
  // Exercise states for this formula
  const [exerciseState, setExerciseState] = useState<Record<string, {
    selectedOption?: number;
    userNumeric?: number;
    userBool?: boolean;
    hasAnswered: boolean;
    isCorrect: boolean;
  }>>({});

  useEffect(() => {
    // Record that student opened this formula
    recordFormulaView(formula.id);
  }, [formula.id]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAnswerExercise = (ex: Exercise, chosen: { optionIdx?: number; numeric?: number; bool?: boolean }) => {
    let correct = false;

    if (ex.type === 'multiple-choice' || ex.type === 'formula-choice') {
      correct = chosen.optionIdx === ex.correctIndex;
    } else if (ex.type === 'true-false') {
      correct = chosen.bool === ex.isTrue;
    } else if (ex.type === 'fill-in') {
      const tol = ex.tolerance ?? 0.01;
      correct = chosen.numeric !== undefined && Math.abs(chosen.numeric - (ex.numericAnswer ?? 0)) <= tol;
    }

    setExerciseState(prev => ({
      ...prev,
      [ex.id]: {
        selectedOption: chosen.optionIdx,
        userNumeric: chosen.numeric,
        userBool: chosen.bool,
        hasAnswered: true,
        isCorrect: correct
      }
    }));

    recordExerciseAttempt(ex, correct);
    onRefreshStats?.();

    if (correct) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${gradeInfo.badgeColor}`}>
              {gradeInfo.short}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
              {formula.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* 1. Nome da Fórmula & Fórmula em destaque */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
              {formula.name}
            </h2>

            <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 border-2 border-blue-200 rounded-2xl p-5 text-center shadow-xs">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 block mb-2">
                Expressão Matemática
              </span>
              <MathRenderer math={formula.latex} display={true} className="text-2xl sm:text-3xl font-bold text-slate-900" />
            </div>
          </div>

          {/* 2. O que significa? */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-base mb-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3>O que significa?</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {formula.description}
            </p>
          </div>

          {/* 3. Variáveis */}
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-3">
              <Variable className="w-5 h-5 text-blue-600" />
              <h3>Variáveis e Elementos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {formula.variables.map(v => (
                <div key={v.symbol} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                      <MathRenderer math={v.symbol} />
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{v.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    {v.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Quando usar? */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-2.5">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3>Quando usar?</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 font-medium">
              {formula.whenToUse.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Exemplo Resolvido */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3>Exemplo Resolvido: {formula.example.title}</h3>
            </div>

            {/* Problem Statement */}
            <div className="bg-blue-50/60 border-l-4 border-blue-500 p-4 rounded-r-xl text-sm sm:text-base text-slate-800 font-medium mb-5">
              <strong>Problema:</strong> {formula.example.problem}
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-5">
              {formula.example.steps.map((st, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      {st.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      Etapa {i + 1}
                    </span>
                  </div>
                  {st.latex && (
                    <div className="my-1.5 py-1 text-center bg-white rounded-lg border border-slate-200/60">
                      <MathRenderer math={st.latex} display={true} className="text-slate-900 font-semibold" />
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600">
                    {st.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* Final Answer Banner */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm sm:text-base p-4 rounded-xl flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Resposta: {formula.example.finalAnswer}</span>
            </div>
          </div>

          {/* 6. Teste a fórmula (Calculadora interativa integrada) */}
          <FormulaCalculator formula={formula} />

          {/* 7. Exercícios Interativos da Fórmula */}
          {formula.exercises.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Exercícios desta Fórmula ({formula.exercises.length} questões)
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Teste seus conhecimentos agora
                </span>
              </div>

              <div className="space-y-5">
                {formula.exercises.map((ex, exIndex) => {
                  const state = exerciseState[ex.id] || { hasAnswered: false, isCorrect: false };
                  
                  return (
                    <div key={ex.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                      
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                          Questão {exIndex + 1} • {ex.difficulty}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {ex.type === 'multiple-choice' ? 'Múltipla Escolha' : ex.type === 'true-false' ? 'Verdadeiro ou Falso' : 'Preenchimento'}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-slate-800 font-medium mb-4">
                        {ex.question}
                      </p>

                      {/* Multiple choice options */}
                      {ex.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                          {ex.options.map((opt, optIdx) => {
                            const isChosen = state.selectedOption === optIdx;
                            const isCorrectOpt = optIdx === ex.correctIndex;
                            let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';

                            if (state.hasAnswered) {
                              if (isCorrectOpt) {
                                style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                              } else if (isChosen && !isCorrectOpt) {
                                style = 'bg-rose-100 border-rose-500 text-rose-950';
                              } else {
                                style = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={state.hasAnswered}
                                onClick={() => handleAnswerExercise(ex, { optionIdx: optIdx })}
                                className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left flex items-center justify-between gap-2 transition-all ${style}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {state.hasAnswered && isCorrectOpt && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {state.hasAnswered && isChosen && !isCorrectOpt && (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* True/False buttons */}
                      {ex.type === 'true-false' && (
                        <div className="flex gap-3 mb-4">
                          {[true, false].map((val) => {
                            const isChosen = state.userBool === val;
                            const isCorrectVal = val === ex.isTrue;
                            let style = 'bg-slate-100 hover:bg-slate-200 text-slate-800';

                            if (state.hasAnswered) {
                              if (isCorrectVal) {
                                style = 'bg-emerald-600 text-white font-bold';
                              } else if (isChosen && !isCorrectVal) {
                                style = 'bg-rose-600 text-white font-bold';
                              } else {
                                style = 'bg-slate-100 text-slate-400 opacity-50';
                              }
                            }

                            return (
                              <button
                                key={String(val)}
                                disabled={state.hasAnswered}
                                onClick={() => handleAnswerExercise(ex, { bool: val })}
                                className={`px-6 py-2.5 rounded-xl border text-sm font-bold transition-all ${style}`}
                              >
                                {val ? 'VERDADEIRO' : 'FALSO'}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Feedback & Explanation */}
                      {state.hasAnswered && (
                        <div className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
                          state.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                        }`}>
                          <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                            {state.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-700">Você acertou!</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600" />
                                <span className="text-rose-700">Resposta incorreta. Veja a resolução:</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed mb-2">
                            {ex.explanation}
                          </p>
                          <div className="text-[11px] font-semibold text-slate-500 bg-white/70 p-2 rounded border border-slate-200">
                            Fórmula aplicada: <span className="font-mono text-slate-800">{ex.formulaLatex}</span>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            Conteúdo verificado pedagogicamente e matematicamente.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>

      </div>

    </div>
  );
};
