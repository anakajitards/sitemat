import React from 'react';
import { UserProgress } from '../../types/math';
import { getStudyRecommendations } from '../../utils/storage';
import { BarChart3, Award, AlertCircle, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';

interface ProgressOverviewProps {
  progress: UserProgress;
  onGoToProgressDashboard: () => void;
  onGoToFormula: (formulaId: string) => void;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  progress,
  onGoToProgressDashboard,
  onGoToFormula
}) => {
  const overallRate = progress.totalAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  const recommendations = getStudyRecommendations(progress);

  // Key topics to display
  const keyTopics = ['Álgebra', 'Geometria Plana', 'Funções', 'Trigonometria'];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600">
                Seu Progresso
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Desempenho Geral do Aluno
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-slate-900">
              {progress.totalAnswered > 0 ? `${overallRate}%` : '---'}
            </span>
            <p className="text-[11px] font-semibold text-slate-400">
              Taxa de acerto
            </p>
          </div>
        </div>

        {/* Quick Numbers Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center">
            <span className="text-xl font-extrabold text-slate-800">
              {progress.totalAnswered}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Respondidas</p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 text-center">
            <span className="text-xl font-extrabold text-emerald-700">
              {progress.totalCorrect}
            </span>
            <p className="text-[11px] text-emerald-700/80 font-medium">Acertos</p>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 text-center">
            <span className="text-xl font-extrabold text-blue-700">
              {progress.studiedFormulas.length}
            </span>
            <p className="text-[11px] text-blue-700/80 font-medium">Fórmulas vistas</p>
          </div>
        </div>

        {/* Topic Progress Bars */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Domínio por Matéria
          </h4>
          {keyTopics.map(topic => {
            const stats = progress.topicStats[topic] || { answered: 0, correct: 0 };
            const rate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
            return (
              <div key={topic}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{topic}</span>
                  <span className="text-slate-500">
                    {stats.answered > 0 ? `${rate}% (${stats.correct}/${stats.answered})` : 'Sem dados'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      rate >= 70 ? 'bg-emerald-500' : rate >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${stats.answered > 0 ? Math.max(rate, 6) : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Study Recommendation Banner */}
        {recommendations.length > 0 ? (
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 mb-6 text-amber-900">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-800">
                  Dica de Estudo Personalizada
                </h5>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  {recommendations[0].message}
                </p>
                {recommendations[0].formulaIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {recommendations[0].formulaIds.map(fid => (
                      <button
                        key={fid}
                        onClick={() => onGoToFormula(fid)}
                        className="text-[11px] font-bold bg-white text-amber-800 border border-amber-300 px-2 py-0.5 rounded-md hover:bg-amber-100 transition-colors"
                      >
                        Revisar Fórmula →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 mb-6 text-emerald-900 flex items-center gap-3">
            <Award className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs leading-relaxed text-emerald-800">
              Continue respondendo às questões e realizando simulados para mapear seus pontos fortes e fracos!
            </p>
          </div>
        )}

      </div>

      {/* Footer link to full dashboard */}
      <button
        onClick={onGoToProgressDashboard}
        className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
      >
        <span>Ver Painel Completo de Progresso</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
};
