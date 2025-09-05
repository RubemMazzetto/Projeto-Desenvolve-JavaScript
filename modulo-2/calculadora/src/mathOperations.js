// Função para soma de dois números
const add = (num1, num2) => num1 + num2;

// Função para subtração de dois números
const subtract = (num1, num2) => num1 - num2;

// Função para multiplicação de dois números
const multiply = (num1, num2) => num1 * num2;

// Função para divisão de dois números, com validação
const divide = (num1, num2) => {
  if (num2 === 0) {
    throw new Error("Divisão por zero não é permitida");
  }
  return num1 / num2;
};

// Função para exibir resultados de todas as operações
const showResult = (num1, num2) => {
  const operations = [
    { name: "Soma", fn: add },
    { name: "Subtração", fn: subtract },
    { name: "Multiplicação", fn: multiply },
    { name: "Divisão", fn: divide },
  ];

  operations.forEach(({ name, fn }) => {
    try {
      console.log(`${name} entre ${num1} e ${num2}: ${fn(num1, num2)}`);
    } catch (error) {
      console.log(`${name} entre ${num1} e ${num2}: Erro - ${error.message}`);
    }
  });
};

// Exportação das funções
export { add, subtract, multiply, divide, showResult };