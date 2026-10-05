import { Formula } from '../../types/math';
import { round, formatNumberBR, factorial, arrangement, combination, degToRad } from '../../utils/mathEngine';

export const grade11Formulas: Formula[] = [
  {
    id: 'lei-dos-cossenos',
    name: 'Lei dos Cossenos',
    grade: '2em',
    category: 'Trigonometria',
    latex: 'a^2 = b^2 + c^2 - 2bc \\cdot \\cos(A)',
    shortFormula: 'a² = b² + c² - 2bc · cos(A)',
    description: 'Generalização do Teorema de Pitágoras para qualquer triângulo (inclusive acutângulos e obtusângulos). Relaciona os três lados de um triângulo com o cosseno de um dos seus ângulos internos.',
    variables: [
      { symbol: 'a', name: 'Lado oposto ao ângulo A', meaning: 'Comprimento do lado que fica em frente ao ângulo fornecido.' },
      { symbol: 'b, c', name: 'Lados adjacentes', meaning: 'Comprimentos dos dois lados que formam o ângulo A.' },
      { symbol: 'A', name: 'Ângulo interno', meaning: 'Ângulo formado entre os lados b e c (em graus ou radianos).' }
    ],
    whenToUse: [
      'Quando você conhece as medidas de dois lados e o ângulo formado entre eles (lado-ângulo-lado) e quer achar o terceiro lado.',
      'Quando conhece todos os três lados e quer descobrir a medida de um ângulo interno.',
      'Em triângulos não retângulos onde Pitágoras não pode ser aplicado diretamente.'
    ],
    example: {
      title: 'Triângulo com ângulo de 60°',
      problem: 'Em um triângulo, dois lados medem 5 cm e 8 cm, formando entre si um ângulo de 60°. Calcule o comprimento do terceiro lado. (Dado: cos 60° = 0,5).',
      steps: [
        { title: 'Identificar os dados', explanation: 'b = 5, c = 8, ângulo A = 60°, a = ?' },
        { title: 'Substituir na Lei dos Cossenos', latex: 'a^2 = 5^2 + 8^2 - 2 \\cdot 5 \\cdot 8 \\cdot \\cos(60^\\circ)', explanation: 'Substituímos b, c e cos(60°).' },
        { title: 'Calcular as potências e produtos', latex: 'a^2 = 25 + 64 - 80 \\cdot 0{,}5 = 89 - 40 = 49', explanation: '89 menos 40 resulta em 49.' },
        { title: 'Extrair a raiz', latex: 'a = \\sqrt{49} = 7', explanation: 'O lado mede 7 cm.' }
      ],
      finalAnswer: 'O terceiro lado mede 7 cm.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'b', label: 'Lado b', symbol: 'b', placeholder: 'Ex: 5', defaultValue: 5, min: 0.001 },
        { key: 'c', label: 'Lado c', symbol: 'c', placeholder: 'Ex: 8', defaultValue: 8, min: 0.001 },
        { key: 'angleA', label: 'Ângulo A (em graus)', symbol: 'Â', placeholder: 'Ex: 60', defaultValue: 60, min: 0.1, max: 179.9 }
      ],
      compute: (inputs) => {
        const b = inputs['b'];
        const c = inputs['c'];
        const angleA = inputs['angleA'];
        if (b === undefined || c === undefined || angleA === undefined) {
          return { success: false, steps: [], formulaUsed: 'a² = b² + c² - 2bc·cos(A)', error: 'Informe b, c e o ângulo A.' };
        }
        if (b <= 0 || c <= 0) {
          return { success: false, steps: [], formulaUsed: 'a² = b² + c² - 2bc·cos(A)', error: 'Os lados devem ser números positivos.' };
        }
        if (angleA <= 0 || angleA >= 180) {
          return { success: false, steps: [], formulaUsed: 'a² = b² + c² - 2bc·cos(A)', error: 'O ângulo interno de um triângulo deve estar entre 0° e 180°.' };
        }

        const rad = degToRad(angleA);
        const cosA = Math.cos(rad);
        const b2 = b * b;
        const c2 = c * c;
        const term = 2 * b * c * cosA;
        const a2 = b2 + c2 - term;
        const a = Math.sqrt(Math.max(0, a2));
        const isInt = Number.isInteger(round(a, 4));

        return {
          success: true,
          value: a,
          formattedResult: `a ≈ ${formatNumberBR(a, 3)}`,
          isApproximation: !isInt,
          formulaUsed: 'a^2 = b^2 + c^2 - 2bc \\cdot \\cos(A)',
          steps: [
            `Fórmula: a² = b² + c² - 2·b·c·cos(A)`,
            `cos(${angleA}°) ≈ ${formatNumberBR(cosA, 4)}`,
            `Substituição: a² = (${formatNumberBR(b)})² + (${formatNumberBR(c)})² - 2·(${formatNumberBR(b)})·(${formatNumberBR(c)})·(${formatNumberBR(cosA, 4)})`,
            `Cálculo das parcelas: a² = ${formatNumberBR(b2)} + ${formatNumberBR(c2)} - ${formatNumberBR(term, 3)} = ${formatNumberBR(a2, 3)}`,
            `Raiz quadrada: a = √(${formatNumberBR(a2, 3)}) = ${formatNumberBR(a, 3)}${isInt ? ' (valor exato)' : ' (aproximado)'}`
          ]
        };
      },
      testCases: [
        { description: 'b=5, c=8, A=60° -> a=7', inputs: { b: 5, c: 8, angleA: 60 }, expectedOutput: 7 },
        { description: 'Triângulo retângulo b=3, c=4, A=90° -> a=5', inputs: { b: 3, c: 4, angleA: 90 }, expectedOutput: 5 },
        { description: 'Rejeitar ângulo >= 180°', inputs: { b: 5, c: 8, angleA: 180 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'entre 0° e 180°' }
      ]
    },
    exercises: [
      {
        id: 'coss-ex1',
        type: 'multiple-choice',
        title: 'Cálculo do Lado por Cossenos',
        question: 'Dois lados de um triângulo medem 6 cm e 10 cm, com ângulo entre eles de 60°. Sabendo que cos 60° = 0,5, qual é a medida do terceiro lado?',
        difficulty: 'Médio',
        category: 'Trigonometria',
        grade: '2em',
        formulaId: 'lei-dos-cossenos',
        formulaName: 'Lei dos Cossenos',
        formulaLatex: 'a^2 = b^2 + c^2 - 2bc \\cdot \\cos(A)',
        options: ['2√19 cm (≈ 8,72 cm)', '10 cm', '8 cm', '14 cm'],
        correctIndex: 0,
        explanation: 'a² = 6² + 10² - 2·6·10·(0,5) = 36 + 100 - 60 = 76. a = √76 = √(4·19) = 2√19 cm ≈ 8,72 cm.'
      }
    ],
    difficulty: 'Médio',
    tags: ['lei dos cossenos', 'trigonometria', 'triangulo qualquer', 'geometria']
  },

  {
    id: 'volume-cilindro',
    name: 'Cilindro (Volume e Área Total)',
    grade: '2em',
    category: 'Geometria Espacial',
    latex: 'V = \\pi r^2 h, \\quad A_{\\text{total}} = 2\\pi r(r + h)',
    shortFormula: 'V = πr²h, At = 2πr(r + h)',
    description: 'Calcula a capacidade cúbica (volume) e a área de superfície de um cilindro circular reto a partir do raio de sua base circular e de sua altura.',
    variables: [
      { symbol: 'V', name: 'Volume do cilindro', meaning: 'Capacidade interna em unidades cúbicas (ex: cm³, m³, litros).' },
      { symbol: 'r', name: 'Raio da base', meaning: 'Distância do centro até a borda do círculo da base.' },
      { symbol: 'h', name: 'Altura do cilindro', meaning: 'Distância vertical entre as duas bases circulares.' },
      { symbol: 'A_{\\text{total}}', name: 'Área da superfície', meaning: 'Soma das duas bases circulares mais a face lateral retangular.' }
    ],
    whenToUse: [
      'Para calcular capacidade de caixas d’água cilíndricas, latas de refrigerante ou tubulações.',
      'Sempre que o sólido geométrico tiver duas bases circulares paralelas e iguais unidas por uma superfície curva.'
    ],
    example: {
      title: 'Capacidade de um Reservatório',
      problem: 'Um reservatório de água tem formato cilíndrico com raio de 2 metros e altura de 5 metros. Qual é o seu volume? (Use π ≈ 3,14).',
      steps: [
        { title: 'Identificar os dados', explanation: 'Raio r = 2 m, Altura h = 5 m.' },
        { title: 'Aplicar a fórmula do volume', latex: 'V = \\pi \\cdot r^2 \\cdot h = 3{,}14 \\times 2^2 \\times 5', explanation: 'Primeiro calculamos o raio ao quadrado.' },
        { title: 'Calcular', latex: 'V = 3{,}14 \\times 4 \\times 5 = 3{,}14 \\times 20 = 62{,}8 \\text{ m}^3', explanation: 'Como 1 m³ = 1.000 L, isso equivale a 62.800 litros!' }
      ],
      finalAnswer: 'O volume do reservatório é de aproximadamente 62,8 m³ (62.800 litros).'
    },
    calculatorConfig: {
      inputs: [
        { key: 'r', label: 'Raio da base (r)', symbol: 'r', placeholder: 'Ex: 2', defaultValue: 2, min: 0.001 },
        { key: 'h', label: 'Altura (h)', symbol: 'h', placeholder: 'Ex: 5', defaultValue: 5, min: 0.001 }
      ],
      compute: (inputs) => {
        const r = inputs['r'];
        const h = inputs['h'];
        if (r === undefined || h === undefined) return { success: false, steps: [], formulaUsed: 'V = πr²h', error: 'Informe raio e altura.' };
        if (r <= 0 || h <= 0) return { success: false, steps: [], formulaUsed: 'V = πr²h', error: 'Raio e altura devem ser maiores que zero.' };

        const volume = Math.PI * r * r * h;
        const areaTotal = 2 * Math.PI * r * (r + h);

        return {
          success: true,
          value: volume,
          formattedResult: `V ≈ ${formatNumberBR(volume, 2)} un³ | At ≈ ${formatNumberBR(areaTotal, 2)} un²`,
          isApproximation: true,
          formulaUsed: 'V = \\pi r^2 h',
          steps: [
            `Fórmula do volume: V = π · r² · h`,
            `Substituição: V = π · (${formatNumberBR(r)})² · ${formatNumberBR(h)}`,
            `Área da base: Ab = π · ${formatNumberBR(r * r)} ≈ ${formatNumberBR(Math.PI * r * r, 2)}`,
            `Volume: V ≈ ${formatNumberBR(volume, 2)} unidades cúbicas (Resultado aproximado)`,
            `Área Total: At = 2πr(r + h) = 2 · π · ${formatNumberBR(r)} · (${formatNumberBR(r + h)}) ≈ ${formatNumberBR(areaTotal, 2)} unidades quadradas`
          ]
        };
      },
      testCases: [
        { description: 'Cilindro r=2, h=5 -> V ≈ 62.83', inputs: { r: 2, h: 5 }, expectedOutput: 62.83, isApproximate: true, tolerance: 0.02 },
        { description: 'Rejeitar raio <= 0', inputs: { r: -1, h: 5 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'maiores que zero' }
      ]
    },
    exercises: [
      {
        id: 'cil-ex1',
        type: 'multiple-choice',
        title: 'Volume de Lata de Refrigerante',
        question: 'Uma lata cilíndrica tem raio de 3 cm e altura de 10 cm. Adotando π = 3,14, qual é o volume dessa lata?',
        difficulty: 'Fácil',
        category: 'Geometria Espacial',
        grade: '2em',
        formulaId: 'volume-cilindro',
        formulaName: 'Cilindro (Volume e Área Total)',
        formulaLatex: 'V = \\pi r^2 h',
        options: ['282,6 cm³', '94,2 cm³', '188,4 cm³', '300 cm³'],
        correctIndex: 0,
        explanation: 'V = 3,14 · 3² · 10 = 3,14 · 9 · 10 = 3,14 · 90 = 282,6 cm³.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['cilindro', 'volume', 'geometria espacial', 'area total', 'solidos']
  },

  {
    id: 'volume-esfera',
    name: 'Esfera (Volume e Área da Superfície)',
    grade: '2em',
    category: 'Geometria Espacial',
    latex: 'V = \\frac{4}{3}\\pi r^3, \\quad A = 4\\pi r^2',
    shortFormula: 'V = 4/3 πr³, A = 4πr²',
    description: 'Calcula o volume interno e a área da superfície esférica de uma esfera perfeita a partir apenas do seu raio.',
    variables: [
      { symbol: 'V', name: 'Volume esférico', meaning: 'Espaço tridimensional contido no interior da esfera.' },
      { symbol: 'A', name: 'Área superficial', meaning: 'Área da casca esférica (equivale a 4 círculos máximos).' },
      { symbol: 'r', name: 'Raio da esfera', meaning: 'Distância do centro até qualquer ponto da superfície.' }
    ],
    whenToUse: [
      'Para calcular volume ou superfície de bolas de futebol, planetas, gotas esféricas ou rolamentos.',
      'Lembre-se: o raio é a metade do diâmetro.'
    ],
    example: {
      title: 'Volume de uma bola de raio 3 cm',
      problem: 'Calcule o volume de uma esfera de raio 3 cm, usando π ≈ 3,14.',
      steps: [
        { title: 'Substituir na fórmula', latex: 'V = \\frac{4}{3} \\cdot 3{,}14 \\cdot 3^3', explanation: 'Primeiro calculamos o raio ao cubo: 3³ = 27.' },
        { title: 'Simplificar a fração', latex: '\\frac{27}{3} = 9', explanation: '27 dividido por 3 é 9.' },
        { title: 'Multiplicar', latex: 'V = 4 \\times 3{,}14 \\times 9 = 36 \\times 3{,}14 = 113{,}04 \\text{ cm}^3', explanation: 'Resultado do volume.' }
      ],
      finalAnswer: 'O volume da esfera é 113,04 cm³.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'r', label: 'Raio da esfera (r)', symbol: 'r', placeholder: 'Ex: 3', defaultValue: 3, min: 0.001 }
      ],
      compute: (inputs) => {
        const r = inputs['r'];
        if (r === undefined) return { success: false, steps: [], formulaUsed: 'V = (4/3)πr³', error: 'Informe o raio.' };
        if (r <= 0) return { success: false, steps: [], formulaUsed: 'V = (4/3)πr³', error: 'O raio deve ser positivo.' };

        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        const area = 4 * Math.PI * r * r;

        return {
          success: true,
          value: volume,
          formattedResult: `V ≈ ${formatNumberBR(volume, 2)} un³ | A ≈ ${formatNumberBR(area, 2)} un²`,
          isApproximation: true,
          formulaUsed: 'V = \\frac{4}{3}\\pi r^3',
          steps: [
            `Fórmula do volume: V = (4/3) · π · r³`,
            `Cálculo do cubo do raio: (${formatNumberBR(r)})³ = ${formatNumberBR(Math.pow(r, 3))}`,
            `Volume: V = (4/3) · π · ${formatNumberBR(Math.pow(r, 3))} ≈ ${formatNumberBR(volume, 2)} unidades cúbicas (Aproximado)`,
            `Área superficial: A = 4 · π · (${formatNumberBR(r)})² ≈ ${formatNumberBR(area, 2)} unidades quadradas`
          ]
        };
      },
      testCases: [
        { description: 'Esfera r=3 -> V ≈ 113.10', inputs: { r: 3 }, expectedOutput: 113.10, isApproximate: true, tolerance: 0.1 }
      ]
    },
    exercises: [
      {
        id: 'esf-ex1',
        type: 'multiple-choice',
        title: 'Área da Superfície Esférica',
        question: 'Qual é a área da superfície de uma esfera com raio de 5 cm? (Adote π = 3,14).',
        difficulty: 'Fácil',
        category: 'Geometria Espacial',
        grade: '2em',
        formulaId: 'volume-esfera',
        formulaName: 'Esfera (Volume e Área da Superfície)',
        formulaLatex: 'A = 4\\pi r^2',
        options: ['314 cm²', '157 cm²', '628 cm²', '523,3 cm³'],
        correctIndex: 0,
        explanation: 'A = 4 · π · r² = 4 · 3,14 · 5² = 4 · 3,14 · 25 = 100 · 3,14 = 314 cm².'
      }
    ],
    difficulty: 'Médio',
    tags: ['esfera', 'volume', 'area da esfera', 'geometria espacial', 'raio']
  },

  {
    id: 'combinacao-simples',
    name: 'Combinação Simples',
    grade: '2em',
    category: 'Análise Combinatória',
    latex: 'C_{n, p} = \\frac{n!}{p!(n - p)!}',
    shortFormula: 'C(n, p) = n! / (p!(n - p)!)',
    description: 'Calcula o número de maneiras de escolher um subconjunto de p elementos a partir de um conjunto de n elementos distintos, onde a ordem dos elementos NÃO importa.',
    variables: [
      { symbol: 'n', name: 'Total de elementos disponíveis', meaning: 'Tamanho total do grupo inicial.' },
      { symbol: 'p', name: 'Elementos a escolher', meaning: 'Quantidade de elementos escolhidos para cada grupo (p ≤ n).' },
      { symbol: '!', name: 'Fatorial', meaning: 'Produto de todos os inteiros positivos de 1 até o número.' }
    ],
    whenToUse: [
      'Quando formar grupos, comissões, equipes ou times onde a ordem das pessoas NÃO altera o grupo (ex: a dupla {Ana, Beto} é igual à dupla {Beto, Ana}).',
      'Em jogos de loteria (Mega-Sena) ou escolha de ingredientes para uma pizza.'
    ],
    example: {
      title: 'Comissão de Alunos',
      problem: 'De um grupo de 10 alunos, quantos grupos de 3 representantes podem ser formados?',
      steps: [
        { title: 'Verificar se a ordem importa', explanation: 'A ordem dos representantes não importa, portanto trata-se de COMBINAÇÃO: n = 10, p = 3.' },
        { title: 'Montar a fórmula', latex: 'C_{10, 3} = \\frac{10!}{3!(10 - 3)!} = \\frac{10!}{3! \\cdot 7!}', explanation: 'Desenvolvemos o fatorial maior até cancelar o 7!.' },
        { title: 'Simplificar', latex: '\\frac{10 \\times 9 \\times 8 \\times 7!}{3 \\times 2 \\times 1 \\times 7!} = \\frac{720}{6} = 120', explanation: 'Cancelamos 7! e dividimos 720 por 6.' }
      ],
      finalAnswer: 'Podem ser formadas 120 comissões distintas.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'n', label: 'Total de elementos (n)', symbol: 'n', placeholder: 'Ex: 10', defaultValue: 10, min: 0, step: 1 },
        { key: 'p', label: 'Elementos por grupo (p)', symbol: 'p', placeholder: 'Ex: 3', defaultValue: 3, min: 0, step: 1 }
      ],
      compute: (inputs) => {
        const n = inputs['n'];
        const p = inputs['p'];
        if (n === undefined || p === undefined) return { success: false, steps: [], formulaUsed: 'C(n,p) = n!/(p!(n-p)!)', error: 'Informe n e p.' };
        if (!Number.isInteger(n) || !Number.isInteger(p) || n < 0 || p < 0) {
          return { success: false, steps: [], formulaUsed: 'C(n,p)', error: 'n e p devem ser inteiros não negativos.' };
        }
        if (p > n) {
          return { success: false, steps: [], formulaUsed: 'C(n,p)', error: 'O número de elementos escolhidos p não pode ser maior que o total disponível n.' };
        }
        if (n > 30) {
          return { success: false, steps: [], formulaUsed: 'C(n,p)', error: 'Para evitar sobrecarga de precisão, utilize n ≤ 30.' };
        }

        const res = combination(n, p);
        return {
          success: true,
          value: res,
          formattedResult: `C(${n}, ${p}) = ${formatNumberBR(res)}`,
          formulaUsed: 'C_{n, p} = \\frac{n!}{p!(n - p)!}',
          steps: [
            `Fórmula: C(${n}, ${p}) = ${n}! / (${p}! · (${n} - ${p})!)`,
            `Diferença: (${n} - ${p})! = ${n - p}!`,
            `Resultado: C(${n}, ${p}) = ${formatNumberBR(res)} possibilidades distintas`
          ]
        };
      },
      testCases: [
        { description: 'C(10, 3) = 120', inputs: { n: 10, p: 3 }, expectedOutput: 120 },
        { description: 'C(5, 2) = 10', inputs: { n: 5, p: 2 }, expectedOutput: 10 },
        { description: 'Rejeitar p > n', inputs: { n: 3, p: 5 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'não pode ser maior' }
      ]
    },
    exercises: [
      {
        id: 'comb-ex1',
        type: 'multiple-choice',
        title: 'Escolha de Sabores de Sorvete',
        question: 'Uma sorveteria possui 8 sabores diferentes. De quantas maneiras um cliente pode escolher uma taça com 2 bolas de sabores diferentes?',
        difficulty: 'Fácil',
        category: 'Análise Combinatória',
        grade: '2em',
        formulaId: 'combinacao-simples',
        formulaName: 'Combinação Simples',
        formulaLatex: 'C_{n, p} = \\frac{n!}{p!(n - p)!}',
        options: ['28 maneiras', '56 maneiras', '16 maneiras', '64 maneiras'],
        correctIndex: 0,
        explanation: 'A ordem dos sabores na taça não importa, logo é Combinação: C(8, 2) = (8 · 7) / (2 · 1) = 56 / 2 = 28 maneiras.'
      },
      {
        id: 'comb-ex2',
        type: 'formula-choice',
        title: 'Arranjo ou Combinação?',
        question: 'Em uma corrida com 10 competidores, de quantas maneiras diferentes podem ser definidos o 1º, 2º e 3º lugares? Qual fórmula devemos utilizar?',
        difficulty: 'Médio',
        category: 'Análise Combinatória',
        grade: '2em',
        formulaId: 'combinacao-simples',
        formulaName: 'Combinação Simples',
        formulaLatex: 'A_{n, p} = \\frac{n!}{(n - p)!}',
        options: [
          'Arranjo Simples, pois a ordem dos colocados no pódio importa (1º ≠ 2º ≠ 3º)',
          'Combinação Simples, pois a ordem dos colocados não faz diferença',
          'Teorema de Pitágoras',
          'Fórmula de Bhaskara'
        ],
        correctIndex: 0,
        explanation: 'A ordem no pódio IMPORTA muito (ganhar ouro é diferente de prata ou bronze)! Logo, usa-se ARRANJO SIMPLES: A(10, 3) = 10 · 9 · 8 = 720 maneiras.'
      }
    ],
    difficulty: 'Médio',
    tags: ['combinatoria', 'combinacao simples', 'fatorial', 'analise combinatoria', 'grupos']
  },

  {
    id: 'determinante-2x2',
    name: 'Determinante de Matriz 2x2',
    grade: '2em',
    category: 'Matrizes e Determinantes',
    latex: '\\det(M) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = a \\cdot d - b \\cdot c',
    shortFormula: 'det = a·d - b·c',
    description: 'O determinante de uma matriz de ordem 2 é obtido subtraindo o produto dos elementos da diagonal secundária do produto dos elementos da diagonal principal.',
    variables: [
      { symbol: 'a, d', name: 'Diagonal principal', meaning: 'Elementos que vão do canto superior esquerdo ao inferior direito.' },
      { symbol: 'b, c', name: 'Diagonal secundária', meaning: 'Elementos que vão do canto superior direito ao inferior esquerdo.' },
      { symbol: '\\det(M)', name: 'Determinante', meaning: 'Valor numérico escalar associado à matriz quadrada.' }
    ],
    whenToUse: [
      'Para verificar se um sistema linear 2x2 possui solução única (se det ≠ 0, o sistema é SPD).',
      'Para calcular a inversa de uma matriz 2x2.',
      'Em geometria analítica, para verificar colinearidade de pontos ou calcular área de triângulos no plano.'
    ],
    example: {
      title: 'Determinante da Matriz [[3, 2], [1, 4]]',
      problem: 'Calcule o determinante da matriz formada pelas linhas [3, 2] e [1, 4].',
      steps: [
        { title: 'Identificar as diagonais', explanation: 'Diagonal principal: 3 e 4. Diagonal secundária: 2 e 1.' },
        { title: 'Calcular o produto da diagonal principal', latex: '3 \\times 4 = 12', explanation: 'Produto principal.' },
        { title: 'Calcular o produto da diagonal secundária', latex: '2 \\times 1 = 2', explanation: 'Produto secundário.' },
        { title: 'Subtrair os produtos', latex: '\\det = 12 - 2 = 10', explanation: 'Diferença entre diagonal principal e secundária.' }
      ],
      finalAnswer: 'O determinante é 10.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Elemento a₁₁', symbol: 'a', placeholder: 'Ex: 3', defaultValue: 3 },
        { key: 'b', label: 'Elemento a₁₂', symbol: 'b', placeholder: 'Ex: 2', defaultValue: 2 },
        { key: 'c', label: 'Elemento a₂₁', symbol: 'c', placeholder: 'Ex: 1', defaultValue: 1 },
        { key: 'd', label: 'Elemento a₂₂', symbol: 'd', placeholder: 'Ex: 4', defaultValue: 4 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        const c = inputs['c'];
        const d = inputs['d'];
        if (a === undefined || b === undefined || c === undefined || d === undefined) {
          return { success: false, steps: [], formulaUsed: 'det = a·d - b·c', error: 'Preencha os quatro elementos da matriz.' };
        }
        const principal = a * d;
        const secundaria = b * c;
        const det = principal - secundaria;
        return {
          success: true,
          value: det,
          formattedResult: `det = ${formatNumberBR(det, 2)}`,
          formulaUsed: '\\det(M) = a \\cdot d - b \\cdot c',
          steps: [
            `Diagonal principal: (${formatNumberBR(a)}) · (${formatNumberBR(d)}) = ${formatNumberBR(principal)}`,
            `Diagonal secundária: (${formatNumberBR(b)}) · (${formatNumberBR(c)}) = ${formatNumberBR(secundaria)}`,
            `Determinante: ${formatNumberBR(principal)} - (${formatNumberBR(secundaria)}) = ${formatNumberBR(det, 2)}`,
            `Invertibilidade: Como det ${det !== 0 ? '≠ 0, a matriz É INVERTÍVEL' : '= 0, a matriz NÃO É INVERTÍVEL'}.`
          ]
        };
      },
      testCases: [
        { description: 'Matriz [[3,2],[1,4]] -> 10', inputs: { a: 3, b: 2, c: 1, d: 4 }, expectedOutput: 10 },
        { description: 'Matriz com det nulo [[2,4],[1,2]] -> 0', inputs: { a: 2, b: 4, c: 1, d: 2 }, expectedOutput: 0 }
      ]
    },
    exercises: [
      {
        id: 'det-ex1',
        type: 'multiple-choice',
        title: 'Cálculo de Determinante',
        question: 'Qual é o determinante da matriz 2x2 com a₁₁ = 5, a₁₂ = -2, a₂₁ = 3, a₂₂ = 4?',
        difficulty: 'Fácil',
        category: 'Matrizes e Determinantes',
        grade: '2em',
        formulaId: 'determinante-2x2',
        formulaName: 'Determinante de Matriz 2x2',
        formulaLatex: '\\det(M) = ad - bc',
        options: ['26', '14', '20', '-26'],
        correctIndex: 0,
        explanation: 'det = (5 · 4) - (-2 · 3) = 20 - (-6) = 20 + 6 = 26.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['matrizes', 'determinantes', 'matriz 2x2', 'sistemas lineares']
  }
];
