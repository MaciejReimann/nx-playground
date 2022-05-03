// Polymorphism:
// https://en.wikipedia.org/wiki/Polymorphism_(computer_science)
// "Provision of a single interface to entities of different types"
// => shared methods / properties / APIs that may have different implementation

// 1.Ad hoc polymorphism: common interface for a set of types => function overloading

function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.concat(b);
  }
  throw new Error('Both arguments need to be of the same type');
}

// 2.Parametric polymorphism: a function or a data type is written generically,
// so that it can handle values uniformly without depending on their type
// => an example would be Array in JS, any[] has .map() and .length, maybe?

declare type MyData = {};

declare function asYAML<Data>(data: Data[]): string;

const toYAMLFile = <Data>(tasks: Iterable<Data>, filename: string) => {
  const dataArray = Array.from(tasks);
  const content = asYAML(dataArray);
  console.log(`Processed ${dataArray.length.toString()} items.`);
};

declare const dataArray: MyData[];
declare const dataSet: Set<MyData>;
declare const dataMap: Map<string, MyData>;

toYAMLFile(dataArray, 'array.yaml');
toYAMLFile(dataSet, 'set.yaml');
toYAMLFile(dataMap, 'map.yaml');
toYAMLFile([...dataMap], 'map.yaml');
toYAMLFile(dataMap.values(), 'map.yaml');

// 3.Subtyping
abstract class Animal {
  abstract talk(): void;
}

class Cat extends Animal {
  talk() {
    console.log('Meow!');
  }
}

class Dog extends Animal {
  talk() {
    console.log('Woof!');
  }
}

function makeThemTalk(animal: Animal) {
  animal.talk();
}

makeThemTalk(new Cat());
makeThemTalk(new Dog());

export {};

// Sources:
// https://blog.jetbrains.com/webstorm/2019/03/write-object-oriented-typescript-polymorphism/
