type Circle = {
  radius: number;
};

type Prism = {
  a: number;
  b: number;
  c: number;
};

type GetShapeCharacteristics<Shape> = Shape extends Circle
  ? { area: number }
  : Shape extends Prism
  ? { volume: number }
  : never;

type CircleCharacteristics = GetShapeCharacteristics<Circle>;
type PrismCharacteristics = GetShapeCharacteristics<Prism>;

type BlobCharacteristics = GetShapeCharacteristics<{ mass: number }>;

const deepEqualCompare = <Arg>(
  a: Arg extends any[] ? "Don't pass an array!" : Arg,
  b: Arg extends any[] ? "Don't pass an array!" : Arg
) => {
  return a === b;
};

// @ts-expect-error
deepEqualCompare([], []);

const func = (value: unknown) => {
  if (typeof value === 'object' && value && 'name' in value) {
    // because typeof null === "object"
    // @ts-expect-error
    value.name = 1; // this guy doesn't know what he's doing :(
    // in order to make this work we'd need proper type guarding
  }
};

type Letters = {
  a: number;
  b: string;
  c: {
    name: string;
  };
};

type LetterValues<T> = Letters[T extends number ? 'c' : never];
type GetA = LetterValues<number>;
