// 1. Функция, которая принимает массив чисел и возвращает новый массив, содержащий только четные числа.
const filterEvenNumbers = (numbers) => numbers.filter(num => num % 2 === 0);

// 2. Функция, которая принимает массив чисел и возвращает новый массив, содержащий квадраты этих чисел.
const squareNumbers = (numbers) => numbers.map(num => num * num);

// 3. Функция, которая принимает массив объектов и возвращает новый массив, содержащий только объекты с определенным свойством.
const filterObjectsByProperty = (objects, property) => objects.filter(obj => obj.hasOwnProperty(property));

// 4. Функция, которая принимает массив чисел и возвращает их сумму.
const sumNumbers = (numbers) => numbers.reduce((acc, num) => acc + num, 0);

// 5. Функция высшего порядка, которая принимает функцию и массив в качестве аргументов и применяет функцию к каждому элементу массива.
const applyFunctionToArray = (func, array) => array.map(func);

// Найдите сумму квадратов всех чётных чисел в заданном массиве.
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterEvenNumbers(numbers);
const squaredEvenNumbers = squareNumbers(evenNumbers);
const sumOfSquaredEvenNumbers = sumNumbers(squaredEvenNumbers);
console.log('Сумма квадратов всех чётных чисел: %d', sumOfSquaredEvenNumbers);

// Найдите среднее арифметическое всех чисел, больших заданного значения, в заданном массиве объектов.
const objects = [{value: 10}, {value: 20}, {value: 30}, {notValue: 40}, {notEnoughValue: 50}, {zeroValue: 0}, {value: 100}];
const threshold = 15;
const filteredObjects = filterObjectsByProperty(objects, 'value').filter(obj => obj.value > threshold);
const values = applyFunctionToArray(obj => obj.value, filteredObjects);
const average = sumNumbers(values) / values.length;
console.log('Среднее арифметическое всех чисел, больших %d: %d', threshold, average);
