import { UserProgress, Exercise, GradeLevel, SimuladoSession } from '../types/math';

const STORAGE_KEY = 'matematica_facil_user_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  totalAnswered: 0,
  totalCorrect: 0,
  studiedFormulas: ['teorema-de-pitagoras', 'formula-de-bhaskara'],
  needingReviewFormulas: [],
  topicStats: {
    'Álgebra': { answered: 0, correct: 0 },
    'Geometria Plana': { answered: 0, correct: 0 },
    'Geometria Espacial': { answered: 0, correct: 0 },
    'Funções': { answered: 0, correct: 0 },
    'Progressões': { answered: 0, correct: 0 },
    'Trigonometria': { answered: 0, correct: 0 },
    'Análise Combinatória': { answered: 0, correct: 0 },
    'Matrizes e Determinantes': { answered: 0, correct: 0 }
  },
  gradeStats: {
    '9ef': { answered: 0, correct: 0 },
    '1em': { answered: 0, correct: 0 },
    '2em': { answered: 0, correct: 0 }
  },
  simuladoHistory: []
};

export function getUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      topicStats: { ...INITIAL_PROGRESS.topicStats, ...(parsed.topicStats || {}) },
      gradeStats: { ...INITIAL_PROGRESS.gradeStats, ...(parsed.gradeStats || {}) }
    };
  } catch (e) {
    console.error('Falha ao ler progresso do localStorage:', e);
    return { ...INITIAL_PROGRESS };
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Falha ao salvar progresso:', e);
  }
}

export function recordExerciseAttempt(exercise: Exercise, isCorrect: boolean): UserProgress {
  const current = getUserProgress();

  current.totalAnswered += 1;
  if (isCorrect) {
    current.totalCorrect += 1;
    // Se acertou, remove da lista de revisão se estiver lá
    current.needingReviewFormulas = current.needingReviewFormulas.filter(id => id !== exercise.formulaId);
  } else {
    // Se errou, adiciona à lista de fórmulas que precisam de revisão
    if (!current.needingReviewFormulas.includes(exercise.formulaId)) {
      current.needingReviewFormulas.push(exercise.formulaId);
    }
  }

  // Registrar fórmula estudada
  if (!current.studiedFormulas.includes(exercise.formulaId)) {
    current.studiedFormulas.push(exercise.formulaId);
  }

  // Estatística por matéria
  const cat = exercise.category;
  if (!current.topicStats[cat]) {
    current.topicStats[cat] = { answered: 0, correct: 0 };
  }
  current.topicStats[cat].answered += 1;
  if (isCorrect) current.topicStats[cat].correct += 1;

  // Estatística por ano
  const grade = exercise.grade;
  if (!current.gradeStats[grade]) {
    current.gradeStats[grade] = { answered: 0, correct: 0 };
  }
  current.gradeStats[grade].answered += 1;
  if (isCorrect) current.gradeStats[grade].correct += 1;

  saveUserProgress(current);
  return current;
}

export function recordFormulaView(formulaId: string): void {
  const current = getUserProgress();
  if (!current.studiedFormulas.includes(formulaId)) {
    current.studiedFormulas.push(formulaId);
    saveUserProgress(current);
  }
}

export function recordSimuladoFinished(session: SimuladoSession): UserProgress {
  const current = getUserProgress();
  const total = session.questions.length;
  let correct = 0;
  const breakdown: Record<string, { total: number; correct: number }> = {};

  session.questions.forEach(q => {
    current.totalAnswered += 1;
    const cat = q.category;
    if (!breakdown[cat]) breakdown[cat] = { total: 0, correct: 0 };
    breakdown[cat].total += 1;

    if (!current.topicStats[cat]) current.topicStats[cat] = { answered: 0, correct: 0 };
    current.topicStats[cat].answered += 1;

    if (!current.gradeStats[q.grade]) current.gradeStats[q.grade] = { answered: 0, correct: 0 };
    current.gradeStats[q.grade].answered += 1;

    if (q.isCorrect) {
      correct += 1;
      current.totalCorrect += 1;
      breakdown[cat].correct += 1;
      current.topicStats[cat].correct += 1;
      current.gradeStats[q.grade].correct += 1;
      current.needingReviewFormulas = current.needingReviewFormulas.filter(id => id !== q.formulaId);
    } else {
      if (!current.needingReviewFormulas.includes(q.formulaId)) {
        current.needingReviewFormulas.push(q.formulaId);
      }
    }
  });

  const score = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
  const timeSpent = session.completedAt && session.startedAt 
    ? Math.max(1, Math.round((session.completedAt - session.startedAt) / 1000))
    : 60;

  current.simuladoHistory.unshift({
    id: session.id,
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    totalQuestions: total,
    correctAnswers: correct,
    score,
    timeSpentSeconds: timeSpent,
    topicBreakdown: breakdown
  });

  saveUserProgress(current);
  return current;
}

export function resetUserProgress(): UserProgress {
  const fresh = { ...INITIAL_PROGRESS, studiedFormulas: [] };
  saveUserProgress(fresh);
  return fresh;
}

export function getStudyRecommendations(progress: UserProgress): Array<{ topic: string; message: string; formulaIds: string[] }> {
  const recommendations: Array<{ topic: string; message: string; formulaIds: string[] }> = [];

  for (const [topic, stats] of Object.entries(progress.topicStats)) {
    if (stats.answered >= 2) {
      const rate = (stats.correct / stats.answered) * 100;
      if (rate < 60) {
        let msg = `Você está com ${rate.toFixed(0)}% de acerto em ${topic}. Que tal revisar os conceitos fundamentais?`;
        let formulas: string[] = [];
        if (topic === 'Trigonometria') {
          msg = 'Você está com dificuldade em Trigonometria. Que tal revisar seno, cosseno, tangente e a Lei dos Cossenos?';
          formulas = ['razoes-trigonometricas-triangulo-retangulo', 'lei-dos-cossenos'];
        } else if (topic === 'Álgebra') {
          msg = 'Reforce sua base em Álgebra revisando Bhaskara, Produtos Notáveis e Regra de Três.';
          formulas = ['formula-de-bhaskara', 'produtos-notaveis-quadrado-soma', 'regra-de-tres-simples'];
        } else if (topic === 'Geometria Plana') {
          msg = 'Atenção aos cálculos de Geometria Plana: revise Teorema de Pitágoras e Área do Círculo.';
          formulas = ['teorema-de-pitagoras', 'area-do-circulo'];
        } else if (topic === 'Geometria Espacial') {
          msg = 'Pratique o cálculo de volumes de cilindros, esferas e prismas para melhorar seu desempenho espacial.';
          formulas = ['volume-cilindro', 'volume-esfera'];
        } else if (topic === 'Funções') {
          msg = 'Revise raízes de Função Afim e as coordenadas do Vértice da Parábola (ponto de máximo e mínimo).';
          formulas = ['funcao-afim', 'vertice-da-parabola'];
        } else if (topic === 'Progressões') {
          msg = 'Pratique a identificação de razão e aplicação do termo geral de PA e PG.';
          formulas = ['pa-termo-geral', 'pa-soma-termos', 'pg-termo-geral'];
        } else if (topic === 'Análise Combinatória') {
          msg = 'Lembre-se da regra de ouro: se a ordem dos elementos importar é Arranjo, se a ordem não importar é Combinação!';
          formulas = ['combinacao-simples'];
        }
        recommendations.push({ topic, message: msg, formulaIds: formulas });
      }
    }
  }

  return recommendations;
}
