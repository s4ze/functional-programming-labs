interface Car {
  brand: string;
  model: string;
  releaseYear: number;
  maxSpeed: number;
  length: number;
  width: number;
  weight: number;
}

// 1. Функция, которая принимает массив чисел и возвращает новый массив, содержащий только числа, кратные заданному числу.
function filterDivisible(array: number[], divisor: number): number[] {
  let divisable_array: number[] = [];
  array.forEach((element) => {
    if (element % divisor == 0) divisable_array.push(element);
  });
  return divisable_array;
}

// 2. Функция, которая принимает массив строк и возвращает новую строку, содержащую все строки, объединенные заданным разделителем.
function concatenateStringsWithSeparator(
  strings: string[],
  separator: string
): string {
  let result: string = "";
  for (let i = 0; i < strings.length; i++) {
    if (i !== 0) result = result.concat(separator, strings[i]);
    else result = strings[i];
  }
  return result;
}

function concatenateWithSeparator<T>(objects: T[], separator: string): string {
  let result: string = "";
  for (let i = 0; i < objects.length; i++) {
    if (i !== 0) result = result.concat(separator, String(objects[i]));
    else result = String(objects[i]);
  }
  return result;
}

// 3. Функция, которая принимает массив объектов и возвращает новый массив, отсортированный по значению определенного свойства.
function filterByProperty<T extends object, K extends keyof T>(
  array: readonly T[],
  property: K
): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }

    return String(valueA).localeCompare(String(valueB));
  });
}

// 4. Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, которая выполняет логирование перед вызовом исходной функции.
const customLog = <T extends any[]>(
  log: string,
  infoFunction: (...args: T) => any
): ((...args: T) => any) => {
  return (...args: T) => {
    console.log(log);
    return infoFunction(...args);
  };
};

console.log(filterDivisible([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

console.log(concatenateStringsWithSeparator(["hello", "my", "friend!"], "_"));

console.log(concatenateWithSeparator([1, 2, 3, 4, 5], "^|^"));

const cars: Car[] = [
  {
    brand: "Ford",
    model: "Model T",
    releaseYear: 1908,
    maxSpeed: 72,
    length: 3350,
    width: 1650,
    weight: 880,
  },
  {
    brand: "Porsche",
    model: "992.1 GT3 RS",
    releaseYear: 2022,
    maxSpeed: 296,
    length: 4572,
    width: 1900,
    weight: 1450,
  },
  {
    brand: "BMW",
    model: "XM G09",
    releaseYear: 2022,
    maxSpeed: 250,
    length: 5110,
    width: 2004,
    weight: 2749,
  },
  {
    brand: "Aston Martin",
    model: "Vantage V8",
    releaseYear: 2019,
    maxSpeed: 314,
    length: 4465,
    width: 1942,
    weight: 1652,
  },
  {
    brand: "Honda",
    model: "Civic 10 Sedan 1.5 Turbo VTEC",
    releaseYear: 2022,
    maxSpeed: 225,
    length: 4630,
    width: 1800,
    weight: 1382,
  },
];

filterByProperty(cars, "releaseYear").forEach((car) =>
  console.log(car.brand, car.model, ":", car.releaseYear)
);
console.log();
filterByProperty(cars, "maxSpeed").forEach((car) =>
  console.log(car.brand, car.model, ":", car.maxSpeed, "km/h")
);
console.log();
filterByProperty(cars, "weight").forEach((car) =>
  console.log(car.brand, car.model, ":", car.weight, "kg")
);
console.log();
filterByProperty(cars, "brand").forEach((car) => console.log(car.brand));

const criticalError = (object: string): void =>
  console.log("Object %s caused critical error, program stopped", object);

const errorLog = customLog("error: ", criticalError);

errorLog("BMW");
