export {};
// ---
// Static vs. dynamic / Weak vs. Strong

let n: number = 123; // explicit
n = 1; // implicit
// @ts-expect-error
n = '1'; // not-ok

let a: any = 123; // dynamic
a = '123'; // ok

// ---
// strong vs. weak typing
// strong = throws error, when operations is illegal
// weak => type coercion, e.g "1" + {} (trademark for weak typing)

// TypeError - runtime
// SyntaxError - code parsing

// actual types vs apparent types (what the compiler sees)

interface Human {
  breathe: () => void;
  // greet: () => void
}

class TaxiDriver implements Human {
  constructor(private name: string) {}

  breathe = () => {};
  drive = () => {};
}

let john: Human = new TaxiDriver('John');
john.breathe(); // ok
//@ts-expect-error
john.drive(); // not-ok, because no drive method on interface Human

// ---
// Polymorphism
//

// Why do we annotate a more generic, apparent type?

class Developer implements Human {
  constructor(private name: string) {}

  breathe = () => {};
  code = () => {};
}

john = new Developer('john');

const ann = new Developer('Ann');
ann.breathe();
ann.code(); // no problem, because no type annotation?

// ---
// soliD - Dependency Inversion principle
// one module implements an interface and the other requires an interface,
// whereas the modules are not coupled b/w themseves

// where the compilator doesn't need to know the implementation details of a given class,
// (see john.drive(); example)
// use polymorphism to make the code less brittle

// nominal typing - equality of interfaces of their names
// structural typing - equality of interfaces of their structure

interface Thing {
  name: string;
}

class Person {
  constructor(public name: string) {}
}

type Dog = {
  name: string;
};

declare let thing: Thing;
declare let person: Person;
declare let dog: Dog;

thing = person;
person = thing;
dog = person;
person = dog;
thing = dog;
dog = thing;

// --- inference / annotation / assertions
const numb = 123; // inference -> tell me the type
const num: number = 123; // annotation -> see if we agree on the type (type safe)
const number = '123' as unknown as number; // assertion -> I know better,
// btw avoid using "type casting":
// It's called a "type assertion" because you're asserting that the value already has
// the type you say it does. You're not "casting" it into that type.
// https://effectivetypescript.com/2021/02/03/pet-peeves/

const add = (a: string, b: string) => a + b;
//@ts-expect-error - namespace mismatch
type Result = ReturnType<add>; // taking name from variable namespace into type namespace
type CorrectResult = ReturnType<typeof add>;

// ---
// Questions:
// What is the Object type? => objects and primitives (autoboxing)
// What is the Function type? => any function (regardless parameters or return types)
//
