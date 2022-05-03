export {};

type Human = {
  secondName: string;
};

function isHuman(animal: any): animal is Human {
  return typeof animal.secondName === 'string';
}
