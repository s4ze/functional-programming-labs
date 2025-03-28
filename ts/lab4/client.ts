type Operation = "+" | "-" | "*" | "/" | "^" | "√";

type CalculatorState = {
  firstNumber: string;
  secondNumber: string;
  operation: Operation;
  result: string;
  error: string | null;
};

const initialState: CalculatorState = {
  firstNumber: "",
  secondNumber: "",
  operation: "+",
  result: "",
  error: null,
};

const operations: Record<Operation, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "^": (a, b) => Math.pow(a, b),
  "√": (a, b) => Math.pow(a, 1 / b),
};

const validateInput = (value: string): [boolean, number] => {
  const num = parseFloat(value);
  return [!isNaN(num), num];
};

const calculateResult = (state: CalculatorState): CalculatorState => {
  const [isFirstValid, firstNum] = validateInput(state.firstNumber);
  const [isSecondValid, secondNum] = validateInput(state.secondNumber);

  if (!isFirstValid || !isSecondValid) {
    return { ...state, error: "Введите корректные числа" };
  }

  if (state.operation === "/" && secondNum === 0) {
    return { ...state, error: "Деление на ноль невозможно" };
  }

  if (state.operation === "√" && firstNum === 0) {
    return { ...state, error: "Степень корня не может быть нулём" };
  }

  try {
    const result = operations[state.operation](firstNum, secondNum);
    return {
      ...state,
      result: result.toString(),
      error: null,
    };
  } catch (error) {
    return {
      ...state,
      error: "Ошибка вычисления",
    };
  }
};

const updateInterface = (state: CalculatorState) => {
  const resultElement = document.getElementById("result-value") as HTMLElement;
  const errorElement = document.querySelector(".error") as HTMLElement | null;

  resultElement.textContent = state.result;

  if (errorElement) {
    errorElement.textContent = state.error || "";
    errorElement.style.display = state.error ? "block" : "none";
  }
};

const initCalculator = () => {
  let state: CalculatorState = { ...initialState };

  const firstNumberInput = document.getElementById(
    "first-number"
  ) as HTMLInputElement;
  const secondNumberInput = document.getElementById(
    "second-number"
  ) as HTMLInputElement;
  const operationSelect = document.getElementById(
    "operation"
  ) as HTMLSelectElement;
  const calculateButton = document.getElementById(
    "calculate"
  ) as HTMLButtonElement;
  const clearButton = document.getElementById("clear") as HTMLButtonElement;

  const handleInputChange = () => {
    state = {
      ...state,
      firstNumber: firstNumberInput.value,
      secondNumber: secondNumberInput.value,
      operation: operationSelect.value as Operation,
      error: null,
    };
  };

  const handleCalculate = () => {
    state = calculateResult(state);
    updateInterface(state);
  };

  const handleClear = () => {
    firstNumberInput.value = "";
    secondNumberInput.value = "";
    operationSelect.value = "+";
    state = { ...initialState };
    updateInterface(state);
  };

  firstNumberInput.addEventListener("input", handleInputChange);
  secondNumberInput.addEventListener("input", handleInputChange);
  operationSelect.addEventListener("change", handleInputChange);
  calculateButton.addEventListener("click", handleCalculate);
  clearButton.addEventListener("click", handleClear);

  if (!document.querySelector(".error")) {
    const errorElement = document.createElement("div");
    errorElement.className = "error";
    errorElement.style.display = "none";
    document.querySelector(".result")?.appendChild(errorElement);
  }

  updateInterface(state);
};

document.addEventListener("DOMContentLoaded", initCalculator);
