// one generic can rely on another
export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: '12',
    d: 18,
  },
};

const value = getDeepValue(obj, 'bar', 'd');

// type GetNumericKeys<T, K> = K[keyof T] extends number ? K[T] : never
