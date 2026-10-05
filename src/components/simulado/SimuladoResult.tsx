import React, { useEffect } from 'react';
import { SimuladoSession } from '../../types/math';
import { MathRenderer } from '../common/MathRenderer';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  BookOpen, 
  AlertCircle, 
  TrendingUp, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimuladoResultProps {
  session: SimuladoSession;
  onRestart: () => void;
  onGoToFormula: (formulaId: string) => void;
  onGoToHome: () => void;
}

export const SimuladoResult: React.FC<SimuladoResultProps> = ({
  session,
  onRestart,
  onGoToFormula,
  onGoToHome
}) => {
  const total = session.questions.length;
  const correct = session.questions.filter(q => q.isCorrect).length;
  const wrong = total - correct;
  const score = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
  const percent = Math.round((correct / total) * 100);

  // Time spent
  const durationSec = session.completedAt && session.startedAt 
    ? Math.max(1, Math.round((session.completedAt - session.startedAt) / 1000))
    : 60;
  const min = Math.floor(durationSec / 60);
  const sec = durationSec % 60;
  const timeFormatted = `${min} min e ${sec} s`;

  // Breakdown by category
  const topicStats: Record<string, { total: number; correct: number }> = {};
  session.questions.forEach(q => {
    if (!topicStats[q.category]) topicStats[q.category] = { total: 0, correct: 0 };
    topicStats[q.category].total += 1;
    if (q.isCorrect) topicStats[q.category].correct += 1;
  });

  // Weak areas (topics with less than 60% accuracy)
  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => (stats.correct / stats.total) < 0.6)
    .map(([topic]) => topic);

  // Trigger confetti on good performance
  useEffect(() => {
    if (score >= 6.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [score]);

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Score Card */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center mb-8 relative overflow-hidden">
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-4">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Resultado do Simulado</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {score >= 8.5 ? 'Desempenho Extraordinário!' : score >= 6.0 ? 'Bom Desempenho!' : 'Hora de Reforçar os Estudos!'}
          </h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Confira sua pontuação final, tempo de prova e diagnóstico das matérias que você dominou ou precisa revisar.
          </p>

          {/* Big Grade Badge */}
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-3xl shadow-inner mb-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200 block mb-1">
              Nota Final
            </span>
            <div className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              {score} <span className="text-2xl sm:text-3xl text-blue-300 font-bold">/ 10</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-xl font-black text-emerald-400">{correct}</span>
              <p className="text-[11px] text-slate-300">Acertos</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-xl font-black text-rose-400">{wrong}</span>
              <p className="text-[11px] text-slate-300">Erros</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-xl font-black text-blue-300">{percent}%</span>
              <p className="text-[11px] text-slate-300">Taxa de Acerto</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-lg font-bold text-amber-300 font-mono">{timeFormatted}</span>
              <p className="text-[11px] text-slate-300">Tempo de Prova</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic & Recommendations Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Diagnóstico por Matéria</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Veja seu percentual de acerto em cada assunto avaliado nesta prova.
          </p>
        </div>

        <div className="space-y-4">
          {Object.entries(topicStats).map(([topic, stats]) => {
            const topicRate = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={topic} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  <span>{topic}</span>
                  <span className={topicRate >= 70 ? 'text-emerald-600' : topicRate >= 50 ? 'text-amber-600' : 'text-rose-600'}>
                    {topicRate}% ({stats.correct}/{stats.total} questões)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      topicRate >= 70 ? 'bg-emerald-500' : topicRate >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${topicRate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Weak Areas Alert & Recommendations */}
        {weakTopics.length > 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider">
                  Conteúdos com Maior Dificuldade Detectados:
                </h4>
                <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                  Identificamos que você teve maior dificuldade em <strong>{weakTopics.join(', ')}</strong>.
                  Recomendamos revisar as fórmulas correspondentes e fazer os exercícios resolvidos passo a passo.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-emerald-900 font-semibold">
              Você teve aproveitamento satisfatório em todas as matérias avaliadas! Parabéns pelo esforço e dedicação.
            </p>
          </div>
        )}
      </div>

      {/* Gabarito Comentado Completo */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Gabarito Comentado ({session.questions.length} Questões)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Revise cada questão com sua resposta, a alternativa correta e a explicação detalhada do cálculo.
          </p>
        </div>

        <div className="space-y-6">
          {session.questions.map((q, idx) => {
            const isRight = q.isCorrect;
            return (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border ${
                  isRight ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Questão {idx + 1} • {q.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isRight ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isRight ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isRight ? 'Acertou' : 'Errou'}</span>
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800 mb-3">
                  {q.question}
                </p>

                {/* User Answer vs Correct Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Sua Resposta:</span>
                    <span className={isRight ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {q.options && q.userSelectedOption !== undefined 
                        ? q.options[q.userSelectedOption] 
                        : q.userSelectedBool !== undefined 
                          ? (q.userSelectedBool ? 'Verdadeiro' : 'Falso')
                          : 'Em branco'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-700 block text-[10px] uppercase font-bold">Gabarito Correto:</span>
                    <span className="text-emerald-900 font-bold">
                      {q.options && q.correctIndex !== undefined
                        ? q.options[q.correctIndex]
                        : q.isTrue !== undefined 
                          ? (q.isTrue ? 'Verdadeiro' : 'Falso')
                          : q.numericAnswer}
                    </span>
                  </div>
                </div>

                {/* Resolution & Step by Step */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed mb-3">
                  <strong>Explicação passo a passo:</strong> {q.explanation}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] text-slate-500 font-mono font-medium">
                    Fórmula: {q.formulaLatex}
                  </span>

                  <button
                    onClick={() => onGoToFormula(q.formulaId)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    Estudar {q.formulaName} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Fazer Novo Simulado</span>
        </button>

        <button
          onClick={onGoToHome}
          className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base transition-colors"
        >
          Voltar à Página Inicial
        </button>
      </div>

    </div>
  );
};
