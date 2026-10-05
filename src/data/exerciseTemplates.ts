import { Exercise, GradeLevel, MathCategory, DifficultyLevel } from '../types/math';
import { round, formatNumberBR, combination } from '../utils/mathEngine';

// Helper to pick random item
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper for random integer in range [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateDynamicExercise(options?: {
  grade?: GradeLevel | 'all';
  category?: MathCategory | 'all';
  difficulty?: DifficultyLevel | 'all';
}): Exercise {
  const generators = [
    // 1. Pitágoras dinâmico
    () => {
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [6, 8, 10],
        [9, 12, 15],
        [8, 15, 17]
      ];
      const [b, c, a] = randomChoice(triples);
      const isFindingHypotenuse = Math.random() > 0.5;

      if (isFindingHypotenuse) {
        const correct = `${a} cm`;
        const wrong1 = `${b + c} cm`;
        const wrong2 = `${a + 2} cm`;
        const wrong3 = `${b * c} cm`;
        const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);
        return {
          id: `dyn-pit-${Date.now()}-${Math.random()}`,
          type: 'multiple-choice' as const,
          title: 'Teorema de Pitágoras (Cálculo Dinâmico)',
          question: `Em um triângulo retângulo, os dois catetos medem ${b} cm e ${c} cm. Qual é a medida da hipotenusa?`,
          difficulty: 'Fácil' as const,
          category: 'Geometria Plana' as const,
          grade: '9ef' as const,
          formulaId: 'teorema-de-pitagoras',
          formulaName: 'Teorema de Pitágoras',
          formulaLatex: 'a^2 = b^2 + c^2',
          options: optionsList,
          correctIndex: optionsList.indexOf(correct),
          explanation: `Aplicando a fórmula a² = b² + c²: a² = ${b}² + ${c}² = ${b * b} + ${c * c} = ${a * a}. Portanto, a = √${a * a} = ${a} cm.`,
          isDynamic: true
        };
      } else {
        const correct = `${b} cm`;
        const wrong1 = `${a - c} cm`;
        const wrong2 = `${b + 3} cm`;
        const wrong3 = `${round(Math.sqrt(a + c), 1)} cm`;
        const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);
        return {
          id: `dyn-pit-cat-${Date.now()}-${Math.random()}`,
          type: 'multiple-choice' as const,
          title: 'Teorema de Pitágoras (Descobrir Cateto)',
          question: `Um triângulo retângulo tem hipotenusa medindo ${a} cm e um dos catetos medindo ${c} cm. Quanto mede o outro cateto?`,
          difficulty: 'Médio' as const,
          category: 'Geometria Plana' as const,
          grade: '9ef' as const,
          formulaId: 'teorema-de-pitagoras',
          formulaName: 'Teorema de Pitágoras',
          formulaLatex: 'a^2 = b^2 + c^2 \\implies b = \\sqrt{a^2 - c^2}',
          options: optionsList,
          correctIndex: optionsList.indexOf(correct),
          explanation: `Isolando o cateto faltante: b² = a² - c² = ${a}² - ${c}² = ${a * a} - ${c * c} = ${b * b}. Portanto, b = √${b * b} = ${b} cm.`,
          isDynamic: true
        };
      }
    },

    // 2. Bhaskara Dinâmica
    () => {
      const roots = [
        [2, 3],
        [1, 4],
        [2, 5],
        [-1, 3],
        [-2, 4],
        [3, 5]
      ];
      const [r1, r2] = randomChoice(roots);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
      const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
      const eqStr = `x² ${bSign}x ${cSign} = 0`;

      const correct = `x₁ = ${Math.min(r1, r2)} e x₂ = ${Math.max(r1, r2)}`;
      const wrong1 = `x₁ = ${-Math.min(r1, r2)} e x₂ = ${-Math.max(r1, r2)}`;
      const wrong2 = `x₁ = ${r1 + 1} e x₂ = ${r2 - 1}`;
      const wrong3 = `x₁ = ${r1 * 2} e x₂ = ${r2 * 2}`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-bhas-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Fórmula de Bhaskara (Equação Quadrática)',
        question: `Quais são as raízes reais da equação quadrática: ${eqStr}?`,
        difficulty: 'Médio' as const,
        category: 'Álgebra' as const,
        grade: '9ef' as const,
        formulaId: 'formula-de-bhaskara',
        formulaName: 'Fórmula de Bhaskara',
        formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Identificando os coeficientes: a = 1, b = ${b}, c = ${c}. Calculando o discriminante: Δ = (${b})² - 4(1)(${c}) = ${b * b} - (${4 * c}) = ${(r1 - r2) ** 2}. Aplicando a fórmula: x = (-(${b}) ± √${(r1 - r2) ** 2}) / 2 = (${-b} ± ${Math.abs(r1 - r2)}) / 2, resultando em x₁ = ${r1} e x₂ = ${r2}.`,
        isDynamic: true
      };
    },

    // 3. Área do Círculo Dinâmica
    () => {
      const radiusList = [2, 3, 4, 5, 6, 10];
      const r = randomChoice(radiusList);
      const area = round(3.14 * r * r, 2);
      const correct = `${formatNumberBR(area)} cm²`;
      const wrong1 = `${formatNumberBR(round(2 * 3.14 * r, 2))} cm²`; // perímetro como distrator
      const wrong2 = `${formatNumberBR(round(3.14 * (r + 2) ** 2, 2))} cm²`;
      const wrong3 = `${formatNumberBR(round(r * r, 2))} cm²`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-circ-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Área do Círculo',
        question: `Determine a área de um círculo cujo raio mede ${r} cm (adote π = 3,14).`,
        difficulty: 'Fácil' as const,
        category: 'Geometria Plana' as const,
        grade: '9ef' as const,
        formulaId: 'area-do-circulo',
        formulaName: 'Área do Círculo',
        formulaLatex: 'A = \\pi r^2',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Aplicando a fórmula A = π · r²: A = 3,14 · (${r})² = 3,14 · ${r * r} = ${formatNumberBR(area)} cm².`,
        isDynamic: true
      };
    },

    // 4. PA Termo Geral Dinâmica
    () => {
      const a1 = randInt(2, 10);
      const r = randInt(2, 6);
      const n = randInt(10, 25);
      const an = a1 + (n - 1) * r;
      const correct = `${an}`;
      const wrong1 = `${an + r}`;
      const wrong2 = `${an - r}`;
      const wrong3 = `${a1 + n * r}`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-pa-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Progressão Aritmética (Termo Geral)',
        question: `Em uma PA onde o primeiro termo é a₁ = ${a1} e a razão é r = ${r}, qual é o valor do ${n}º termo (a_${n})?`,
        difficulty: 'Fácil' as const,
        category: 'Progressões' as const,
        grade: '1em' as const,
        formulaId: 'pa-termo-geral',
        formulaName: 'PA - Termo Geral',
        formulaLatex: 'a_n = a_1 + (n - 1)r',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Fórmula: a_n = a₁ + (n - 1) · r. Substituindo: a_${n} = ${a1} + (${n} - 1) · ${r} = ${a1} + ${n - 1} · ${r} = ${a1} + ${(n - 1) * r} = ${an}.`,
        isDynamic: true
      };
    },

    // 5. Função Afim Dinâmica
    () => {
      const a = randInt(2, 6);
      const b = randInt(3, 15);
      const x = randInt(2, 8);
      const fx = a * x + b;
      const correct = `${fx}`;
      const wrong1 = `${fx + a}`;
      const wrong2 = `${fx - b}`;
      const wrong3 = `${a * (x + b)}`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-afim-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Valor Numérico da Função Afim',
        question: `Dada a função do 1º grau f(x) = ${a}x + ${b}, qual é o valor de f(${x})?`,
        difficulty: 'Fácil' as const,
        category: 'Funções' as const,
        grade: '1em' as const,
        formulaId: 'funcao-afim',
        formulaName: 'Função Afim (1º Grau)',
        formulaLatex: 'f(x) = ax + b',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Substituímos x por ${x}: f(${x}) = ${a} · (${x}) + ${b} = ${a * x} + ${b} = ${fx}.`,
        isDynamic: true
      };
    },

    // 6. Combinação Simples Dinâmica
    () => {
      const pairs = [
        [6, 2],
        [7, 2],
        [8, 2],
        [6, 3],
        [8, 3],
        [5, 3]
      ];
      const [n, p] = randomChoice(pairs);
      const res = combination(n, p);
      const correct = `${res} maneiras`;
      const wrong1 = `${res * 2} maneiras`; // arranjo como distrator para p=2
      const wrong2 = `${res + 5} maneiras`;
      const wrong3 = `${n * p} maneiras`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-comb-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Combinação Simples',
        question: `De quantas maneiras diferentes é possível selecionar um grupo de ${p} pessoas a partir de um total de ${n} pessoas disponíveis?`,
        difficulty: 'Médio' as const,
        category: 'Análise Combinatória' as const,
        grade: '2em' as const,
        formulaId: 'combinacao-simples',
        formulaName: 'Combinação Simples',
        formulaLatex: 'C_{n, p} = \\frac{n!}{p!(n - p)!}',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Como a ordem das pessoas escolhidas não altera a comissão, usamos Combinação Simples: C(${n}, ${p}) = ${n}! / (${p}! · ${n - p}!) = ${res} maneiras.`,
        isDynamic: true
      };
    },

    // 7. Volume do Cilindro Dinâmico
    () => {
      const r = randInt(2, 5);
      const h = randInt(4, 10);
      const vol = round(3.14 * r * r * h, 2);
      const correct = `${formatNumberBR(vol)} cm³`;
      const wrong1 = `${formatNumberBR(round(3.14 * r * h, 2))} cm³`;
      const wrong2 = `${formatNumberBR(round(vol * 2, 2))} cm³`;
      const wrong3 = `${formatNumberBR(round(vol / 3, 2))} cm³`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-cil-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Volume do Cilindro',
        question: `Calcule o volume de um reservatório cilíndrico reto com raio de base ${r} cm e altura ${h} cm (use π = 3,14).`,
        difficulty: 'Médio' as const,
        category: 'Geometria Espacial' as const,
        grade: '2em' as const,
        formulaId: 'volume-cilindro',
        formulaName: 'Cilindro (Volume e Área Total)',
        formulaLatex: 'V = \\pi r^2 h',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Aplicamos a fórmula do volume: V = π · r² · h = 3,14 · (${r})² · ${h} = 3,14 · ${r * r} · ${h} = ${formatNumberBR(vol)} cm³.`,
        isDynamic: true
      };
    },

    // 8. Determinante 2x2 Dinâmico
    () => {
      const a = randInt(1, 6);
      const b = randInt(1, 5);
      const c = randInt(1, 5);
      const d = randInt(1, 6);
      const det = a * d - b * c;
      const correct = `${det}`;
      const wrong1 = `${a * d + b * c}`; // erro comum: somar em vez de subtrair
      const wrong2 = `${det + 2}`;
      const wrong3 = `${-det}`;
      const optionsList = shuffle([correct, wrong1, wrong2, wrong3]);

      return {
        id: `dyn-det-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        title: 'Determinante de Matriz 2x2',
        question: `Calcule o determinante da matriz quadrada M = [[${a}, ${b}], [${c}, ${d}]].`,
        difficulty: 'Fácil' as const,
        category: 'Matrizes e Determinantes' as const,
        grade: '2em' as const,
        formulaId: 'determinante-2x2',
        formulaName: 'Determinante de Matriz 2x2',
        formulaLatex: '\\det(M) = ad - bc',
        options: optionsList,
        correctIndex: optionsList.indexOf(correct),
        explanation: `Diagonal principal menos secundária: det = (${a} · ${d}) - (${b} · ${c}) = ${a * d} - ${b * c} = ${det}.`,
        isDynamic: true
      };
    }
  ];

  // Filter generators matching grade/category if possible
  const chosenGen = randomChoice(generators);
  return chosenGen();
}
