import { Formula } from '../../types/math';
import { round, formatNumberBR } from '../../utils/mathEngine';

export const grade10Formulas: Formula[] = [
  {
    id: 'funcao-afim',
    name: 'Função Afim (1º Grau)',
    grade: '1em',
    category: 'Funções',
    latex: 'f(x) = ax + b, \\quad x_{\\text{raiz}} = -\\frac{b}{a}',
    shortFormula: 'f(x) = ax + b',
    description: 'Uma função polinomial do 1º grau cujo gráfico é uma reta. O coeficiente a indica a inclinação (crescente se a > 0, decrescente se a < 0) e b indica onde a reta corta o eixo Y.',
    variables: [
      { symbol: 'a', name: 'Coeficiente angular', meaning: 'Taxa de variação da função (inclinação da reta), com a ≠ 0.' },
      { symbol: 'b', name: 'Coeficiente linear', meaning: 'Valor de f(0), ponto onde a reta cruza o eixo vertical (Y).' },
      { symbol: 'x', name: 'Variável independente', meaning: 'Entrada da função.' },
      { symbol: 'f(x)', name: 'Valor da função', meaning: 'Saída correspondente da função para o dado x.' }
    ],
    whenToUse: [
      'Em situações com taxa de crescimento ou decréscimo constante (ex: corrida de táxi com bandeirada fixa + valor por km).',
      'Para achar a raiz (zero da função) igualando f(x) = 0.',
      'Quando o gráfico for uma linha reta não vertical.'
    ],
    example: {
      title: 'Custo de corrida de aplicativo',
      problem: 'Uma corrida de táxi cobra uma taxa fixa de R$ 5,00 (bandeirada) mais R$ 2,50 por quilômetro rodado. Escreva a lei da função e calcule o valor para 10 km rodados.',
      steps: [
        { title: 'Montar a função', latex: 'f(x) = 2{,}50x + 5', explanation: 'Taxa por km a = 2,50; taxa fixa b = 5.' },
        { title: 'Substituir x = 10', latex: 'f(10) = 2{,}50 \\times 10 + 5', explanation: 'Multiplicamos 2,50 por 10 e somamos 5.' },
        { title: 'Calcular o total', latex: 'f(10) = 25 + 5 = 30', explanation: 'O valor da corrida é R$ 30,00.' }
      ],
      finalAnswer: 'A função é f(x) = 2,50x + 5 e o valor para 10 km é R$ 30,00.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Coeficiente a (inclinação)', symbol: 'a', placeholder: 'Ex: 2', defaultValue: 2 },
        { key: 'b', label: 'Coeficiente b (fixo)', symbol: 'b', placeholder: 'Ex: 5', defaultValue: 5 },
        { key: 'x', label: 'Ponto x para calcular f(x)', symbol: 'x', placeholder: 'Ex: 3', defaultValue: 3 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        const x = inputs['x'];
        if (a === undefined || b === undefined || x === undefined) {
          return { success: false, steps: [], formulaUsed: 'f(x) = ax + b', error: 'Informe a, b e x.' };
        }
        if (a === 0) {
          return { success: false, steps: [], formulaUsed: 'f(x) = ax + b', error: 'O coeficiente a deve ser diferente de zero para ser função do 1º grau.' };
        }
        const fx = a * x + b;
        const root = -b / a;
        return {
          success: true,
          value: fx,
          formattedResult: `f(${x}) = ${formatNumberBR(fx, 2)}`,
          formulaUsed: 'f(x) = ax + b',
          steps: [
            `Lei da função: f(x) = (${formatNumberBR(a)})x + (${formatNumberBR(b)})`,
            `Cálculo para x = ${formatNumberBR(x)}: f(${x}) = ${formatNumberBR(a)} · ${formatNumberBR(x)} + ${formatNumberBR(b)} = ${formatNumberBR(fx, 2)}`,
            `Comportamento: A função é ${a > 0 ? 'ESTRITAMENTE CRESCENTE (a > 0)' : 'ESTRITAMENTE DECRESCENTE (a < 0)'}.`,
            `Ponto de corte no eixo Y: (0, ${formatNumberBR(b)})`,
            `Raiz ou zero da função [f(x) = 0]: x = -b/a = -(${formatNumberBR(b)})/${formatNumberBR(a)} = ${formatNumberBR(root, 3)}`
          ]
        };
      },
      testCases: [
        { description: 'f(x) = 2x + 5 para x = 3 -> 11', inputs: { a: 2, b: 5, x: 3 }, expectedOutput: 11 },
        { description: 'f(x) = -3x + 9 para x = 3 -> 0 (raiz)', inputs: { a: -3, b: 9, x: 3 }, expectedOutput: 0 }
      ]
    },
    exercises: [
      {
        id: 'afim-ex1',
        type: 'multiple-choice',
        title: 'Zero da Função Afim',
        question: 'Qual é a raiz da função afim f(x) = 3x - 12?',
        difficulty: 'Fácil',
        category: 'Funções',
        grade: '1em',
        formulaId: 'funcao-afim',
        formulaName: 'Função Afim (1º Grau)',
        formulaLatex: 'f(x) = 0 \\implies x = -\\frac{b}{a}',
        options: ['x = 4', 'x = -4', 'x = 12', 'x = 3'],
        correctIndex: 0,
        explanation: 'Para achar a raiz, igualamos a função a zero: 3x - 12 = 0 ⇒ 3x = 12 ⇒ x = 12 / 3 = 4.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['funcao afim', '1 grau', 'reta', 'coeficiente angular', 'coeficiente linear', 'funcoes']
  },

  {
    id: 'vertice-da-parabola',
    name: 'Vértice da Parábola (Função Quadrática)',
    grade: '1em',
    category: 'Funções',
    latex: 'X_v = -\\frac{b}{2a}, \\quad Y_v = -\\frac{\\Delta}{4a}',
    shortFormula: 'Xv = -b/(2a), Yv = -Δ/(4a)',
    description: 'Determina as coordenadas do ponto máximo (se a < 0) ou mínimo (se a > 0) de uma parábola descrita por f(x) = ax² + bx + c.',
    variables: [
      { symbol: 'X_v', name: 'Abscissa do vértice', meaning: 'Ponto x no qual a função atinge seu valor máximo ou mínimo.' },
      { symbol: 'Y_v', name: 'Ordenada do vértice', meaning: 'O próprio valor máximo ou mínimo atingido pela função.' },
      { symbol: 'a, b, c', name: 'Coeficientes', meaning: 'Parâmetros da parábola com a ≠ 0.' },
      { symbol: '\\Delta', name: 'Discriminante', meaning: 'Δ = b² - 4ac.' }
    ],
    whenToUse: [
      'Em problemas de otimização: "lucro máximo", "altura máxima atingida", "área máxima com determinado perímetro", "custo mínimo".',
      'Quando o problema perguntar: "Qual é o valor máximo/mínimo?" (Y_v) ou "Para qual valor de x ele ocorre?" (X_v).'
    ],
    example: {
      title: 'Altura máxima de um foguete de brinquedo',
      problem: 'A trajetória de um foguete é dada por h(t) = -5t² + 20t. Qual a altura máxima atingida e em qual instante ela ocorre?',
      steps: [
        { title: 'Identificar coeficientes', explanation: 'a = -5, b = 20, c = 0.' },
        { title: 'Instante de altura máxima (Xv)', latex: 't_v = -\\frac{b}{2a} = -\\frac{20}{2(-5)} = \\frac{-20}{-10} = 2 \\text{ s}', explanation: 'Atinge a altura máxima em t = 2 segundos.' },
        { title: 'Calcular Delta e Altura máxima (Yv)', latex: '\\Delta = 20^2 - 4(-5)(0) = 400', explanation: 'Δ = 400.' },
        { title: 'Calcular Yv', latex: 'h_{\\text{máx}} = -\\frac{\\Delta}{4a} = -\\frac{400}{4(-5)} = \\frac{-400}{-20} = 20 \\text{ m}', explanation: 'Ou calculando h(2) = -5(2)² + 20(2) = -20 + 40 = 20 m.' }
      ],
      finalAnswer: 'O foguete atinge a altura máxima de 20 metros aos 2 segundos.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Coeficiente a (≠ 0)', symbol: 'a', placeholder: 'Ex: -5', defaultValue: -5 },
        { key: 'b', label: 'Coeficiente b', symbol: 'b', placeholder: 'Ex: 20', defaultValue: 20 },
        { key: 'c', label: 'Coeficiente c', symbol: 'c', placeholder: 'Ex: 0', defaultValue: 0 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        const c = inputs['c'];
        if (a === undefined || b === undefined || c === undefined) return { success: false, steps: [], formulaUsed: 'Xv = -b/(2a)', error: 'Informe a, b e c.' };
        if (a === 0) return { success: false, steps: [], formulaUsed: 'Xv = -b/(2a)', error: 'a não pode ser zero (não seria parábola).' };

        const xv = -b / (2 * a);
        const delta = b * b - 4 * a * c;
        const yv = -delta / (4 * a);
        const tipo = a > 0 ? 'Ponto de MÍNIMO (concavidade voltada para cima)' : 'Ponto de MÁXIMO (concavidade voltada para baixo)';

        return {
          success: true,
          value: yv,
          formattedResult: `V = (${formatNumberBR(xv, 2)}, ${formatNumberBR(yv, 2)})`,
          formulaUsed: 'X_v = -\\frac{b}{2a}, \\quad Y_v = -\\frac{\\Delta}{4a}',
          steps: [
            `Classificação: Como a = ${formatNumberBR(a)} ${a > 0 ? '> 0' : '< 0'}, o vértice é um ${tipo}.`,
            `Cálculo de X_v: X_v = -(${formatNumberBR(b)}) / (2 · ${formatNumberBR(a)}) = ${formatNumberBR(xv, 2)}`,
            `Cálculo de Δ: Δ = (${formatNumberBR(b)})² - 4·(${formatNumberBR(a)})·(${formatNumberBR(c)}) = ${formatNumberBR(delta)}`,
            `Cálculo de Y_v: Y_v = -(${formatNumberBR(delta)}) / (4 · ${formatNumberBR(a)}) = ${formatNumberBR(yv, 2)}`,
            `Coordenadas do Vértice: V(${formatNumberBR(xv, 2)}, ${formatNumberBR(yv, 2)})`
          ]
        };
      },
      testCases: [
        { description: 'Vértice de -5x² + 20x -> (2, 20)', inputs: { a: -5, b: 20, c: 0 }, expectedOutput: 20 },
        { description: 'Vértice de x² - 4x + 3 -> (2, -1)', inputs: { a: 1, b: -4, c: 3 }, expectedOutput: -1 }
      ]
    },
    exercises: [
      {
        id: 'vert-ex1',
        type: 'multiple-choice',
        title: 'Lucro Máximo de uma Empresa',
        question: 'O lucro de uma fábrica de skates em reais é dado pela função L(x) = -2x² + 40x - 50, onde x é o número de peças vendidas. Quantas peças devem ser vendidas para obter o lucro MÁXIMO?',
        difficulty: 'Médio',
        category: 'Funções',
        grade: '1em',
        formulaId: 'vertice-da-parabola',
        formulaName: 'Vértice da Parábola (Função Quadrática)',
        formulaLatex: 'X_v = -\\frac{b}{2a}',
        options: ['10 peças', '20 peças', '150 peças', '5 peças'],
        correctIndex: 0,
        explanation: 'A pergunta é "quantas peças" (valor de x), logo queremos o X_v: X_v = -b / (2a) = -40 / (2 · (-2)) = -40 / -4 = 10 peças.'
      }
    ],
    difficulty: 'Médio',
    tags: ['vertice', 'parabola', 'funcao quadratica', 'maximo e minimo', 'otimizacao', 'funcoes']
  },

  {
    id: 'pa-termo-geral',
    name: 'Progressão Aritmética (PA) - Termo Geral',
    grade: '1em',
    category: 'Progressões',
    latex: 'a_n = a_1 + (n - 1) \\cdot r',
    shortFormula: 'an = a1 + (n - 1)r',
    description: 'Permite calcular qualquer termo da posição n em uma sequência onde a diferença entre termos consecutivos é constante (a razão r).',
    variables: [
      { symbol: 'a_n', name: 'Enésimo termo', meaning: 'O termo que ocupa a posição n na sequência.' },
      { symbol: 'a_1', name: 'Primeiro termo', meaning: 'O ponto de partida da sequência.' },
      { symbol: 'n', name: 'Número de termos / Posição', meaning: 'A posição ordinal do termo (deve ser inteiro positivo).' },
      { symbol: 'r', name: 'Razão da PA', meaning: 'O valor constante somado a cada passo: r = a₂ - a₁.' }
    ],
    whenToUse: [
      'Quando uma sequência numérica cresce ou decresce adicionando sempre o mesmo valor fixo.',
      'Para descobrir termos distantes (ex: "qual o 50º termo?") sem precisar escrever todos.',
      'Para descobrir quantos termos existem em uma sequência finita.'
    ],
    example: {
      title: '20º termo da PA (3, 7, 11, ...)',
      problem: 'Determine o 20º termo da Progressão Aritmética (3, 7, 11, ...).',
      steps: [
        { title: 'Identificar os dados', explanation: 'Primeiro termo a₁ = 3. Razão r = 7 - 3 = 4. Posição n = 20.' },
        { title: 'Aplicar a fórmula do termo geral', latex: 'a_{20} = a_1 + (20 - 1) \\cdot r', explanation: 'Substituímos os valores conhecidos.' },
        { title: 'Calcular', latex: 'a_{20} = 3 + 19 \\cdot 4 = 3 + 76 = 79', explanation: 'Multiplicamos 19 por 4 e somamos 3.' }
      ],
      finalAnswer: 'O vigésimo termo da PA é 79.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a1', label: 'Primeiro termo (a₁)', symbol: 'a₁', placeholder: 'Ex: 3', defaultValue: 3 },
        { key: 'r', label: 'Razão (r)', symbol: 'r', placeholder: 'Ex: 4', defaultValue: 4 },
        { key: 'n', label: 'Posição do termo (n)', symbol: 'n', placeholder: 'Ex: 20', defaultValue: 20, min: 1, step: 1 }
      ],
      compute: (inputs) => {
        const a1 = inputs['a1'];
        const r = inputs['r'];
        const n = inputs['n'];
        if (a1 === undefined || r === undefined || n === undefined) return { success: false, steps: [], formulaUsed: 'an = a1 + (n-1)r', error: 'Informe a1, r e n.' };
        if (n <= 0 || !Number.isInteger(n)) return { success: false, steps: [], formulaUsed: 'an = a1 + (n-1)r', error: 'A posição n deve ser um número inteiro positivo (1, 2, 3...).' };

        const an = a1 + (n - 1) * r;
        return {
          success: true,
          value: an,
          formattedResult: `a_${n} = ${formatNumberBR(an, 2)}`,
          formulaUsed: 'a_n = a_1 + (n - 1) \\cdot r',
          steps: [
            `Fórmula: a_n = a₁ + (n - 1) · r`,
            `Substituição: a_${n} = ${formatNumberBR(a1)} + (${n} - 1) · ${formatNumberBR(r)}`,
            `Parênteses: ${n - 1} · ${formatNumberBR(r)} = ${formatNumberBR((n - 1) * r)}`,
            `Soma final: a_${n} = ${formatNumberBR(a1)} + ${formatNumberBR((n - 1) * r)} = ${formatNumberBR(an, 2)}`
          ]
        };
      },
      testCases: [
        { description: 'PA a1=3, r=4, n=20 -> 79', inputs: { a1: 3, r: 4, n: 20 }, expectedOutput: 79 },
        { description: 'PA decrescente a1=100, r=-5, n=11 -> 50', inputs: { a1: 100, r: -5, n: 11 }, expectedOutput: 50 },
        { description: 'Rejeitar n <= 0', inputs: { a1: 3, r: 4, n: -2 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'inteiro positivo' }
      ]
    },
    exercises: [
      {
        id: 'pa-ex1',
        type: 'multiple-choice',
        title: 'Décimo Termo da PA',
        question: 'Dada a PA (2, 5, 8, 11, ...), qual é o 10º termo?',
        difficulty: 'Fácil',
        category: 'Progressões',
        grade: '1em',
        formulaId: 'pa-termo-geral',
        formulaName: 'PA - Termo Geral',
        formulaLatex: 'a_n = a_1 + (n - 1)r',
        options: ['29', '32', '27', '30'],
        correctIndex: 0,
        explanation: 'a₁ = 2, r = 5 - 2 = 3. a₁₀ = 2 + (10 - 1) · 3 = 2 + 9 · 3 = 2 + 27 = 29.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['pa', 'progressao aritmetica', 'termo geral', 'razao', 'sequencias']
  },

  {
    id: 'pa-soma-termos',
    name: 'Progressão Aritmética (PA) - Soma dos Termos',
    grade: '1em',
    category: 'Progressões',
    latex: 'S_n = \\frac{(a_1 + a_n) \\cdot n}{2}',
    shortFormula: 'Sn = ((a1 + an) · n) / 2',
    description: 'Calcula a soma dos n primeiros termos de uma Progressão Aritmética finita (fórmula deduzida por Carl Friedrich Gauss na infância).',
    variables: [
      { symbol: 'S_n', name: 'Soma dos termos', meaning: 'Soma acumulada de a₁ até a_n.' },
      { symbol: 'a_1', name: 'Primeiro termo', meaning: 'Início da sequência somada.' },
      { symbol: 'a_n', name: 'Último termo', meaning: 'Enésimo termo da soma.' },
      { symbol: 'n', name: 'Quantidade de termos', meaning: 'Número total de elementos que estão sendo somados.' }
    ],
    whenToUse: [
      'Quando precisar somar uma sequência com passos constantes (ex: soma dos números de 1 a 100, ou acúmulo de depósitos mensais que aumentam em quantia fixa).',
      'Problemas de assentos em anfiteatros ou fileiras em formato triangular.'
    ],
    example: {
      title: 'Soma dos números de 1 a 100',
      problem: 'Calcule a soma de todos os números inteiros de 1 a 100.',
      steps: [
        { title: 'Identificar dados', explanation: 'Primeiro termo a₁ = 1, Último termo a₁₀₀ = 100, Quantidade n = 100.' },
        { title: 'Aplicar a fórmula de Gauss', latex: 'S_{100} = \\frac{(1 + 100) \\cdot 100}{2}', explanation: 'Parênteses somam 101.' },
        { title: 'Calcular o total', latex: 'S_{100} = \\frac{101 \\cdot 100}{2} = \\frac{10100}{2} = 5050', explanation: 'A soma resulta em 5050.' }
      ],
      finalAnswer: 'A soma dos números de 1 a 100 é 5050.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a1', label: 'Primeiro termo (a₁)', symbol: 'a₁', placeholder: 'Ex: 1', defaultValue: 1 },
        { key: 'an', label: 'Último termo (a_n)', symbol: 'a_n', placeholder: 'Ex: 100', defaultValue: 100 },
        { key: 'n', label: 'Quantidade de termos (n)', symbol: 'n', placeholder: 'Ex: 100', defaultValue: 100, min: 1, step: 1 }
      ],
      compute: (inputs) => {
        const a1 = inputs['a1'];
        const an = inputs['an'];
        const n = inputs['n'];
        if (a1 === undefined || an === undefined || n === undefined) return { success: false, steps: [], formulaUsed: 'Sn = ((a1 + an) · n)/2', error: 'Informe a1, an e n.' };
        if (n <= 0 || !Number.isInteger(n)) return { success: false, steps: [], formulaUsed: 'Sn = ((a1 + an) · n)/2', error: 'n deve ser inteiro positivo.' };

        const sum = ((a1 + an) * n) / 2;
        return {
          success: true,
          value: sum,
          formattedResult: `S_${n} = ${formatNumberBR(sum, 2)}`,
          formulaUsed: 'S_n = \\frac{(a_1 + a_n) \\cdot n}{2}',
          steps: [
            `Fórmula: S_n = ((a₁ + a_n) · n) / 2`,
            `Substituição: S_${n} = ((${formatNumberBR(a1)} + ${formatNumberBR(an)}) · ${n}) / 2`,
            `Soma dos extremos: ${formatNumberBR(a1 + an)}`,
            `Multiplicação por n: ${formatNumberBR((a1 + an) * n)}`,
            `Resultado: S_${n} = ${formatNumberBR(sum, 2)}`
          ]
        };
      },
      testCases: [
        { description: 'Soma de 1 a 100 -> 5050', inputs: { a1: 1, an: 100, n: 100 }, expectedOutput: 5050 },
        { description: 'Soma a1=2, an=10, n=5 -> 30', inputs: { a1: 2, an: 10, n: 5 }, expectedOutput: 30 }
      ]
    },
    exercises: [
      {
        id: 'pa-soma-ex1',
        type: 'multiple-choice',
        title: 'Soma dos 10 Primeiros Pares Positivos',
        question: 'Qual é a soma dos 10 primeiros números pares positivos (2, 4, 6, ..., 20)?',
        difficulty: 'Médio',
        category: 'Progressões',
        grade: '1em',
        formulaId: 'pa-soma-termos',
        formulaName: 'PA - Soma dos Termos',
        formulaLatex: 'S_n = \\frac{(a_1 + a_n) \\cdot n}{2}',
        options: ['110', '100', '120', '90'],
        correctIndex: 0,
        explanation: 'a₁ = 2, a₁₀ = 20, n = 10. S₁₀ = ((2 + 20) · 10) / 2 = (22 · 10) / 2 = 220 / 2 = 110.'
      }
    ],
    difficulty: 'Médio',
    tags: ['pa', 'soma de pa', 'gauss', 'sequencias', 'progressoes']
  },

  {
    id: 'pg-termo-geral',
    name: 'Progressão Geométrica (PG) - Termo Geral',
    grade: '1em',
    category: 'Progressões',
    latex: 'a_n = a_1 \\cdot q^{n - 1}',
    shortFormula: 'an = a1 · q^(n - 1)',
    description: 'Calcula o enésimo termo de uma progressão multiplicativa, onde cada termo subsequente é obtido multiplicando o anterior pela razão q.',
    variables: [
      { symbol: 'a_n', name: 'Enésimo termo', meaning: 'Termo na posição n.' },
      { symbol: 'a_1', name: 'Primeiro termo', meaning: 'Termo inicial da PG (≠ 0).' },
      { symbol: 'q', name: 'Razão da PG', meaning: 'Fator multiplicativo constante: q = a₂ / a₁.' },
      { symbol: 'n', name: 'Posição do termo', meaning: 'Índice do termo procurado.' }
    ],
    whenToUse: [
      'Em situações com crescimento ou decaimento exponencial: duplicação de bactérias, juros compostos, meias-vidas radioativas.',
      'Sempre que a sequência avança multiplicando e não somando.'
    ],
    example: {
      title: 'População de Bactérias',
      problem: 'Uma colônia de bactérias começa com 100 indivíduos e duplica a cada hora. Quantas bactérias haverá após 5 horas (6º termo da sequência)?',
      steps: [
        { title: 'Identificar variáveis', explanation: 'Início a₁ = 100, Razão q = 2, Posição n = 6 (hora 0 é a₁, hora 5 é a₆).' },
        { title: 'Substituir no termo geral', latex: 'a_6 = 100 \\cdot 2^{6 - 1} = 100 \\cdot 2^5', explanation: '2 elevado a 5.' },
        { title: 'Calcular a potência', latex: '2^5 = 32', explanation: '32 vezes 100.' },
        { title: 'Resultado', latex: 'a_6 = 100 \\cdot 32 = 3200', explanation: '3.200 bactérias.' }
      ],
      finalAnswer: 'Haverá 3.200 bactérias.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a1', label: 'Primeiro termo (a₁)', symbol: 'a₁', placeholder: 'Ex: 100', defaultValue: 100 },
        { key: 'q', label: 'Razão (q)', symbol: 'q', placeholder: 'Ex: 2', defaultValue: 2 },
        { key: 'n', label: 'Posição (n)', symbol: 'n', placeholder: 'Ex: 6', defaultValue: 6, min: 1, step: 1 }
      ],
      compute: (inputs) => {
        const a1 = inputs['a1'];
        const q = inputs['q'];
        const n = inputs['n'];
        if (a1 === undefined || q === undefined || n === undefined) return { success: false, steps: [], formulaUsed: 'an = a1 · q^(n-1)', error: 'Informe a1, q e n.' };
        if (n <= 0 || !Number.isInteger(n)) return { success: false, steps: [], formulaUsed: 'an = a1 · q^(n-1)', error: 'n deve ser inteiro positivo.' };

        const power = Math.pow(q, n - 1);
        const an = a1 * power;
        return {
          success: true,
          value: an,
          formattedResult: `a_${n} = ${formatNumberBR(an, 2)}`,
          formulaUsed: 'a_n = a_1 \\cdot q^{n - 1}',
          steps: [
            `Fórmula: a_n = a₁ · q^(n - 1)`,
            `Substituição: a_${n} = ${formatNumberBR(a1)} · (${formatNumberBR(q)})^(${n} - 1)`,
            `Potência: (${formatNumberBR(q)})^${n - 1} = ${formatNumberBR(power, 4)}`,
            `Resultado: a_${n} = ${formatNumberBR(a1)} · ${formatNumberBR(power, 4)} = ${formatNumberBR(an, 2)}`
          ]
        };
      },
      testCases: [
        { description: 'PG a1=100, q=2, n=6 -> 3200', inputs: { a1: 100, q: 2, n: 6 }, expectedOutput: 3200 },
        { description: 'PG a1=3, q=3, n=4 -> 81', inputs: { a1: 3, q: 3, n: 4 }, expectedOutput: 81 }
      ]
    },
    exercises: [
      {
        id: 'pg-ex1',
        type: 'multiple-choice',
        title: '5º Termo da PG',
        question: 'Dada a PG (2, 6, 18, ...), qual é o 5º termo?',
        difficulty: 'Médio',
        category: 'Progressões',
        grade: '1em',
        formulaId: 'pg-termo-geral',
        formulaName: 'PG - Termo Geral',
        formulaLatex: 'a_n = a_1 \\cdot q^{n - 1}',
        options: ['162', '54', '486', '72'],
        correctIndex: 0,
        explanation: 'a₁ = 2, q = 6 / 2 = 3. a₅ = 2 · 3⁴ = 2 · 81 = 162.'
      }
    ],
    difficulty: 'Médio',
    tags: ['pg', 'progressao geometrica', 'razao', 'exponencial', 'progressoes']
  },

  {
    id: 'definicao-de-logaritmo',
    name: 'Definição de Logaritmo',
    grade: '1em',
    category: 'Álgebra',
    latex: '\\log_b(a) = x \\iff b^x = a',
    shortFormula: 'log_b(a) = x ⟺ b^x = a',
    description: 'O logaritmo de um número positivo a na base b (b > 0 e b ≠ 1) é o expoente x ao qual se deve elevar a base b para obter o logaritmando a.',
    variables: [
      { symbol: 'a', name: 'Logaritmando', meaning: 'Número real positivo (a > 0).' },
      { symbol: 'b', name: 'Base do logaritmo', meaning: 'Número real positivo e diferente de 1 (b > 0 e b ≠ 1).' },
      { symbol: 'x', name: 'Logaritmo (expoente)', meaning: 'O expoente procurado tal que b^x = a.' }
    ],
    whenToUse: [
      'Para isolar incógnitas presentes no expoente (equações exponenciais).',
      'Em escalas logarítmicas como Richter (terremotos), pH (química) e decibéis (acústica).'
    ],
    example: {
      title: 'Cálculo de log₂ 32',
      problem: 'Calcule o valor de log₂ 32.',
      steps: [
        { title: 'Escrever a equação equivalente', latex: '\\log_2(32) = x \\iff 2^x = 32', explanation: 'Qual expoente faz 2 virar 32?' },
        { title: 'Fatorar 32 em base 2', latex: '32 = 2^5', explanation: '2·2·2·2·2 = 32.' },
        { title: 'Igualar os expoentes', latex: '2^x = 2^5 \\implies x = 5', explanation: 'Como as bases são iguais, os expoentes também são.' }
      ],
      finalAnswer: 'log₂ 32 = 5.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Logaritmando a (> 0)', symbol: 'a', placeholder: 'Ex: 32', defaultValue: 32, min: 0.0001 },
        { key: 'b', label: 'Base b (> 0 e ≠ 1)', symbol: 'b', placeholder: 'Ex: 2', defaultValue: 2, min: 0.0001 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        if (a === undefined || b === undefined) return { success: false, steps: [], formulaUsed: 'log_b(a) = x ⟺ b^x = a', error: 'Informe o logaritmando e a base.' };
        if (a <= 0) return { success: false, steps: [], formulaUsed: 'log_b(a)', error: 'Condição de existência violada: o logaritmando a deve ser estritamente positivo (a > 0).' };
        if (b <= 0 || b === 1) return { success: false, steps: [], formulaUsed: 'log_b(a)', error: 'Condição de existência violada: a base b deve ser positiva e diferente de 1 (b > 0 e b ≠ 1).' };

        const logVal = Math.log(a) / Math.log(b);
        const isInt = Number.isInteger(round(logVal, 5));
        return {
          success: true,
          value: logVal,
          formattedResult: `log_${b}(${a}) = ${formatNumberBR(logVal, 3)}`,
          isApproximation: !isInt,
          formulaUsed: '\\log_b(a) = \\frac{\\ln(a)}{\\ln(b)}',
          steps: [
            `Condições de existência: a = ${formatNumberBR(a)} > 0 e b = ${formatNumberBR(b)} > 0, b ≠ 1 (Satisfeitas).`,
            `Equação exponencial associada: (${formatNumberBR(b)})^x = ${formatNumberBR(a)}`,
            `Mudança para logaritmo neperiano: x = ln(${formatNumberBR(a)}) / ln(${formatNumberBR(b)})`,
            `Resultado: x = ${formatNumberBR(logVal, 4)}${isInt ? ' (valor exato)' : ' (aproximado)'}`
          ]
        };
      },
      testCases: [
        { description: 'log2(32) -> 5', inputs: { a: 32, b: 2 }, expectedOutput: 5 },
        { description: 'log10(1000) -> 3', inputs: { a: 1000, b: 10 }, expectedOutput: 3 },
        { description: 'Rejeitar a <= 0', inputs: { a: -8, b: 2 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'estritamente positivo' },
        { description: 'Rejeitar base b = 1', inputs: { a: 10, b: 1 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'diferente de 1' }
      ]
    },
    exercises: [
      {
        id: 'log-ex1',
        type: 'multiple-choice',
        title: 'Cálculo de Logaritmo',
        question: 'Qual é o valor de log₃ 81?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '1em',
        formulaId: 'definicao-de-logaritmo',
        formulaName: 'Definição de Logaritmo',
        formulaLatex: '\\log_3(81) = x \\iff 3^x = 81',
        options: ['4', '3', '27', '9'],
        correctIndex: 0,
        explanation: '3^x = 81. Fatorando: 81 = 3⁴. Logo, x = 4.'
      }
    ],
    difficulty: 'Médio',
    tags: ['logaritmo', 'potenciacao', 'exponencial', 'algebra']
  },

  {
    id: 'razoes-trigonometricas-triangulo-retangulo',
    name: 'Trigonometria no Triângulo Retângulo (Soh-Cah-Toa)',
    grade: '1em',
    category: 'Trigonometria',
    latex: '\\text{sen}(\\alpha) = \\frac{\\text{CO}}{H}, \\quad \\cos(\\alpha) = \\frac{\\text{CA}}{H}, \\quad \\text{tg}(\\alpha) = \\frac{\\text{CO}}{\\text{CA}}',
    shortFormula: 'sen = CO/H, cos = CA/H, tg = CO/CA',
    description: 'Relações entre os ângulos agudos de um triângulo retângulo e as razões entre os comprimentos dos seus lados.',
    variables: [
      { symbol: 'CO', name: 'Cateto Oposto', meaning: 'Lado que fica de frente para o ângulo agudo considerado.' },
      { symbol: 'CA', name: 'Cateto Adjacente', meaning: 'Lado que toca o ângulo agudo (junto com a hipotenusa).' },
      { symbol: 'H', name: 'Hipotenusa', meaning: 'Maior lado do triângulo retângulo, oposto ao ângulo reto.' },
      { symbol: '\\alpha', name: 'Ângulo agudo', meaning: 'Ângulo medido entre 0° e 90°.' }
    ],
    whenToUse: [
      'Quando você conhece um ângulo e a medida de um lado e precisa descobrir outro lado do triângulo retângulo.',
      'Em problemas de elevação solar, sombras de prédios e rampas de acessibilidade.'
    ],
    example: {
      title: 'Altura de um edifício pela sombra',
      problem: 'A sombra de um prédio mede 20 metros quando os raios solares incidem sob um ângulo de 30° com o solo. Qual a altura do prédio? (Considere tg 30° ≈ 0,58).',
      steps: [
        { title: 'Identificar catetos', explanation: 'A altura h é o Cateto Oposto ao ângulo de 30°. A sombra de 20 m é o Cateto Adjacente.' },
        { title: 'Escolher a razão trigonométrica', latex: '\\text{tg}(30^\\circ) = \\frac{\\text{CO}}{\\text{CA}} = \\frac{h}{20}', explanation: 'Como temos Cateto Oposto e Adjacente, usamos a tangente.' },
        { title: 'Calcular h', latex: 'h = 20 \\times \\text{tg}(30^\\circ) \\approx 20 \\times 0{,}58 = 11{,}6 \\text{ m}', explanation: 'Multiplicamos 20 pela tangente de 30°.' }
      ],
      finalAnswer: 'A altura do prédio é de aproximadamente 11,6 metros.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'co', label: 'Cateto Oposto (CO)', symbol: 'CO', placeholder: 'Ex: 3', defaultValue: 3, min: 0.001 },
        { key: 'ca', label: 'Cateto Adjacente (CA)', symbol: 'CA', placeholder: 'Ex: 4', defaultValue: 4, min: 0.001 }
      ],
      compute: (inputs) => {
        const co = inputs['co'];
        const ca = inputs['ca'];
        if (co === undefined || ca === undefined) return { success: false, steps: [], formulaUsed: 'sen, cos, tg', error: 'Informe CO e CA.' };
        if (co <= 0 || ca <= 0) return { success: false, steps: [], formulaUsed: 'sen, cos, tg', error: 'Catetos devem ser positivos.' };

        const h = Math.sqrt(co * co + ca * ca);
        const sen = co / h;
        const cos = ca / h;
        const tg = co / ca;
        const angDeg = (Math.atan(co / ca) * 180) / Math.PI;

        return {
          success: true,
          value: sen,
          formattedResult: `sen = ${formatNumberBR(sen, 3)}, cos = ${formatNumberBR(cos, 3)}, tg = ${formatNumberBR(tg, 3)}`,
          formulaUsed: '\\text{sen} = \\frac{\\text{CO}}{H}, \\cos = \\frac{\\text{CA}}{H}, \\text{tg} = \\frac{\\text{CO}}{\\text{CA}}',
          steps: [
            `Cálculo da Hipotenusa (Pitágoras): H = √((${co})² + (${ca})²) = √(${co * co + ca * ca}) = ${formatNumberBR(h, 3)}`,
            `Seno (CO / H): ${co} / ${formatNumberBR(h, 3)} = ${formatNumberBR(sen, 4)}`,
            `Cosseno (CA / H): ${ca} / ${formatNumberBR(h, 3)} = ${formatNumberBR(cos, 4)}`,
            `Tangente (CO / CA): ${co} / ${ca} = ${formatNumberBR(tg, 4)}`,
            `Ângulo aproximado: α ≈ ${formatNumberBR(angDeg, 1)}°`
          ]
        };
      },
      testCases: [
        { description: 'Triângulo 3, 4 -> H=5, sen=0.6', inputs: { co: 3, ca: 4 }, expectedOutput: 0.6 }
      ]
    },
    exercises: [
      {
        id: 'trig-ex1',
        type: 'multiple-choice',
        title: 'Cálculo do Seno',
        question: 'Em um triângulo retângulo, o cateto oposto a um ângulo α mede 6 cm e a hipotenusa mede 10 cm. Qual é o valor de sen(α)?',
        difficulty: 'Fácil',
        category: 'Trigonometria',
        grade: '1em',
        formulaId: 'razoes-trigonometricas-triangulo-retangulo',
        formulaName: 'Trigonometria no Triângulo Retângulo',
        formulaLatex: '\\text{sen}(\\alpha) = \\frac{\\text{CO}}{H}',
        options: ['0,6', '0,8', '0,75', '1,66'],
        correctIndex: 0,
        explanation: 'sen(α) = CO / H = 6 / 10 = 0,6.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['trigonometria', 'seno', 'cosseno', 'tangente', 'triangulo retangulo']
  }
];
