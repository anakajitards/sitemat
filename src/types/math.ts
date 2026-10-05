export type GradeLevel = '9ef' | '1em' | '2em';

export type MathCategory = 
  | 'Álgebra'
  | 'Geometria Plana'
  | 'Geometria Espacial'
  | 'Funções'
  | 'Progressões'
  | 'Trigonometria'
  | 'Análise Combinatória'
  | 'Probabilidade e Estatística'
  | 'Matrizes e Determinantes';

export type DifficultyLevel = 'Fácil' | 'Médio' | 'Difícil';

export type ExerciseType = 
  | 'multiple-choice'
  | 'true-false'
  | 'fill-in'
  | 'formula-choice'
  | 'contextual';

export interface VariableDef {
  symbol: string;
  name: string;
  meaning: string;
  unit?: string;
}

export interface SolvedExample {
  title: string;
  problem: string;
  steps: Array<{
    title: string;
    latex?: string;
    explanation: string;
  }>;
  finalAnswer: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  question: string;
  difficulty: DifficultyLevel;
  category: MathCategory;
  grade: GradeLevel;
  formulaId: string;
  formulaName: string;
  formulaLatex: string;
  // Multiple choice & contextual
  options?: string[];
  correctIndex?: number;
  // True / False
  isTrue?: boolean;
  // Numeric fill-in
  numericAnswer?: number;
  tolerance?: number;
  unit?: string;
  // Explanation & solution
  explanation: string;
  steps?: string[];
  // Dynamic generation support
  isDynamic?: boolean;
}

export interface CalculationInputDef {
  key: string;
  label: string;
  symbol: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface CalculationResult {
  success: boolean;
  value?: number;
  formattedResult?: string;
  isApproximation?: boolean;
  steps: string[];
  formulaUsed: string;
  error?: string;
}

export interface FormulaTestCase {
  description: string;
  inputs: Record<string, number>;
  expectedOutput: number | string;
  isApproximate?: boolean;
  tolerance?: number;
  shouldFail?: boolean;
  expectedErrorMessage?: string;
}

export interface Formula {
  id: string;
  name: string;
  grade: GradeLevel;
  category: MathCategory;
  latex: string;
  shortFormula: string;
  description: string;
  variables: VariableDef[];
  whenToUse: string[];
  example: SolvedExample;
  calculatorConfig: {
    inputs: CalculationInputDef[];
    compute: (inputs: Record<string, number>) => CalculationResult;
    testCases: FormulaTestCase[];
  };
  exercises: Exercise[];
  difficulty: DifficultyLevel;
  tags: string[];
  viewsCount?: number;
}

export interface UserProgress {
  totalAnswered: number;
  totalCorrect: number;
  studiedFormulas: string[]; // formula IDs
  needingReviewFormulas: string[]; // formula IDs
  topicStats: Record<string, { answered: number; correct: number }>;
  gradeStats: Record<GradeLevel, { answered: number; correct: number }>;
  simuladoHistory: Array<{
    id: string;
    date: string;
    totalQuestions: number;
    correctAnswers: number;
    score: number; // 0.0 - 10.0
    timeSpentSeconds: number;
    topicBreakdown: Record<string, { total: number; correct: number }>;
  }>;
}

export interface SimuladoQuestion extends Exercise {
  userSelectedOption?: number;
  userSelectedBool?: boolean;
  userNumericInput?: number;
  isAnswered?: boolean;
  isCorrect?: boolean;
}

export interface SimuladoSession {
  id: string;
  startedAt: number;
  completedAt?: number;
  totalQuestions: 10 | 20 | 30;
  gradeFilter?: GradeLevel | 'all';
  questions: SimuladoQuestion[];
  currentIndex: number;
  isFinished: boolean;
}
