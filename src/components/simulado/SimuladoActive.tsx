import React, { useState, useEffect } from 'react';
import { SimuladoSession, SimuladoQuestion } from '../../types/math';
import { MathRenderer } from '../common/MathRenderer';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface SimuladoActiveProps {
  session: SimuladoSession;
  onUpdateQuestion: (questionIndex: number, answerData: Partial<SimuladoQuestion>) => void;
  onFinish: () => void;
  onCancel: () => void;
}

export const SimuladoActive: React.FC<SimuladoActiveProps> = ({
  session,
  onUpdateQuestion,
  onFinish,
  onCancel
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  // Live timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const currentQ = session.questions[currentIndex];
  const answeredCount = session.questions.filter(q => q.isAnswered).length;
  const totalCount = session.questions.length;
  const progressPercent = Math.round((answeredCount / totalCount) * 100);

  const handleSelectOption = (idx: number) => {
    onUpdateQuestion(currentIndex, {
      userSelectedOption: idx,
      isAnswered: true,
      isCorrect: idx === currentQ.correctIndex
    });
  };

  const handleSelectBool = (val: boolean) => {
    onUpdateQuestion(currentIndex, {
      userSelectedBool: val,
      isAnswered: true,
      isCorrect: val === currentQ.isTrue
    });
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Sticky Bar with Timer & Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex items-center justify-between gap-4 sticky top-20 z-30">
        
        {/* Progress Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>Questão {currentIndex + 1} de {totalCount}</span>
            <span className="text-blue-600">{answeredCount} respondidas ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold shrink-0 shadow-xs">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>{formatTimer(elapsedSeconds)}</span>
        </div>

        {/* Finish button */}
        <button
          onClick={() => setShowConfirmFinish(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
        >
          Finalizar Prova
        </button>

      </div>

      {/* Question Navigator Dots */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 mb-6 flex flex-wrap gap-2 items-center justify-center">
        {session.questions.map((q, i) => {
          const isCurrent = i === currentIndex;
          const isDone = q.isAnswered;

          let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
          if (isCurrent) {
            btnClass = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 font-extrabold';
          } else if (isDone) {
            btnClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
          }

          return (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center transition-all ${btnClass}`}
              title={`Ir para questão ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/50 mb-6">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              {currentQ.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
              Dificuldade: {currentQ.difficulty}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-400">
            Fórmula: {currentQ.formulaName}
          </span>
        </div>

        {/* Title & Enunciado */}
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Questão {currentIndex + 1}: {currentQ.title}
        </h2>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          {currentQ.question}
        </div>

        {/* Multiple choice options */}
        {currentQ.options && (
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = currentQ.userSelectedOption === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-xl border-2 font-semibold text-left text-sm sm:text-base flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True / False Options */}
        {currentQ.type === 'true-false' && (
          <div className="flex gap-4 mb-6">
            {[true, false].map(val => {
              const isSelected = currentQ.userSelectedBool === val;
              return (
                <button
                  key={String(val)}
                  onClick={() => handleSelectBool(val)}
                  className={`flex-1 py-4 rounded-2xl border-2 text-base font-bold transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  {val ? 'VERDADEIRO' : 'FALSO'}
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation row between questions */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {currentIndex < totalCount - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(totalCount - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
            >
              <span>Próxima</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmFinish(true)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Concluir Simulado</span>
            </button>
          )}
        </div>

      </div>

      {/* Confirm Finish Modal */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Deseja finalizar o Simulado?
            </h3>
            
            {answeredCount < totalCount ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 mb-5 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Atenção:</strong> Você respondeu apenas {answeredCount} de {totalCount} questões. 
                  As questões em branco serão consideradas erradas.
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 mb-5">
                Você respondeu todas as {totalCount} questões! Ao finalizar, você verá seu gabarito, nota e diagnóstico.
              </p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Voltar à Prova
              </button>
              <button
                onClick={() => {
                  setShowConfirmFinish(false);
                  onFinish();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                Sim, Finalizar Agora
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
