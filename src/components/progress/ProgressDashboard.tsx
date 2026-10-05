import React, { useState } from 'react';
import { UserProgress } from '../../types/math';
import { ALL_FORMULAS } from '../../data/formulas';
import { getStudyRecommendations, resetUserProgress } from '../../utils/storage';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  RotateCcw, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: UserProgress;
  onRefresh: () => void;
  onGoToFormula: (formulaId: string) => void;
  onGoToSimulado: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onRefresh,
  onGoToFormula,
  onGoToSimulado
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const overallRate = progress.totalAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  const recommendations = getStudyRecommendations(progress);

  // Categorize topics into Mastered (>= 75%) and Needs Attention (< 60%)
  const topicEntries = Object.entries(progress.topicStats);
  const masteredTopics = topicEntries.filter(([_, s]) => s.answered >= 2 && (s.correct / s.answered) >= 0.75);
  const difficultyTopics = topicEntries.filter(([_, s]) => s.answered >= 2 && (s.correct / s.answered) < 0.60);

  // Formulas needing review
  const formulasNeedingReview = progress.needingReviewFormulas
    .map(id => ALL_FORMULAS.find(f => f.id === id))
    .filter((f): f is typeof ALL_FORMULAS[0] => f !== undefined);

  const handleReset = () => {
    resetUserProgress();
    setShowConfirmReset(false);
    onRefresh();
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Painel do Aluno</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Seu Progresso de Aprendizagem
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Acompanhe suas taxas de acerto, matérias dominadas e fórmulas que precisam de reforço.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmReset(true)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 self-start sm:self-auto hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Zerar Meu Progresso</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total Questions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-1">
            Questões Respondidas
          </span>
          <div className="text-3xl font-black text-slate-900">
            {progress.totalAnswered}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Total acumulado
          </p>
        </div>

        {/* Total Correct */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 block mb-1">
            Questões Acertadas
          </span>
          <div className="text-3xl font-black text-emerald-700">
            {progress.totalCorrect}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {progress.totalAnswered - progress.totalCorrect} erros registrados
          </p>
        </div>

        {/* Taxa de Acerto Geral */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 block mb-1">
            Taxa Geral de Acerto
          </span>
          <div className="text-3xl font-black text-blue-700">
            {progress.totalAnswered > 0 ? `${overallRate}%` : '---'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {overallRate >= 70 ? 'Bom ritmo!' : 'Pratique mais exercícios'}
          </p>
        </div>

        {/* Fórmulas Estudadas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 block mb-1">
            Fórmulas Estudadas
          </span>
          <div className="text-3xl font-black text-purple-700">
            {progress.studiedFormulas.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            de {ALL_FORMULAS.length} disponíveis
          </p>
        </div>

      </div>

      {/* Recommendations Banner */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-xs mb-8 text-amber-950">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs uppercase font-black tracking-wider text-amber-800 block mb-1">
                Recomendação Inteligente de Estudo
              </span>
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                Atenção ao Conteúdo de {recommendations[0].topic}!
              </h3>
              <p className="text-sm text-amber-900 mb-4 leading-relaxed">
                {recommendations[0].message}
              </p>

              {recommendations[0].formulaIds.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-amber-800">Fórmulas recomendadas para revisão:</span>
                  {recommendations[0].formulaIds.map(fid => {
                    const f = ALL_FORMULAS.find(x => x.id === fid);
                    if (!f) return null;
                    return (
                      <button
                        key={fid}
                        onClick={() => onGoToFormula(fid)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>{f.name}</span>
                        <ArrowRight className="w-3 h-3 text-amber-700" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Two columns: Topic Mastery and Needing Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Topic Mastery Progress Bars */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Domínio por Conteúdo</span>
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Acertos por área
            </span>
          </div>

          <div className="space-y-4">
            {topicEntries.map(([topic, stats]) => {
              const rate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
              return (
                <div key={topic} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    <span>{topic}</span>
                    <span className={rate >= 75 ? 'text-emerald-600' : rate >= 50 ? 'text-amber-600' : 'text-slate-500'}>
                      {stats.answered > 0 ? `${rate}% (${stats.correct}/${stats.answered})` : 'Sem questões ainda'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rate >= 75 ? 'bg-emerald-500' : rate >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${stats.answered > 0 ? Math.max(rate, 5) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulas that need review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Fórmulas que Precisam de Revisão</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                {formulasNeedingReview.length} pendentes
              </span>
            </div>

            {formulasNeedingReview.length > 0 ? (
              <div className="space-y-3">
                {formulasNeedingReview.map(f => (
                  <div
                    key={f.id}
                    onClick={() => onGoToFormula(f.id)}
                    className="p-3.5 rounded-2xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-700 transition-colors">
                        {f.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {f.category} • {f.shortFormula}
                      </p>
                    </div>

                    <button className="text-xs font-bold text-rose-600 group-hover:text-rose-700 flex items-center gap-1 shrink-0">
                      <span>Revisar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-900">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-base text-emerald-950">
                  Nenhuma fórmula pendente de revisão!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                  Você está sem erros recentes acumulados. Que tal testar seus conhecimentos em um simulado?
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <button
              onClick={onGoToSimulado}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Realizar um Simulado Agora</span>
            </button>
          </div>
        </div>

      </div>

      {/* Simulado History */}
      {progress.simuladoHistory.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Histórico de Simulados Realizados</span>
          </h3>

          <div className="space-y-3">
            {progress.simuladoHistory.map((sim, i) => (
              <div key={sim.id || i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400">
                    Realizado em {sim.date}
                  </span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">
                    {sim.totalQuestions} questões • {sim.correctAnswers} acertos ({Math.round((sim.correctAnswers / sim.totalQuestions) * 100)}%)
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">
                      {sim.score}
                    </span>
                    <span className="text-xs text-slate-400 font-bold"> / 10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Reset Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Zerar todo o seu progresso?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Esta ação reiniciará seu histórico de questões, fórmulas estudadas e simulados.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors"
              >
                Sim, Zerar Progresso
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
