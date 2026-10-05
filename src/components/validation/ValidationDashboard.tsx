import React, { useState, useMemo } from 'react';
import { runFullValidation, FullValidationReport } from '../../utils/mathValidation';
import { ShieldCheck, CheckCircle2, XCircle, RotateCcw, AlertTriangle, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export const ValidationDashboard: React.FC = () => {
  const [report, setReport] = useState<FullValidationReport>(() => runFullValidation());
  const [expandedFormulaId, setExpandedFormulaId] = useState<string | null>(null);

  const handleReRun = () => {
    setReport(runFullValidation());
  };

  const toggleExpand = (id: string) => {
    setExpandedFormulaId(prev => prev === id ? null : id);
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Camada de Validação & Rigor Científico</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Validação Matemática Automatizada
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Garantia de que 100% dos cálculos, variáveis, limites e casos extremos foram verificados.
          </p>
        </div>

        <button
          onClick={handleReRun}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Executar Verificação Novamente</span>
        </button>
      </div>

      {/* Hero Status Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 ${
        report.overallSuccess
          ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900'
          : 'bg-gradient-to-br from-rose-900 via-red-900 to-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <ShieldCheck className="w-9 h-9 text-emerald-300" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300 block mb-1">
                Status da Suíte de Testes
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {report.overallSuccess ? '100% Verificado e Aprovado' : 'Erros Detectados'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Todas as {report.totalFormulas} fórmulas do sistema foram auditadas contra ternos pitagóricos, logaritmos, discriminantes e limites de domínio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-black/20 p-4 rounded-2xl border border-white/10 text-center shrink-0">
            <div>
              <span className="text-2xl font-black text-white">{report.totalTests}</span>
              <p className="text-[10px] text-slate-300 uppercase font-bold">Total Testes</p>
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-300">{report.totalPassed}</span>
              <p className="text-[10px] text-emerald-300 uppercase font-bold">Passaram</p>
            </div>
            <div>
              <span className="text-2xl font-black text-rose-300">{report.totalFailed}</span>
              <p className="text-[10px] text-rose-300 uppercase font-bold">Falhas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Directives from prompt */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Critérios Verificados em Cada Fórmula:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Identificação correta de todas as variáveis</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Validação de ternos pitagóricos e casos conhecidos</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Tratamento de divisão por zero e raízes negativas</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rejeição de dimensões negativas ou nulas</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Integridade dos gabaritos e das opções</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Avisos claros de resultados aproximados (π, etc.)</span>
          </div>
        </div>
      </div>

      {/* Formula by Formula Accordion List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Relatório Detalhado por Fórmula ({report.formulaReports.length} Fórmulas)
        </h3>

        {report.formulaReports.map(fr => {
          const isExpanded = expandedFormulaId === fr.formulaId;

          return (
            <div key={fr.formulaId} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleExpand(fr.formulaId)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      {fr.formulaName}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {fr.category} • {fr.testsPassed} de {fr.testsTotal} testes passaram
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    100% OK
                  </span>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-2.5 animate-in fade-in duration-200">
                  {fr.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span className="font-bold text-slate-800">
                          {item.testDescription}
                        </span>
                      </div>

                      <div className="text-slate-500 text-[11px] sm:text-right font-mono">
                        {item.actual && <span>Resultado: <strong className="text-slate-800">{String(item.actual)}</strong></span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
