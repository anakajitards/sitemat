import React, { useState, useEffect, useMemo } from 'react';
import { Exercise, GradeLevel, MathCategory, DifficultyLevel } from '../../types/math';
import { ALL_FORMULAS, CATEGORIES } from '../../data/formulas';
import { generateDynamicExercise } from '../../data/exerciseTemplates';
import { recordExerciseAttempt } from '../../utils/storage';
import { MathRenderer } from '../common/MathRenderer';
import { 
  GraduationCap, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  Flame,
  Award,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeViewProps {
  onRefreshStats?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onRefreshStats }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  
  // Current exercise
  const [currentExercise, setCurrentExercise] = useState<Exercise>(() => generateDynamicExercise());
  
  // User answer state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userBoolAnswer, setUserBoolAnswer] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Session stats
  const [sessionScore, setSessionScore] = useState<{ total: number; correct: number; streak: number }>({
    total: 0,
    correct: 0,
    streak: 0
  });

  // Pull all static exercises from formulas database
  const allStaticExercises = useMemo(() => {
    return ALL_FORMULAS.flatMap(f => f.exercises);
  }, []);

  // Filter eligible static exercises
  const filteredStatic = useMemo(() => {
    return allStaticExercises.filter(ex => {
      if (selectedGrade !== 'all' && ex.grade !== selectedGrade) return false;
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [allStaticExercises, selectedGrade, selectedCategory, selectedDifficulty]);

  const loadNewExercise = () => {
    setHasAnswered(false);
    setSelectedOption(null);
    setUserNumericInput('');
    setUserBoolAnswer(null);
    setIsCorrect(false);

    // 50% chance of dynamic exercise if compatible or if no matching static
    if (Math.random() > 0.4 || filteredStatic.length === 0) {
      setCurrentExercise(generateDynamicExercise({
        grade: selectedGrade,
        category: selectedCategory as MathCategory,
        difficulty: selectedDifficulty
      }));
    } else {
      const randomStatic = filteredStatic[Math.floor(Math.random() * filteredStatic.length)];
      setCurrentExercise(randomStatic);
    }
  };

  const handleAnswerSubmit = (optionIndex?: number, boolVal?: boolean, numVal?: number) => {
    if (hasAnswered) return;

    let correct = false;

    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'formula-choice') {
      const idx = optionIndex ?? selectedOption;
      if (idx === null || idx === undefined) return;
      setSelectedOption(idx);
      correct = idx === currentExercise.correctIndex;
    } else if (currentExercise.type === 'true-false') {
      const val = boolVal !== undefined ? boolVal : userBoolAnswer;
      if (val === null) return;
      setUserBoolAnswer(val);
      correct = val === currentExercise.isTrue;
    } else if (currentExercise.type === 'fill-in') {
      const parsed = numVal !== undefined ? numVal : parseFloat(userNumericInput);
      if (isNaN(parsed)) return;
      const tol = currentExercise.tolerance ?? 0.05;
      correct = Math.abs(parsed - (currentExercise.numericAnswer ?? 0)) <= tol;
    }

    setIsCorrect(correct);
    setHasAnswered(true);

    // Update session streak & score
    setSessionScore(prev => ({
      total: prev.total + 1,
      correct: correct ? prev.correct + 1 : prev.correct,
      streak: correct ? prev.streak + 1 : 0
    }));

    recordExerciseAttempt(currentExercise, correct);
    onRefreshStats?.();

    if (correct) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Área Pratique</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pratique e Domine
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Exercícios contextualizados com gabarito imediato e passo a passo explicativo.
          </p>
        </div>

        {/* Session Score Card */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs self-start sm:self-auto">
          <div className="text-center px-2">
            <span className="text-lg font-black text-slate-900">{sessionScore.correct}/{sessionScore.total}</span>
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Acertos na Sessão</p>
          </div>
          {sessionScore.streak > 1 && (
            <div className="border-l border-slate-200 pl-3 flex items-center gap-1.5 text-amber-600">
              <Flame className="w-5 h-5 fill-amber-500" />
              <span className="text-xs font-black">{sessionScore.streak} seguidos!</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filtros de Prática:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Ano */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Ano Escolar:</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">Todos os Anos</option>
              <option value="9ef">9º ano do Ensino Fundamental</option>
              <option value="1em">1º ano do Ensino Médio</option>
              <option value="2em">2º ano do Ensino Médio</option>
            </select>
          </div>

          {/* Matéria */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Matéria:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">Todas as Matérias</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Dificuldade */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Dificuldade:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="all">Todas as Dificuldades</option>
              <option value="Fácil">Fácil</option>
              <option value="Médio">Médio</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Exercise Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/50 mb-8">
        
        {/* Question Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              {currentExercise.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
              {currentExercise.difficulty}
            </span>
            {currentExercise.isDynamic && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3" /> Valores Dinâmicos
              </span>
            )}
          </div>

          <button
            onClick={loadNewExercise}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Pular / Outra Questão</span>
          </button>
        </div>

        {/* Question Title & Text */}
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          {currentExercise.title}
        </h2>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          {currentExercise.question}
        </div>

        {/* Multiple Choice Options */}
        {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'formula-choice') && currentExercise.options && (
          <div className="space-y-3 mb-6">
            {currentExercise.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isRight = idx === currentExercise.correctIndex;
              let style = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

              if (hasAnswered) {
                if (isRight) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                } else if (isSelected && !isRight) {
                  style = 'bg-rose-50 border-rose-500 text-rose-950';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSubmit(idx)}
                  className={`w-full p-4 rounded-xl border font-semibold text-left text-sm sm:text-base flex items-center justify-between gap-3 transition-all cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {hasAnswered && isRight && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isRight && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True / False Options */}
        {currentExercise.type === 'true-false' && (
          <div className="flex gap-4 mb-6">
            {[true, false].map(val => {
              const isSelected = userBoolAnswer === val;
              const isRight = val === currentExercise.isTrue;
              let style = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800';

              if (hasAnswered) {
                if (isRight) {
                  style = 'bg-emerald-600 text-white font-bold border-emerald-600';
                } else if (isSelected && !isRight) {
                  style = 'bg-rose-600 text-white font-bold border-rose-600';
                } else {
                  style = 'bg-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={String(val)}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSubmit(undefined, val)}
                  className={`flex-1 py-4 rounded-2xl border text-base font-bold transition-all ${style}`}
                >
                  {val ? 'VERDADEIRO' : 'FALSO'}
                </button>
              );
            })}
          </div>
        )}

        {/* Fill-in numerical option */}
        {currentExercise.type === 'fill-in' && !hasAnswered && (
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              step="any"
              value={userNumericInput}
              onChange={(e) => setUserNumericInput(e.target.value)}
              placeholder="Digite o valor numérico..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 font-semibold text-slate-900"
            />
            <button
              onClick={() => handleAnswerSubmit()}
              disabled={!userNumericInput}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm transition-colors"
            >
              Responder
            </button>
          </div>
        )}

        {/* Feedback Card after answering */}
        {hasAnswered && (
          <div className={`p-5 rounded-2xl border animate-in fade-in duration-300 mb-6 ${
            isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-base mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800">Parabéns! Você acertou a questão.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-rose-800">Resposta incorreta. O importante é entender a resolução:</span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base leading-relaxed mb-4 text-slate-800">
              {currentExercise.explanation}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Fórmula utilizada:</span>
              <span className="font-mono bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md font-bold">
                {currentExercise.formulaLatex}
              </span>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/80 flex justify-end">
              <button
                onClick={loadNewExercise}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Próximo Exercício</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
