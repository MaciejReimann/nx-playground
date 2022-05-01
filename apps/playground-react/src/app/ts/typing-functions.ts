const pair = <T, K>(first: T, second: K) => {
  return [first, second];
};

// infers (number | {id: string})[]
const paired = pair(1, { id: '123' });
