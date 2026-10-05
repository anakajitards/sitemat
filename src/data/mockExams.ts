import { SimuladoSession, SimuladoQuestion, GradeLevel } from '../types/math';
import { ALL_FORMULAS } from './formulas';
import { generateDynamicExercise } from './exerciseTemplates';

export function createSimuladoSession(count: 10 | 20 | 30, gradeFilter: GradeLevel | 'all' = 'all'): SimuladoSession {
  // Collect all static exercises that match the grade filter
  const eligibleStatic = ALL_FORMULAS
    .filter(f => gradeFilter === 'all' || f.grade === gradeFilter)
    .flatMap(f => f.exercises);

  const selectedQuestions: SimuladoQuestion[] = [];
  const usedKeys = new Set<string>();

  // 1. Take a representative batch of static exercises
  const shuffledStatic = [...eligibleStatic].sort(() => Math.random() - 0.5);
  for (const ex of shuffledStatic) {
    if (selectedQuestions.length >= count) break;
    if (!usedKeys.has(ex.id)) {
      usedKeys.add(ex.id);
      selectedQuestions.push({
        ...ex,
        isAnswered: false,
        isCorrect: false
      });
    }
  }

  // 2. If we need more to reach count (e.g. 20 or 30 questions), generate dynamic ones
  while (selectedQuestions.length < count) {
    const dyn = generateDynamicExercise({ grade: gradeFilter });
    selectedQuestions.push({
      ...dyn,
      isAnswered: false,
      isCorrect: false
    });
  }

  // Final shuffle of the question order
  const finalQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

  return {
    id: `sim-${Date.now()}`,
    startedAt: Date.now(),
    totalQuestions: count,
    gradeFilter,
    questions: finalQuestions,
    currentIndex: 0,
    isFinished: false
  };
}
