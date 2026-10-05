import React, { useState } from 'react';
import { Exercise } from '../../types/math';
import { generateDynamicExercise } from '../../data/exerciseTemplates';
import { recordExerciseAttempt } from '../../utils/storage';
import { MathRenderer } from '../common/MathRenderer';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickPracticeProps {
  onGoToFullPractice: () => void;
  onRefreshStats: () => void;
}

export const QuickPractice: React.FC<QuickPracticeProps> = ({
  onGoToFullPractice,
  onRefreshStats
}) => {
  const [exercise, setExercise] = useState<Exercise>(() => generateDynamicExercise());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    const correct = idx === exercise.correctIndex;
    setIsCorrect(correct);
    setHasAnswered(true);

    recordExerciseAttempt(exercise, correct);
    onRefreshStats();

    if (correct) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // ignore confetti errors in case of canvas issues
      }
    }
  };

  const handleNextQuestion = () => {
    setExercise(generateDynamicExercise());
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            </span>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-300">
                Pratique agora • Desafio Rápido
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {exercise.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/15"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Gerar outro com outros números</span>
          </button>
        </div>

        {/* Question text */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          {exercise.question}
        </div>

        {/* Options */}
        {exercise.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {exercise.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isTheCorrectOne = idx === exercise.correctIndex;

              let style = 'bg-white/10 border-white/15 hover:bg-white/20 text-white';
              if (hasAnswered) {
                if (isTheCorrectOne) {
                  style = 'bg-emerald-600/90 border-emerald-400 text-white shadow-lg shadow-emerald-900/50';
                } else if (isSelected && !isTheCorrectOne) {
                  style = 'bg-rose-600/90 border-rose-400 text-white shadow-lg shadow-rose-900/50';
                } else {
                  style = 'bg-white/5 border-white/5 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border font-semibold text-sm sm:text-base text-left transition-all flex items-center justify-between gap-3 ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {hasAnswered && isTheCorrectOne && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isTheCorrectOne && (
                    <XCircle className="w-5 h-5 text-rose-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation Card after answer */}
        {hasAnswered && (
          <div className={`p-4 sm:p-5 rounded-2xl mb-5 border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isCorrect 
              ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-100' 
              : 'bg-rose-950/70 border-rose-500/60 text-rose-100'
          }`}>
            <div className="flex items-center gap-2 mb-2 font-bold text-base">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">Resposta Correta! Excelente raciocínio.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-rose-300">Não foi dessa vez. Veja a explicação passo a passo:</span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed mb-3 text-slate-200">
              {exercise.explanation}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 bg-black/30 p-2.5 rounded-lg border border-white/10">
              <span>Fórmula utilizada:</span>
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white">
                {exercise.formulaLatex}
              </span>
            </div>
          </div>
        )}

        {/* Action row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <p className="text-xs text-blue-200 font-medium">
            Exercício com valores dinâmicos gerados em tempo real.
          </p>

          <div className="flex items-center gap-2">
            {hasAnswered && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>Próximo Desafio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onGoToFullPractice}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Ver Central de Prática</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
