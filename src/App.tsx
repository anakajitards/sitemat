import React, { useState, useEffect } from 'react';
import { GradeLevel, Formula, SimuladoSession } from './types/math';
import { ALL_FORMULAS, getTopFormulas, searchFormulas } from './data/formulas';
import { getUserProgress, recordSimuladoFinished } from './utils/storage';
import { createSimuladoSession } from './data/mockExams';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Hero } from './components/home/Hero';
import { TopFormulas } from './components/home/TopFormulas';
import { QuickPractice } from './components/home/QuickPractice';
import { ProgressOverview } from './components/home/ProgressOverview';
import { FormulaList } from './components/formulas/FormulaList';
import { FormulaDetailModal } from './components/formulas/FormulaDetailModal';
import { GlobalCalculator } from './components/calculator/GlobalCalculator';
import { PracticeView } from './components/practice/PracticeView';
import { SimuladoSetup } from './components/simulado/SimuladoSetup';
import { SimuladoActive } from './components/simulado/SimuladoActive';
import { SimuladoResult } from './components/simulado/SimuladoResult';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { ValidationDashboard } from './components/validation/ValidationDashboard';
import { Search, X, BookOpen, Calculator, ArrowRight } from 'lucide-react';

export function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<string>('home');
  
  // Grade filter for formulas tab
  const [activeGradeFilter, setActiveGradeFilter] = useState<GradeLevel | 'all'>('all');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');

  // Selected formula for detail modal
  const [selectedFormulaModal, setSelectedFormulaModal] = useState<Formula | null>(null);

  // Selected formula ID for the global calculator
  const [calculatorFormulaId, setCalculatorFormulaId] = useState<string>(ALL_FORMULAS[0].id);

  // User progress state
  const [userProgress, setUserProgress] = useState(() => getUserProgress());

  // Simulado state: 'setup' | 'active' | 'result'
  const [simuladoStep, setSimuladoStep] = useState<'setup' | 'active' | 'result'>('setup');
  const [activeSimulado, setActiveSimulado] = useState<SimuladoSession | null>(null);

  // Global Quick Search Dialog
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [globalSearchInput, setGlobalSearchInput] = useState<string>('');

  const refreshStats = () => {
    setUserProgress(getUserProgress());
  };

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleHeroSearch = (query: string) => {
    setActiveSearchQuery(query);
    setActiveGradeFilter('all');
    setCurrentTab('formulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGradeFromHero = (grade: GradeLevel) => {
    setActiveGradeFilter(grade);
    setActiveSearchQuery('');
    setCurrentTab('formulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFormulaCalculator = (formula: Formula) => {
    setCalculatorFormulaId(formula.id);
    setCurrentTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToFormulaById = (formulaId: string) => {
    const f = ALL_FORMULAS.find(x => x.id === formulaId);
    if (f) {
      setSelectedFormulaModal(f);
    }
  };

  // Simulado Flow Handlers
  const handleStartSimulado = (count: 10 | 20 | 30, grade: GradeLevel | 'all') => {
    const session = createSimuladoSession(count, grade);
    setActiveSimulado(session);
    setSimuladoStep('active');
    setCurrentTab('simulado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSimuladoQuestion = (index: number, answerData: any) => {
    if (!activeSimulado) return;
    setActiveSimulado(prev => {
      if (!prev) return null;
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        ...answerData
      };
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };

  const handleFinishSimulado = () => {
    if (!activeSimulado) return;
    const completedSession: SimuladoSession = {
      ...activeSimulado,
      completedAt: Date.now(),
      isFinished: true
    };
    setActiveSimulado(completedSession);
    recordSimuladoFinished(completedSession);
    refreshStats();
    setSimuladoStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global search matching results
  const searchResults = globalSearchInput.trim() 
    ? searchFormulas(globalSearchInput).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'simulado' && simuladoStep === 'result') {
            setSimuladoStep('setup');
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. HOME VIEW */}
        {currentTab === 'home' && (
          <div>
            <Hero
              onSearch={handleHeroSearch}
              onSelectGrade={handleSelectGradeFromHero}
              onGoToSimulado={() => {
                setSimuladoStep('setup');
                setCurrentTab('simulado');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToFormulas={() => {
                setActiveGradeFilter('all');
                setActiveSearchQuery('');
                setCurrentTab('formulas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToCalculator={() => {
                setCurrentTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Top Formulas Section */}
            <TopFormulas
              formulas={getTopFormulas()}
              onSelectFormula={(f) => setSelectedFormulaModal(f)}
              onOpenCalculator={handleOpenFormulaCalculator}
              onViewAll={() => {
                setActiveGradeFilter('all');
                setActiveSearchQuery('');
                setCurrentTab('formulas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Side-by-side Practice & Progress Section */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                
                {/* Pratique Agora Widget */}
                <QuickPractice
                  onGoToFullPractice={() => {
                    setCurrentTab('practice');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onRefreshStats={refreshStats}
                />

                {/* Seu Progresso Widget */}
                <ProgressOverview
                  progress={userProgress}
                  onGoToProgressDashboard={() => {
                    setCurrentTab('progress');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onGoToFormula={handleGoToFormulaById}
                />

              </div>
            </section>
          </div>
        )}

        {/* 2. FORMULAS VIEW */}
        {currentTab === 'formulas' && (
          <FormulaList
            initialGrade={activeGradeFilter}
            initialSearch={activeSearchQuery}
            onSelectFormula={(f) => setSelectedFormulaModal(f)}
            onOpenCalculator={handleOpenFormulaCalculator}
          />
        )}

        {/* 3. CALCULATOR VIEW */}
        {currentTab === 'calculator' && (
          <GlobalCalculator
            initialFormulaId={calculatorFormulaId}
          />
        )}

        {/* 4. PRACTICE VIEW */}
        {currentTab === 'practice' && (
          <PracticeView
            onRefreshStats={refreshStats}
          />
        )}

        {/* 5. SIMULADO VIEW */}
        {currentTab === 'simulado' && (
          <div>
            {simuladoStep === 'setup' && (
              <SimuladoSetup
                onStart={handleStartSimulado}
              />
            )}

            {simuladoStep === 'active' && activeSimulado && (
              <SimuladoActive
                session={activeSimulado}
                onUpdateQuestion={handleUpdateSimuladoQuestion}
                onFinish={handleFinishSimulado}
                onCancel={() => setSimuladoStep('setup')}
              />
            )}

            {simuladoStep === 'result' && activeSimulado && (
              <SimuladoResult
                session={activeSimulado}
                onRestart={() => setSimuladoStep('setup')}
                onGoToFormula={handleGoToFormulaById}
                onGoToHome={() => {
                  setCurrentTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        )}

        {/* 6. PROGRESS VIEW */}
        {currentTab === 'progress' && (
          <ProgressDashboard
            progress={userProgress}
            onRefresh={refreshStats}
            onGoToFormula={handleGoToFormulaById}
            onGoToSimulado={() => {
              setSimuladoStep('setup');
              setCurrentTab('simulado');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 7. VALIDATION VIEW */}
        {currentTab === 'validation' && (
          <ValidationDashboard />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onFilterGrade={(g) => {
          setActiveGradeFilter(g);
          setActiveSearchQuery('');
          setCurrentTab('formulas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modal: Full Formula Details */}
      {selectedFormulaModal && (
        <FormulaDetailModal
          formula={selectedFormulaModal}
          onClose={() => setSelectedFormulaModal(null)}
          onRefreshStats={refreshStats}
        />
      )}

      {/* Global Quick Search Modal (Ctrl+K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={globalSearchInput}
                onChange={(e) => setGlobalSearchInput(e.target.value)}
                placeholder="Buscar por fórmula, assunto ou palavra-chave..."
                className="w-full text-slate-800 placeholder-slate-400 font-semibold text-base focus:outline-hidden"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 max-h-96 overflow-y-auto">
              {globalSearchInput.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map(f => (
                      <div
                        key={f.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedFormulaModal(f);
                        }}
                        className="p-3 rounded-xl hover:bg-blue-50/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            f(x)
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                              {f.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {f.category} • {f.shortFormula}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-6 text-center text-sm text-slate-500">
                    Nenhuma fórmula encontrada para "{globalSearchInput}".
                  </p>
                )
              ) : (
                <div className="p-4 text-xs text-slate-400 space-y-2">
                  <p className="font-bold text-slate-500 uppercase tracking-wider">Sugestões rápidas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Bhaskara', 'Pitágoras', 'Círculo', 'Função Afim', 'PA', 'Cilindro'].map(kw => (
                      <button
                        key={kw}
                        onClick={() => setGlobalSearchInput(kw)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium transition-colors"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Pressione <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono">Esc</kbd> para fechar</span>
              <span>{ALL_FORMULAS.length} fórmulas catalogadas</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
