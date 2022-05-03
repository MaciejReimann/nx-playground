export {};

// type reducer's accumulator to avaoid TS errors or need to type assertion
const items = [
  { key: 'A', value: 1 },
  { key: 'B', value: 2 },
  { key: 'C', value: 3 },
];

type Result = { [key: string]: number };

const reducedItems = items.reduce<Result>((acc, item) => {
  acc[item.key] = item.value;
  return acc;
}, {});

// inference of return type
const add = (a: any, b: any) => a + b;
const arrayOfNumbers = [1, 2, 3];
const arrayOfStrings = ['1', '2', '3'];

const reducedNumbers = arrayOfNumbers.reduce(add);
const reducedStrings = arrayOfStrings.reduce(add);

declare type myData = { name: string };
declare const someArray: myData[];
const reducedAny = someArray.reduce(add);
