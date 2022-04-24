// --- 
// Define a set by enumerating {a, b, c}, 
// or be setting a rule - a function called predicate deciding which element belongs to a set

// Empty set Ø => container of NOTHING
type EmptySet = never
// Universal set U => delineation of the boundary of discussion 
type Everything = unknown

// --- 
// Set theory offers a mental modelfor reasoning about types in TS

type InfiniteSetOfNumbers = number
type InfiniteSetOfStrings = string

// Examples of finite sets:
type FiniteSetOfUndefineds = undefined // one-element
type FiniteSetOfNulls = null // one-element
type FiniteSetOfBooleans = boolean // two-element


// String literal types are also finite: 
type StringLiteralType1 = "type_1"
type StringLiteralType3 = "type_1" | "type_2" | "type_3"

// both true, string literal ⊂ string 
// (⊂ - proper subset, i.e. every element of A is in B and B has EXTRA elements)
type W = 'a' extends string ? true : false;
type X = 'a' | 'b' extends string ? true : false;

// true, string literal ⊆ same string literal
// (⊆  - subset, i.e. every element of A is in B and B has NO extra elements)
type Y = 'a' extends 'a' ? true : false;

// extends in a conditional type is TypeScript's equivalent for ⊂ and ⊆
const myFunc = <T extends string>(arg: T): T[] => {
    return [arg]
}

type Arg = "arg"| null
const arg: Arg = "arg" 

const checkArg = myFunc(arg)

//@ts-expect-error
const checkNull = myFunc(null) // because null is disjoint with string

// the same happends when we extend interfaces
interface Person {
    name: string;
}

interface Employee extends Person {
    salary: number;
}

// true, Person ⊂ object
type Q = Person extends object ? true : false;

// true, Employee ⊂ Person
type R = Employee extends Person ? true : false;


// never is called the bottom type, symbolized ⊥ in type theory:
// unknown is called the top type, symbolized ⊤ in type theor:
// As a blend of two opposites, any has no equivalent in set theory, 
// and is best seen as an escape hatch to disable TypeScript's assignability rules.

// --- 
// Unions and intersections
interface A {
    a: 1;
}

interface B {
    b: 1;
}

const x: A | B = { a: 1 }; // succeeds
const y: A | B = { b: 1 }; // succeeds
const z: A | B = { a: 1, b: 1 }; // succeeds, assignable to overlap

//@ts-expect-error
const i: A & B = { a: 1 }; // fails
//@ts-expect-error
const j: A & B = { b: 1 }; // fails
const k: A & B = { a: 1, b: 1 }; // succeeds

type Never = string & number

// --- 
// Generics and conditional types
// enables accessing the generic in the resolved type, e.g. to filter the output
type OtherType = "a"
type M<T> = T extends OtherType ? T : never;

// when we pass a union type into a checked generic
// - Check if each constituent of the union is a (proper) subset 

// when the check is distributed over each constituent of the union
// it's a distributive conditional type (a TS's default resolution strategy):
type ToArrayDistribitive<T> = T extends unknown ? T[]: never

// if I pass string, I'll get string[]
// if I pass number, I'll get number[]
type Dist = ToArrayDistribitive<string | number> // string[] | number[]

type DistExplicit = (string extends unknown ? string[]: never) | (number extends unknown ? number[] : never)

// non-distributive conditional type: 
type ToArrayNonDistributive<T> = [T] extends [T] ? T[] : never // disabling distributivity requires wrapping each of the two types in the condition with square brackets

type NonDist = ToArrayNonDistributive<string | number> // (string | number)[]


// On the T extends unknown part: it's always true, false branch is never reached, 
// so we can focus on the distributive effect; 
// Alternatively: T extends T or T extends any
// Other use case: 

type GetKeys<T> = T extends T ? keyof T : never
type Keys = GetKeys<{a: 1, b: 2} | {c: 3}> // "a" | "b" | "c"

// and an example when false branches are reachable: 
type NonNullableArray<T> =  T extends null | undefined | (null | undefined)[]? never: T 
type NN = NonNullableArray<string | undefined | null[] | (undefined | null)[] >