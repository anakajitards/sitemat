import { Formula } from '../../types/math';
import { round, formatNumberBR } from '../../utils/mathEngine';

export const grade9Formulas: Formula[] = [
  {
    id: 'teorema-de-pitagoras',
    name: 'Teorema de Pitágoras',
    grade: '9ef',
    category: 'Geometria Plana',
    latex: 'a^2 = b^2 + c^2',
    shortFormula: 'a² = b² + c²',
    description: 'Em qualquer triângulo retângulo, o quadrado do comprimento da hipotenusa é igual à soma dos quadrados dos comprimentos dos dois catetos.',
    variables: [
      { symbol: 'a', name: 'Hipotenusa', meaning: 'O maior lado do triângulo retângulo, oposto ao ângulo reto (90°).' },
      { symbol: 'b', name: 'Cateto 1', meaning: 'Um dos lados menores que forma o ângulo de 90°.' },
      { symbol: 'c', name: 'Cateto 2', meaning: 'O outro lado menor que forma o ângulo de 90°.' }
    ],
    whenToUse: [
      'Quando o triângulo possui um ângulo de 90° (triângulo retângulo).',
      'Quando você conhece o valor de dois lados e precisa descobrir o terceiro lado.',
      'Em problemas de distância no plano, diagonais de retângulos e quadrados, ou problemas de altura com escadas apoiadas na parede.'
    ],
    example: {
      title: 'Cálculo da Hipotenusa',
      problem: 'Um triângulo retângulo tem catetos medindo 3 cm e 4 cm. Qual é o comprimento da hipotenusa?',
      steps: [
        {
          title: 'Identificar os dados',
          explanation: 'Cateto b = 3, Cateto c = 4, Hipotenusa a = ?'
        },
        {
          title: 'Aplicar a fórmula de Pitágoras',
          latex: 'a^2 = b^2 + c^2',
          explanation: 'Substituímos b por 3 e c por 4.'
        },
        {
          title: 'Calcular as potências',
          latex: 'a^2 = 3^2 + 4^2 = 9 + 16 = 25',
          explanation: 'A soma dos quadrados dos catetos é 25.'
        },
        {
          title: 'Extrair a raiz quadrada',
          latex: 'a = \\sqrt{25} = 5',
          explanation: 'Como medidas de comprimento são sempre positivas, a = 5 cm.'
        }
      ],
      finalAnswer: 'A hipotenusa mede 5 cm.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'b', label: 'Cateto b', symbol: 'b', placeholder: 'Ex: 3', defaultValue: 3, min: 0.001 },
        { key: 'c', label: 'Cateto c', symbol: 'c', placeholder: 'Ex: 4', defaultValue: 4, min: 0.001 }
      ],
      compute: (inputs) => {
        const b = inputs['b'];
        const c = inputs['c'];
        if (b === undefined || c === undefined) {
          return { success: false, steps: [], formulaUsed: 'a² = b² + c²', error: 'Informe ambos os catetos.' };
        }
        if (b <= 0 || c <= 0) {
          return { success: false, steps: [], formulaUsed: 'a² = b² + c²', error: 'Os catetos devem ser números positivos maiores que zero.' };
        }

        const b2 = b * b;
        const c2 = c * c;
        const sum = b2 + c2;
        const a = Math.sqrt(sum);
        const isExact = Number.isInteger(a);

        return {
          success: true,
          value: a,
          formattedResult: `a = ${formatNumberBR(a, 3)}`,
          isApproximation: !isExact,
          formulaUsed: 'a = \\sqrt{b^2 + c^2}',
          steps: [
            `Fórmula: a² = b² + c²`,
            `Substituição: a² = (${formatNumberBR(b)})² + (${formatNumberBR(c)})²`,
            `Cálculo das potências: a² = ${formatNumberBR(b2)} + ${formatNumberBR(c2)} = ${formatNumberBR(sum)}`,
            `Raiz quadrada: a = √(${formatNumberBR(sum)}) = ${formatNumberBR(a, 3)}${isExact ? ' (valor exato)' : ' (aproximado)'}`
          ]
        };
      },
      testCases: [
        {
          description: 'Triângulo clássico 3, 4 -> 5',
          inputs: { b: 3, c: 4 },
          expectedOutput: 5
        },
        {
          description: 'Triângulo 5, 12 -> 13',
          inputs: { b: 5, c: 12 },
          expectedOutput: 13
        },
        {
          description: 'Triângulo 8, 15 -> 17',
          inputs: { b: 8, c: 15 },
          expectedOutput: 17
        },
        {
          description: 'Rejeitar cateto zero ou negativo',
          inputs: { b: 0, c: 4 },
          expectedOutput: '',
          shouldFail: true,
          expectedErrorMessage: 'maiores que zero'
        }
      ]
    },
    exercises: [
      {
        id: 'pit-ex1',
        type: 'multiple-choice',
        title: 'Cálculo da Hipotenusa',
        question: 'Em um triângulo retângulo, os catetos medem 6 cm e 8 cm. Qual é a medida da hipotenusa?',
        difficulty: 'Fácil',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'teorema-de-pitagoras',
        formulaName: 'Teorema de Pitágoras',
        formulaLatex: 'a^2 = b^2 + c^2',
        options: ['10 cm', '12 cm', '14 cm', '100 cm'],
        correctIndex: 0,
        explanation: 'Aplicando Pitágoras: a² = 6² + 8² = 36 + 64 = 100. Logo, a = √100 = 10 cm.'
      },
      {
        id: 'pit-ex2',
        type: 'true-false',
        title: 'Triângulo Retângulo ou Não?',
        question: 'Um triângulo com lados medindo 5 cm, 12 cm e 13 cm é um triângulo retângulo.',
        difficulty: 'Fácil',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'teorema-de-pitagoras',
        formulaName: 'Teorema de Pitágoras',
        formulaLatex: 'a^2 = b^2 + c^2',
        isTrue: true,
        explanation: 'Verdadeiro! 13² = 169 e 5² + 12² = 25 + 144 = 169. Como 169 = 169, a relação de Pitágoras é satisfeita.'
      },
      {
        id: 'pit-ex3',
        type: 'fill-in',
        title: 'Encontrando o Cateto Faltante',
        question: 'Uma escada de 10 metros está apoiada em uma parede. A base da escada está a 6 metros de distância da parede. Qual é a altura (em metros) atingida pela escada na parede?',
        difficulty: 'Médio',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'teorema-de-pitagoras',
        formulaName: 'Teorema de Pitágoras',
        formulaLatex: 'a^2 = b^2 + c^2',
        numericAnswer: 8,
        tolerance: 0.1,
        unit: 'm',
        explanation: 'A escada é a hipotenusa (a = 10) e a distância ao chão é um cateto (b = 6). Temos: 10² = 6² + h² ⇒ 100 = 36 + h² ⇒ h² = 64 ⇒ h = 8 metros.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['pitagoras', 'triangulo', 'hipotenusa', 'cateto', 'geometria plana']
  },

  {
    id: 'formula-de-bhaskara',
    name: 'Fórmula de Bhaskara (Equação do 2º Grau)',
    grade: '9ef',
    category: 'Álgebra',
    latex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\quad \\Delta = b^2 - 4ac',
    shortFormula: 'x = (-b ± √Δ) / 2a',
    description: 'Método algébrico para encontrar as raízes (soluções) de uma equação quadrática da forma ax² + bx + c = 0, com a ≠ 0.',
    variables: [
      { symbol: 'a', name: 'Coeficiente quadrático', meaning: 'Número que multiplica o termo x² (deve ser diferente de 0).' },
      { symbol: 'b', name: 'Coeficiente linear', meaning: 'Número que multiplica o termo x.' },
      { symbol: 'c', name: 'Termo constante', meaning: 'Número sem incógnita (termo independente).' },
      { symbol: '\\Delta', name: 'Discriminante (Delta)', meaning: 'Define a quantidade de raízes reais: se > 0 (duas distintas), se = 0 (uma raiz dupla), se < 0 (nenhuma real).' }
    ],
    whenToUse: [
      'Sempre que você tiver uma equação do segundo grau completa ou incompleta na forma ax² + bx + c = 0.',
      'Para encontrar os pontos em que uma parábola cruza o eixo X (raízes ou zeros).',
      'Quando o enunciado pedir para encontrar os valores de x que anulam uma expressão quadrática.'
    ],
    example: {
      title: 'Resolução de x² - 5x + 6 = 0',
      problem: 'Encontre as raízes da equação x² - 5x + 6 = 0.',
      steps: [
        {
          title: 'Identificar os coeficientes',
          explanation: 'a = 1, b = -5, c = 6.'
        },
        {
          title: 'Calcular o discriminante (Delta)',
          latex: '\\Delta = b^2 - 4ac = (-5)^2 - 4 \\cdot (1) \\cdot (6) = 25 - 24 = 1',
          explanation: 'Como Δ = 1 > 0, a equação possui duas raízes reais e distintas.'
        },
        {
          title: 'Aplicar a fórmula resolutiva',
          latex: 'x = \\frac{-(-5) \\pm \\sqrt{1}}{2 \\cdot 1} = \\frac{5 \\pm 1}{2}',
          explanation: 'Substituímos b = -5, Δ = 1 e a = 1.'
        },
        {
          title: 'Determinar x₁ e x₂',
          latex: 'x_1 = \\frac{5 + 1}{2} = 3, \\quad x_2 = \\frac{5 - 1}{2} = 2',
          explanation: 'As raízes da equação são 2 e 3.'
        }
      ],
      finalAnswer: 'O conjunto solução é S = {2, 3}.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Coeficiente a (≠ 0)', symbol: 'a', placeholder: 'Ex: 1', defaultValue: 1 },
        { key: 'b', label: 'Coeficiente b', symbol: 'b', placeholder: 'Ex: -5', defaultValue: -5 },
        { key: 'c', label: 'Coeficiente c', symbol: 'c', placeholder: 'Ex: 6', defaultValue: 6 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        const c = inputs['c'];
        if (a === undefined || b === undefined || c === undefined) {
          return { success: false, steps: [], formulaUsed: 'x = (-b ± √Δ) / 2a', error: 'Informe todos os coeficientes a, b e c.' };
        }
        if (a === 0) {
          return { success: false, steps: [], formulaUsed: 'x = (-b ± √Δ) / 2a', error: 'O coeficiente a não pode ser zero (a ≠ 0). Se a = 0, a equação é do 1º grau: bx + c = 0.' };
        }

        const delta = b * b - 4 * a * c;
        const steps: string[] = [
          `Equação: (${a})x² + (${b})x + (${c}) = 0`,
          `Cálculo do Delta: Δ = (${b})² - 4 · (${a}) · (${c}) = ${b * b} - (${4 * a * c}) = ${delta}`
        ];

        if (delta < 0) {
          steps.push(`Como Δ < 0 (${delta} < 0), não existem raízes reais para esta equação.`);
          return {
            success: true,
            formattedResult: 'Sem raízes reais (Δ < 0)',
            formulaUsed: 'x = (-b ± √Δ) / 2a',
            steps
          };
        }

        const sqrtDelta = Math.sqrt(delta);
        const x1 = (-b + sqrtDelta) / (2 * a);
        const x2 = (-b - sqrtDelta) / (2 * a);

        if (delta === 0) {
          steps.push(`Como Δ = 0, existe uma única raiz real dupla:`);
          steps.push(`x = -(${b}) / (2 · ${a}) = ${formatNumberBR(x1, 3)}`);
          return {
            success: true,
            value: x1,
            formattedResult: `x₁ = x₂ = ${formatNumberBR(x1, 3)}`,
            formulaUsed: 'x = (-b ± √Δ) / 2a',
            steps
          };
        }

        steps.push(`Raiz quadrada de Delta: √${delta} = ${formatNumberBR(sqrtDelta, 3)}`);
        steps.push(`x₁ = (-(${b}) + ${formatNumberBR(sqrtDelta, 3)}) / (2 · ${a}) = ${formatNumberBR(x1, 3)}`);
        steps.push(`x₂ = (-(${b}) - ${formatNumberBR(sqrtDelta, 3)}) / (2 · ${a}) = ${formatNumberBR(x2, 3)}`);

        return {
          success: true,
          value: x1,
          formattedResult: `x₁ = ${formatNumberBR(x1, 3)} e x₂ = ${formatNumberBR(x2, 3)}`,
          formulaUsed: 'x = (-b ± √Δ) / 2a',
          steps
        };
      },
      testCases: [
        {
          description: 'Equação x² - 5x + 6 = 0 -> raízes 3 e 2',
          inputs: { a: 1, b: -5, c: 6 },
          expectedOutput: 'x₁ = 3 e x₂ = 2'
        },
        {
          description: 'Equação x² - 4 = 0 (b=0) -> raízes 2 e -2',
          inputs: { a: 1, b: 0, c: -4 },
          expectedOutput: 'x₁ = 2 e x₂ = -2'
        },
        {
          description: 'Equação com raiz única x² - 2x + 1 = 0 -> x = 1',
          inputs: { a: 1, b: -2, c: 1 },
          expectedOutput: 'x₁ = x₂ = 1'
        },
        {
          description: 'Rejeitar a = 0',
          inputs: { a: 0, b: 2, c: 3 },
          expectedOutput: '',
          shouldFail: true,
          expectedErrorMessage: 'não pode ser zero'
        }
      ]
    },
    exercises: [
      {
        id: 'bhas-ex1',
        type: 'multiple-choice',
        title: 'Discriminante da Equação',
        question: 'Qual é o valor de Delta (Δ) para a equação 2x² - 4x - 6 = 0?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'formula-de-bhaskara',
        formulaName: 'Fórmula de Bhaskara',
        formulaLatex: '\\Delta = b^2 - 4ac',
        options: ['64', '-32', '16', '48'],
        correctIndex: 0,
        explanation: 'a = 2, b = -4, c = -6. Δ = (-4)² - 4·(2)·(-6) = 16 - (-48) = 16 + 48 = 64.'
      },
      {
        id: 'bhas-ex2',
        type: 'multiple-choice',
        title: 'Raízes Reais',
        question: 'Quais são as raízes da equação x² - 7x + 10 = 0?',
        difficulty: 'Médio',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'formula-de-bhaskara',
        formulaName: 'Fórmula de Bhaskara',
        formulaLatex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
        options: ['x₁ = 2 e x₂ = 5', 'x₁ = -2 e x₂ = -5', 'x₁ = 1 e x₂ = 10', 'x₁ = 3 e x₂ = 4'],
        correctIndex: 0,
        explanation: 'Δ = (-7)² - 4(1)(10) = 49 - 40 = 9. x = (7 ± √9)/2 = (7 ± 3)/2. x₁ = (7+3)/2 = 5, x₂ = (7-3)/2 = 2.'
      },
      {
        id: 'bhas-ex3',
        type: 'formula-choice',
        title: 'Qual Fórmula Utilizar?',
        question: 'O problema pede: "Determine em que momentos um projétil atinge o solo, sabendo que sua altura é dada por h(t) = -5t² + 20t". Qual fórmula devemos aplicar?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'formula-de-bhaskara',
        formulaName: 'Fórmula de Bhaskara',
        formulaLatex: 'ax^2 + bx + c = 0',
        options: [
          'Fórmula de Bhaskara / Equação do 2º Grau (igualando h(t) = 0)',
          'Teorema de Pitágoras',
          'Área do Círculo',
          'Média Aritmética'
        ],
        correctIndex: 0,
        explanation: 'O projétil atinge o solo quando sua altura h(t) = 0. Isso resulta em uma equação do 2º grau: -5t² + 20t = 0, resolvida por Bhaskara ou fatoração!'
      }
    ],
    difficulty: 'Médio',
    tags: ['bhaskara', 'equacao do 2 grau', 'delta', 'raizes', 'algebra']
  },

  {
    id: 'area-do-circulo',
    name: 'Área do Círculo',
    grade: '9ef',
    category: 'Geometria Plana',
    latex: 'A = \\pi r^2',
    shortFormula: 'A = πr²',
    description: 'Calcula a medida da superfície interna de uma região circular a partir do seu raio.',
    variables: [
      { symbol: 'A', name: 'Área', meaning: 'Superfície interna total do círculo em unidades quadradas (ex: cm², m²).' },
      { symbol: '\\pi', name: 'Pi (constante)', meaning: 'Número irracional aproximadamente igual a 3,14159...' },
      { symbol: 'r', name: 'Raio', meaning: 'Distância do centro da circunferência até qualquer ponto de sua borda (metade do diâmetro).' }
    ],
    whenToUse: [
      'Quando precisar saber a quantidade de piso, grama ou tinta necessária para cobrir uma região circular.',
      'Sempre que o enunciado fornecer o raio ou diâmetro e perguntar a área.',
      'Atenção: se o problema der o diâmetro D, divida por 2 para obter o raio r = D/2 antes de elevar ao quadrado!'
    ],
    example: {
      title: 'Área de uma praça circular',
      problem: 'Uma praça circular tem raio de 5 metros. Qual é a sua área? (Use π ≈ 3,14).',
      steps: [
        {
          title: 'Identificar a variável',
          explanation: 'Raio r = 5 metros.'
        },
        {
          title: 'Aplicar a fórmula',
          latex: 'A = \\pi r^2',
          explanation: 'Substituímos r = 5 e π ≈ 3,14.'
        },
        {
          title: 'Efetuar a potência primeiro',
          latex: 'r^2 = 5^2 = 25',
          explanation: 'Primeiro calculamos o quadrado do raio.'
        },
        {
          title: 'Multiplicar por π',
          latex: 'A \\approx 3{,}14 \\times 25 = 78{,}5 \\text{ m}^2',
          explanation: 'Resultado final com valor aproximado.'
        }
      ],
      finalAnswer: 'A área da praça é de aproximadamente 78,5 m².'
    },
    calculatorConfig: {
      inputs: [
        { key: 'r', label: 'Raio (r)', symbol: 'r', placeholder: 'Ex: 5', defaultValue: 5, min: 0.001 }
      ],
      compute: (inputs) => {
        const r = inputs['r'];
        if (r === undefined) {
          return { success: false, steps: [], formulaUsed: 'A = πr²', error: 'Informe o raio.' };
        }
        if (r <= 0) {
          return { success: false, steps: [], formulaUsed: 'A = πr²', error: 'O raio deve ser um número positivo maior que zero.' };
        }

        const r2 = r * r;
        const area = Math.PI * r2;

        return {
          success: true,
          value: area,
          formattedResult: `A ≈ ${formatNumberBR(area, 2)} un²`,
          isApproximation: true,
          formulaUsed: 'A = \\pi r^2',
          steps: [
            `Fórmula utilizada: A = π · r²`,
            `Substituição: A = π · (${formatNumberBR(r)})²`,
            `Cálculo da potência: r² = ${formatNumberBR(r2)}`,
            `Multiplicação: A = π · ${formatNumberBR(r2)} ≈ ${formatNumberBR(area, 2)} (Resultado aproximado)`
          ]
        };
      },
      testCases: [
        {
          description: 'Círculo raio 5 -> ~78.54',
          inputs: { r: 5 },
          expectedOutput: 78.54,
          isApproximate: true,
          tolerance: 0.01
        },
        {
          description: 'Círculo raio 10 -> ~314.16',
          inputs: { r: 10 },
          expectedOutput: 314.16,
          isApproximate: true,
          tolerance: 0.01
        },
        {
          description: 'Rejeitar raio negativo',
          inputs: { r: -3 },
          expectedOutput: '',
          shouldFail: true,
          expectedErrorMessage: 'maior que zero'
        }
      ]
    },
    exercises: [
      {
        id: 'circ-ex1',
        type: 'multiple-choice',
        title: 'Área com Diâmetro Fornecido',
        question: 'Uma mesa redonda tem diâmetro de 4 metros. Adotando π = 3,14, qual é a área da superfície dessa mesa?',
        difficulty: 'Médio',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'area-do-circulo',
        formulaName: 'Área do Círculo',
        formulaLatex: 'A = \\pi r^2',
        options: ['12,56 m²', '50,24 m²', '6,28 m²', '25,12 m²'],
        correctIndex: 0,
        explanation: 'Atenção com a pegadinha do diâmetro! Se o diâmetro é 4 m, o raio é a metade: r = 4 / 2 = 2 m. Aplicando a fórmula: A = π · 2² = 3,14 · 4 = 12,56 m².'
      },
      {
        id: 'circ-ex2',
        type: 'fill-in',
        title: 'Cálculo de Área de Disco',
        question: 'Calcule a área (em cm²) de uma moeda com raio de 10 cm, usando π = 3,14.',
        difficulty: 'Fácil',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'area-do-circulo',
        formulaName: 'Área do Círculo',
        formulaLatex: 'A = \\pi r^2',
        numericAnswer: 314,
        tolerance: 0.5,
        unit: 'cm²',
        explanation: 'A = 3,14 · 10² = 3,14 · 100 = 314 cm².'
      }
    ],
    difficulty: 'Fácil',
    tags: ['area', 'circulo', 'pi', 'raio', 'diametro', 'geometria plana']
  },

  {
    id: 'area-do-triangulo',
    name: 'Área do Triângulo',
    grade: '9ef',
    category: 'Geometria Plana',
    latex: 'A = \\frac{b \\cdot h}{2}',
    shortFormula: 'A = (b · h) / 2',
    description: 'Calcula a área de qualquer triângulo a partir do comprimento de sua base e de sua altura perpendicular correspondente.',
    variables: [
      { symbol: 'A', name: 'Área', meaning: 'Área da superfície do triângulo.' },
      { symbol: 'b', name: 'Base', meaning: 'Medida do lado escolhido como base.' },
      { symbol: 'h', name: 'Altura', meaning: 'Distância perpendicular do vértice oposto até a reta que contém a base.' }
    ],
    whenToUse: [
      'Quando forem conhecidos a base e a altura do triângulo.',
      'Em triângulos retângulos, onde os dois catetos funcionam diretamente como base e altura.'
    ],
    example: {
      title: 'Triângulo com base 8 cm e altura 5 cm',
      problem: 'Calcule a área de um triângulo cuja base mede 8 cm e a altura correspondente mede 5 cm.',
      steps: [
        { title: 'Identificar dados', explanation: 'Base b = 8 cm, Altura h = 5 cm.' },
        { title: 'Substituir na fórmula', latex: 'A = \\frac{8 \\cdot 5}{2}', explanation: 'Multiplicamos a base pela altura e dividimos por 2.' },
        { title: 'Resultado', latex: 'A = \\frac{40}{2} = 20 \\text{ cm}^2', explanation: 'Área exata calculada.' }
      ],
      finalAnswer: 'A área do triângulo é 20 cm².'
    },
    calculatorConfig: {
      inputs: [
        { key: 'b', label: 'Base (b)', symbol: 'b', placeholder: 'Ex: 8', defaultValue: 8, min: 0.001 },
        { key: 'h', label: 'Altura (h)', symbol: 'h', placeholder: 'Ex: 5', defaultValue: 5, min: 0.001 }
      ],
      compute: (inputs) => {
        const b = inputs['b'];
        const h = inputs['h'];
        if (b === undefined || h === undefined) return { success: false, steps: [], formulaUsed: 'A = (b · h)/2', error: 'Informe base e altura.' };
        if (b <= 0 || h <= 0) return { success: false, steps: [], formulaUsed: 'A = (b · h)/2', error: 'Base e altura devem ser positivas.' };
        const area = (b * h) / 2;
        return {
          success: true,
          value: area,
          formattedResult: `A = ${formatNumberBR(area, 2)} un²`,
          isApproximation: false,
          formulaUsed: 'A = \\frac{b \\cdot h}{2}',
          steps: [
            `Fórmula: A = (b · h) / 2`,
            `Substituição: A = (${formatNumberBR(b)} · ${formatNumberBR(h)}) / 2`,
            `Produto: b · h = ${formatNumberBR(b * h)}`,
            `Divisão por 2: A = ${formatNumberBR(area, 2)}`
          ]
        };
      },
      testCases: [
        { description: 'Base 8, Altura 5 -> 20', inputs: { b: 8, h: 5 }, expectedOutput: 20 },
        { description: 'Base 7, Altura 3 -> 10.5', inputs: { b: 7, h: 3 }, expectedOutput: 10.5 }
      ]
    },
    exercises: [
      {
        id: 'tri-ex1',
        type: 'multiple-choice',
        title: 'Área do Terreno Triangular',
        question: 'Um terreno tem formato triangular com base medindo 12 m e altura de 9 m. Qual a sua área?',
        difficulty: 'Fácil',
        category: 'Geometria Plana',
        grade: '9ef',
        formulaId: 'area-do-triangulo',
        formulaName: 'Área do Triângulo',
        formulaLatex: 'A = \\frac{b \\cdot h}{2}',
        options: ['54 m²', '108 m²', '21 m²', '48 m²'],
        correctIndex: 0,
        explanation: 'A = (12 · 9) / 2 = 108 / 2 = 54 m².'
      }
    ],
    difficulty: 'Fácil',
    tags: ['triangulo', 'area', 'base', 'altura', 'geometria plana']
  },

  {
    id: 'regra-de-tres-simples',
    name: 'Regra de Três Simples Direta',
    grade: '9ef',
    category: 'Álgebra',
    latex: '\\frac{a}{b} = \\frac{c}{x} \\implies x = \\frac{b \\cdot c}{a}',
    shortFormula: 'x = (b · c) / a',
    description: 'Permite encontrar um valor desconhecido a partir de três valores conhecidos entre duas grandezas diretamente proporcionais.',
    variables: [
      { symbol: 'a', name: 'Grandeza 1 (valor 1)', meaning: 'Primeiro valor da primeira grandeza.' },
      { symbol: 'b', name: 'Grandeza 2 (valor 1)', meaning: 'Valor correspondente na segunda grandeza.' },
      { symbol: 'c', name: 'Grandeza 1 (valor 2)', meaning: 'Novo valor da primeira grandeza.' },
      { symbol: 'x', name: 'Valor procurado', meaning: 'Valor correspondente a ser descoberto.' }
    ],
    whenToUse: [
      'Quando duas grandezas variam na mesma proporção (se uma dobra, a outra dobra).',
      'Exemplos: quantidade de combustível e distância percorrida, preço total e quilos comprados, receitas culinárias.'
    ],
    example: {
      title: 'Consumo de Combustível',
      problem: 'Se um carro consome 10 litros de combustível para percorrer 120 km, quantos litros gastará para percorrer 300 km?',
      steps: [
        { title: 'Organizar as grandezas', explanation: '120 km correspondem a 10 litros. 300 km correspondem a x litros.' },
        { title: 'Montar a proporção', latex: '\\frac{120}{10} = \\frac{300}{x}', explanation: 'Como são diretamente proporcionais, multiplicamos cruzado.' },
        { title: 'Multiplicar em cruz', latex: '120 \\cdot x = 300 \\cdot 10 = 3000', explanation: 'Isolamos a variável x.' },
        { title: 'Calcular x', latex: 'x = \\frac{3000}{120} = 25', explanation: 'Serão necessários 25 litros.' }
      ],
      finalAnswer: 'O carro consumirá 25 litros.'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Valor a (G1)', symbol: 'a', placeholder: 'Ex: 120', defaultValue: 120 },
        { key: 'b', label: 'Valor b (G2 correspondente)', symbol: 'b', placeholder: 'Ex: 10', defaultValue: 10 },
        { key: 'c', label: 'Valor c (novo G1)', symbol: 'c', placeholder: 'Ex: 300', defaultValue: 300 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        const c = inputs['c'];
        if (a === undefined || b === undefined || c === undefined) return { success: false, steps: [], formulaUsed: 'x = (b · c)/a', error: 'Preencha os três valores.' };
        if (a === 0) return { success: false, steps: [], formulaUsed: 'x = (b · c)/a', error: 'O valor a não pode ser zero (divisão por zero).' };

        const x = (b * c) / a;
        return {
          success: true,
          value: x,
          formattedResult: `x = ${formatNumberBR(x, 2)}`,
          formulaUsed: 'x = \\frac{b \\cdot c}{a}',
          steps: [
            `Proporção: ${formatNumberBR(a)} / ${formatNumberBR(b)} = ${formatNumberBR(c)} / x`,
            `Multiplicação cruzada: ${formatNumberBR(a)} · x = ${formatNumberBR(b)} · ${formatNumberBR(c)}`,
            `Produto: ${formatNumberBR(b * c)}`,
            `Divisão: x = ${formatNumberBR(b * c)} / ${formatNumberBR(a)} = ${formatNumberBR(x, 2)}`
          ]
        };
      },
      testCases: [
        { description: '120 km -> 10 L, 300 km -> 25 L', inputs: { a: 120, b: 10, c: 300 }, expectedOutput: 25 },
        { description: 'Divisão por zero deve falhar', inputs: { a: 0, b: 5, c: 10 }, expectedOutput: '', shouldFail: true, expectedErrorMessage: 'divisão por zero' }
      ]
    },
    exercises: [
      {
        id: 'r3-ex1',
        type: 'multiple-choice',
        title: 'Produção de Peças',
        question: 'Uma máquina produz 150 parafusos em 30 minutos. Quantos parafusos essa mesma máquina produzirá em 90 minutos de funcionamento contínuo?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'regra-de-tres-simples',
        formulaName: 'Regra de Três Simples Direta',
        formulaLatex: 'x = \\frac{b \\cdot c}{a}',
        options: ['450 parafusos', '300 parafusos', '600 parafusos', '400 parafusos'],
        correctIndex: 0,
        explanation: 'O tempo triplicou (de 30 min para 90 min), logo a produção também triplica: 150 · 3 = 450 parafusos (ou x = (150 · 90) / 30 = 450).'
      }
    ],
    difficulty: 'Fácil',
    tags: ['regra de tres', 'proporcao', 'razao', 'algebra']
  },

  {
    id: 'porcentagem-simples',
    name: 'Cálculo de Porcentagem',
    grade: '9ef',
    category: 'Álgebra',
    latex: 'P = \\frac{V \\cdot p}{100}',
    shortFormula: 'P = (V · p) / 100',
    description: 'Calcula o valor percentual de uma quantia (fração por cem).',
    variables: [
      { symbol: 'P', name: 'Parte calculada', meaning: 'O valor numérico correspondente à taxa percentual.' },
      { symbol: 'V', name: 'Valor total inicial', meaning: 'A quantidade inteira (representando 100%).' },
      { symbol: 'p', name: 'Taxa percentual (%)', meaning: 'A porcentagem a ser calculada.' }
    ],
    whenToUse: [
      'Para calcular descontos, juros simples, gorjetas ou impostos.',
      'Sempre que houver o símbolo "%" associado a um valor total.'
    ],
    example: {
      title: 'Desconto em uma Roupa',
      problem: 'Uma jaqueta custa R$ 200,00 e está com 15% de desconto. Qual é o valor do desconto?',
      steps: [
        { title: 'Identificar dados', explanation: 'Valor inicial V = 200, Taxa p = 15%.' },
        { title: 'Aplicar a fórmula', latex: 'P = \\frac{200 \\cdot 15}{100}', explanation: 'Multiplicamos o valor pela taxa e dividimos por 100.' },
        { title: 'Efetuar a conta', latex: 'P = \\frac{3000}{100} = 30', explanation: 'O desconto é de R$ 30,00.' }
      ],
      finalAnswer: 'O valor do desconto é R$ 30,00 (preço final: R$ 170,00).'
    },
    calculatorConfig: {
      inputs: [
        { key: 'V', label: 'Valor Total (V)', symbol: 'V', placeholder: 'Ex: 200', defaultValue: 200 },
        { key: 'p', label: 'Porcentagem p (%)', symbol: 'p', placeholder: 'Ex: 15', defaultValue: 15 }
      ],
      compute: (inputs) => {
        const V = inputs['V'];
        const p = inputs['p'];
        if (V === undefined || p === undefined) return { success: false, steps: [], formulaUsed: 'P = (V · p)/100', error: 'Informe valor e taxa.' };

        const part = (V * p) / 100;
        const withDiscount = V - part;
        const withIncrease = V + part;

        return {
          success: true,
          value: part,
          formattedResult: `${formatNumberBR(part, 2)}`,
          formulaUsed: 'P = \\frac{V \\cdot p}{100}',
          steps: [
            `Fórmula: P = (V · p) / 100`,
            `Substituição: P = (${formatNumberBR(V)} · ${formatNumberBR(p)}) / 100`,
            `Resultado da porcentagem: ${formatNumberBR(part, 2)}`,
            `Com acréscimo (+${formatNumberBR(p)}%): ${formatNumberBR(withIncrease, 2)}`,
            `Com desconto (-${formatNumberBR(p)}%): ${formatNumberBR(withDiscount, 2)}`
          ]
        };
      },
      testCases: [
        { description: '15% de 200 -> 30', inputs: { V: 200, p: 15 }, expectedOutput: 30 },
        { description: '50% de 80 -> 40', inputs: { V: 80, p: 50 }, expectedOutput: 40 }
      ]
    },
    exercises: [
      {
        id: 'porc-ex1',
        type: 'multiple-choice',
        title: 'Desconto em Celular',
        question: 'Um aparelho de telefone custa R$ 1.500,00. À vista, a loja oferece 10% de desconto. Qual é o valor pago à vista?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'porcentagem-simples',
        formulaName: 'Cálculo de Porcentagem',
        formulaLatex: 'P = \\frac{V \\cdot p}{100}',
        options: ['R$ 1.350,00', 'R$ 1.400,00', 'R$ 1.250,00', 'R$ 1.450,00'],
        correctIndex: 0,
        explanation: 'Desconto de 10% de 1500 = 1500 · 0,10 = R$ 150. Valor à vista = 1500 - 150 = R$ 1.350,00.'
      }
    ],
    difficulty: 'Fácil',
    tags: ['porcentagem', 'desconto', 'acrescimo', 'matematica financeira', 'algebra']
  },

  {
    id: 'produtos-notaveis-quadrado-soma',
    name: 'Produtos Notáveis: Quadrado da Soma',
    grade: '9ef',
    category: 'Álgebra',
    latex: '(a + b)^2 = a^2 + 2ab + b^2',
    shortFormula: '(a + b)² = a² + 2ab + b²',
    description: 'O quadrado da soma de dois termos é igual ao quadrado do primeiro termo, mais duas vezes o produto do primeiro pelo segundo, mais o quadrado do segundo termo.',
    variables: [
      { symbol: 'a', name: 'Primeiro termo', meaning: 'Primeira parcela do binômio.' },
      { symbol: 'b', name: 'Segundo termo', meaning: 'Segunda parcela do binômio.' }
    ],
    whenToUse: [
      'Para expandir expressões quadráticas sem precisar fazer a distributiva termo a termo.',
      'Em simplificação de frações algébricas e resolução de equações.'
    ],
    example: {
      title: 'Expandindo (x + 3)²',
      problem: 'Desenvolva o produto notável (x + 3)²',
      steps: [
        { title: 'Identificar os termos', explanation: 'Primeiro termo a = x, Segundo termo b = 3.' },
        { title: 'Aplicar a regra', latex: '(x + 3)^2 = x^2 + 2 \\cdot (x) \\cdot (3) + 3^2', explanation: 'Quadrado do 1º + 2x(1ºx2º) + quadrado do 2º.' },
        { title: 'Simplificar', latex: '= x^2 + 6x + 9', explanation: 'Expressão final simplificada.' }
      ],
      finalAnswer: '(x + 3)² = x² + 6x + 9'
    },
    calculatorConfig: {
      inputs: [
        { key: 'a', label: 'Termo a (coeficiente ou número)', symbol: 'a', placeholder: 'Ex: 2', defaultValue: 2 },
        { key: 'b', label: 'Termo b (número)', symbol: 'b', placeholder: 'Ex: 5', defaultValue: 5 }
      ],
      compute: (inputs) => {
        const a = inputs['a'];
        const b = inputs['b'];
        if (a === undefined || b === undefined) return { success: false, steps: [], formulaUsed: '(a+b)² = a² + 2ab + b²', error: 'Informe a e b.' };
        const a2 = a * a;
        const twoAB = 2 * a * b;
        const b2 = b * b;
        const total = a2 + twoAB + b2;
        return {
          success: true,
          value: total,
          formattedResult: `(${a} + ${b})² = ${total}`,
          formulaUsed: '(a + b)^2 = a^2 + 2ab + b^2',
          steps: [
            `Regra: (a + b)² = a² + 2ab + b²`,
            `Substituição: (${a})² + 2·(${a})·(${b}) + (${b})²`,
            `Cálculo das parcelas: ${a2} + ${twoAB} + ${b2}`,
            `Soma total: ${total}`
          ]
        };
      },
      testCases: [
        { description: '(2 + 5)² = 49', inputs: { a: 2, b: 5 }, expectedOutput: 49 },
        { description: '(3 + 4)² = 49', inputs: { a: 3, b: 4 }, expectedOutput: 49 }
      ]
    },
    exercises: [
      {
        id: 'prod-ex1',
        type: 'multiple-choice',
        title: 'Expansão de Binômio',
        question: 'Qual é o desenvolvimento correto de (x + 5)²?',
        difficulty: 'Fácil',
        category: 'Álgebra',
        grade: '9ef',
        formulaId: 'produtos-notaveis-quadrado-soma',
        formulaName: 'Produtos Notáveis: Quadrado da Soma',
        formulaLatex: '(a + b)^2 = a^2 + 2ab + b^2',
        options: ['x² + 10x + 25', 'x² + 25', 'x² + 5x + 25', 'x² + 10x + 10'],
        correctIndex: 0,
        explanation: '(x + 5)² = x² + 2·x·5 + 5² = x² + 10x + 25. Cuidado para não esquecer o termo do meio 2ab!'
      }
    ],
    difficulty: 'Fácil',
    tags: ['produtos notaveis', 'binomio', 'quadrado da soma', 'algebra']
  }
];
